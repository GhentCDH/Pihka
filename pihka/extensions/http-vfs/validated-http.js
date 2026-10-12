// @ts-check
// The upstream synchronous VFS uses XHR directly and does not validate range
// responses. Install this worker-local transport before installing that VFS.
// Validation runs in send(), before upstream can put any bytes in its cache.
export function installValidatedHttp({ maxReadBytes = 1024 * 1024, immutable = false } = {}) {
    const NativeXHR = globalThis.XMLHttpRequest;
    const files = new Map();
    let failure = null;
    if (!Number.isSafeInteger(maxReadBytes) || maxReadBytes < 65536 || (maxReadBytes & (maxReadBytes - 1))) throw new Error("maxReadBytes must be a power of two >= 65536");

    globalThis.XMLHttpRequest = class extends NativeXHR {
        open(method, url, async) {
            if (async !== false || !["HEAD", "GET"].includes(method)) throw new Error("Unsupported VFS request");
            this.method = method;
            this.url = url;
            this.requestHeaders = [];
            this.probe = null;
            super.open(method, url, false);
        }

        setRequestHeader(name, value) {
            if (name.toLowerCase() === "range") {
                const match = /^bytes=(\d+)-(\d+)$/.exec(value);
                const file = files.get(this.url);
                if (!match || !file) throw new Error("Invalid VFS range request");
                this.start = Number(match[1]);
                this.end = Math.min(Number(match[2]), file.size - 1);
                if (this.end - this.start + 1 > maxReadBytes) throw new Error("HTTP VFS request exceeds maxReadBytes");
                value = `bytes=${this.start}-${this.end}`;
            }
            this.requestHeaders.push([name, value]);
            super.setRequestHeader(name, value);
        }

        getResponseHeader(name) {
            if (this.probe) {
                if (name.toLowerCase() === "content-length") return String(this.probeSize);
                return this.probe.getResponseHeader(name);
            }
            return super.getResponseHeader(name);
        }

        send() {
            // Suppress upstream's onload until all headers and bytes pass.
            const onload = this.onload;
            this.onload = null;
            try {
                const file = files.get(this.url);
                if (this.method === "GET" && file?.etag) super.setRequestHeader("If-Match", file.etag);
                // Synchronous XHR buffers the response: maxReadBytes bounds the
                // requested range, not bytes received from a noncompliant server.
                super.send();
                let encoding = this.getResponseHeader("Content-Encoding");
                // Some static hosts compress HEAD's full representation, but
                // serve byte ranges without compression. Discover that identity
                // representation with a bounded probe; never use compressed size
                // or validators as SQLite offsets or identity validators.
                if (this.method === "HEAD" && this.status === 200 && encoding && encoding.toLowerCase() !== "identity") {
                    const probe = new NativeXHR();
                    probe.open("GET", this.url, false);
                    probe.responseType = "arraybuffer";
                    for (const [name, value] of this.requestHeaders) probe.setRequestHeader(name, value);
                    probe.setRequestHeader("Range", "bytes=0-99");
                    probe.send();
                    const range = /^bytes 0-99\/(\d+)$/.exec(probe.getResponseHeader("Content-Range") || "");
                    if (probe.status !== 206 || !range || !(probe.response instanceof ArrayBuffer) || probe.response.byteLength !== 100) {
                        throw new Error("Identity probe requires 206, exact Content-Range and 100 bytes");
                    }
                    this.probe = probe;
                    this.probeSize = Number(range[1]);
                    encoding = this.getResponseHeader("Content-Encoding");
                }
                if (encoding && encoding.toLowerCase() !== "identity") throw new Error("Database must use identity Content-Encoding");
                if (this.method === "HEAD") {
                    const length = this.getResponseHeader("Content-Length");
                    const size = Number(length);
                    if (this.status !== 200 || !/^\d+$/.test(length || "") || !Number.isSafeInteger(size) || size < 512) {
                        throw new Error(`HEAD must return 200 and a valid Content-Length (received ${this.status})`);
                    }
                    const etag = this.getResponseHeader("ETag");
                    const strong = /^"[\x21\x23-\x7e\x80-\xff]*"$/.test(etag || "");
                    if (!strong && immutable !== true) throw new Error("A strong ETag is required; use immutable: true only for a guaranteed immutable database URL");
                    files.set(this.url, { size, etag: strong ? etag : null, modified: this.getResponseHeader("Last-Modified") });
                } else {
                    const file = files.get(this.url);
                    const range = this.getResponseHeader("Content-Range");
                    if (this.status !== 206 || range !== `bytes ${this.start}-${this.end}/${file.size}`) {
                        throw new Error(`Range request requires 206 and exact Content-Range; received ${this.status}, ${range}`);
                    }
                    if (!(this.response instanceof ArrayBuffer) || this.response.byteLength !== this.end - this.start + 1) throw new Error("Truncated or oversized HTTP range response");
                    if (file.etag && this.getResponseHeader("ETag") !== file.etag) throw new Error("Database ETag changed during session");
                    if (file.modified && this.getResponseHeader("Last-Modified") !== file.modified) throw new Error("Database Last-Modified changed during session");
                    if (this.start === 0) {
                        const bytes = new Uint8Array(this.response);
                        const signature = new globalThis.TextDecoder().decode(bytes.subarray(0, 16));
                        if (signature !== "SQLite format 3\0") throw new Error("Not a SQLite database");
                        if (bytes[18] !== 1 || bytes[19] !== 1) throw new Error("Publish a checkpointed database in DELETE journal mode, not WAL");
                    }
                }
                onload?.call(this, new Event("load"));
            } catch (error) {
                failure = new Error(`HTTP VFS: ${error.message}`);
                failure.code = "HTTP_VFS";
                throw failure;
            }
        }
    };
    return () => failure;
}
