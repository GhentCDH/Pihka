// This is the ersatz HTTP backend
// It does not require SharedArrayBuffer and does not share its cache
// It runs in the SQLite worker thread
import LRUCache from '../../lru-cache/index.mjs';
import { ntoh16 } from './endianness.js';
import * as VFSHTTP from './vfs-http-types.js';
import { debug } from './vfs-http-types.js';
const openFiles = {};
export function installSyncHttpVfs(sqlite3, options) {
    const capi = sqlite3.capi;
    const wasm = sqlite3.wasm;
    const sqlite3_vfs = capi.sqlite3_vfs;
    const sqlite3_file = capi.sqlite3_file;
    const sqlite3_io_methods = capi.sqlite3_io_methods;
    const httpVfs = new sqlite3_vfs();
    const httpIoMethods = new sqlite3_io_methods();
    httpVfs.$iVersion = 1;
    httpVfs.$szOsFile = capi.sqlite3_file.structInfo.sizeof;
    httpVfs.$mxPathname = 1024;
    httpVfs.$zName = wasm.allocCString('http');
    httpVfs.$xDlOpen = httpVfs.$xDlError = httpVfs.$xDlSym = httpVfs.$xDlClose = null;
    const ioSyncWrappers = {
        xCheckReservedLock: function (fid, out) {
            debug['vfs']('xCheckReservedLock', fid, out);
            wasm.poke(out, 0, 'i32');
            return 0;
        },
        xClose: function (fid) {
            debug['vfs']('xClose', fid);
            if (!openFiles[fid]) {
                return capi.SQLITE_NOTFOUND;
            }
            delete openFiles[fid];
            return 0;
        },
        xDeviceCharacteristics: function (fid) {
            debug['vfs']('xDeviceCharacteristics', fid);
            return capi.SQLITE_IOCAP_IMMUTABLE;
        },
        xFileControl: function (fid, op, arg) {
            debug['vfs']('xFileControl', fid, op, arg);
            if (op === capi.SQLITE_FCNTL_SYNC)
                return capi.SQLITE_OK;
            return capi.SQLITE_NOTFOUND;
        },
        xFileSize: function (fid, size) {
            debug['vfs']('xFileSize', fid, size);
            if (!openFiles[fid]) {
                return capi.SQLITE_NOTFOUND;
            }
            debug['vfs']('file size is ', openFiles[fid].size);
            wasm.poke(size, openFiles[fid].size, 'i64');
            return 0;
        },
        xLock: function (fid, lock) {
            debug['vfs']('xLock', fid, lock);
            return 0;
        },
        xRead: function (fid, dest, n, offset) {
            var _a, _b, _c, _d;
            debug['vfs']('xRead (sync)', fid, dest, n, offset);
            if (Number(offset) > Number.MAX_SAFE_INTEGER) {
                // CampToCamp are not supported
                return capi.SQLITE_TOOBIG;
            }
            if (!openFiles[fid]) {
                return capi.SQLITE_NOTFOUND;
            }
            const entry = openFiles[fid];
            if (!entry.pageSize) {
                // Determine the page size if we don't know it
                // It is in two big-endian bytes at offset 16 in what is always the first page
                entry.pageSize = 1024;
                const pageDataBuffer = new Uint8Array(2);
                const r = ioSyncWrappers.xRead(fid, pageDataBuffer, 2, BigInt(16));
                const pageData = new Uint16Array(pageDataBuffer.buffer);
                if (r !== 0)
                    return capi.SQLITE_IOERR;
                ntoh16(pageData);
                entry.pageSize = pageData[0] === 1 ? 65536 : pageData[0];
                debug['vfs'](`page size is ${entry.pageSize}`);
                if (entry.pageSize != 1024) {
                    // If the page size is not 1024 we can't keep this "page" in the cache
                    console.warn(`Page size for ${entry.url} is ${entry.pageSize}, recommended size is 1024`);
                    entry.pageCache.delete(0);
                }
                if (entry.pageSize > ((_a = options === null || options === void 0 ? void 0 : options.maxPageSize) !== null && _a !== void 0 ? _a : VFSHTTP.defaultOptions.maxPageSize))
                    throw new Error(`${entry.pageSize} is over the maximum configured ` +
                        `${(_b = options === null || options === void 0 ? void 0 : options.maxPageSize) !== null && _b !== void 0 ? _b : VFSHTTP.defaultOptions.maxPageSize}`);
            }
            try {
                const pageSize = BigInt(entry.pageSize);
                const len = BigInt(n);
                const page = offset / pageSize;
                if (page * pageSize !== offset)
                    debug['vfs'](`Read chunk ${offset} is not page-aligned`);
                let pageStart = page * pageSize;
                if (pageStart + pageSize < offset + len)
                    throw new Error(`Read chunk ${offset}:${n} spans across a page-boundary`);
                let data = entry.pageCache.get(Number(page));
                if (typeof data === 'number') {
                    debug['cache'](`[sync] cache hit (multi-page segment) for ${entry.url}:${page}`);
                    // This page is present as a segment of a super-page
                    const newPageStart = BigInt(data) * pageSize;
                    data = entry.pageCache.get(data);
                    if (data instanceof Uint8Array) {
                        // Not all subpages are valid, there are two possible cases
                        // where a non-valid superpage can be referenced:
                        // * the superpage was too big to fit in the cache
                        // * the superpage was evicted before the subsegments
                        pageStart = newPageStart;
                    }
                    else {
                        data = undefined;
                    }
                }
                if (typeof data === 'undefined') {
                    debug['cache'](`[sync] cache miss for ${entry.url}:${page}`);
                    let chunkSize = entry.pageSize;
                    // If the previous page is in the cache, we double the page size
                    // This was the original page merging algorithm implemented by @phiresky
                    let prev = page > 0 && entry.pageCache.get((Number(page) - 1));
                    if (prev) {
                        if (typeof prev === 'number')
                            prev = entry.pageCache.get(prev);
                        if (prev instanceof Uint8Array) {
                            // Valid superpage
                            chunkSize = Math.min(prev.byteLength * 2, options?.maxReadBytes ?? 1048576);
                            debug['cache'](`[sync] downloading super page of size ${chunkSize}`);
                        }
                    }
                    // Count only pages actually returned, including at EOF.
                    // Downloading a new segment
                    debug['http'](`downloading page ${page} of size ${chunkSize} starting at ${pageStart}`);
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', entry.url, false);
                    for (const h of Object.keys((_c = options === null || options === void 0 ? void 0 : options.headers) !== null && _c !== void 0 ? _c : VFSHTTP.defaultOptions.headers))
                        xhr.setRequestHeader(h, ((_d = options === null || options === void 0 ? void 0 : options.headers) !== null && _d !== void 0 ? _d : VFSHTTP.defaultOptions.headers)[h]);
                    xhr.setRequestHeader('Range', `bytes=${pageStart}-${pageStart + BigInt(chunkSize - 1)}`);
                    xhr.responseType = 'arraybuffer';
                    xhr.onload = () => {
                        if (xhr.response instanceof ArrayBuffer)
                            data = new Uint8Array(xhr.response);
                    };
                    xhr.send();
                    if (!data) {
                        return capi.SQLITE_IOERR;
                    }
                    // TypeScript does not recognize the sync XMLHttpRequest
                    data = data;
                    if (!(data instanceof Uint8Array) || data.length === 0)
                        throw new Error(`Invalid HTTP response received: ${JSON.stringify(xhr.response)}`);
                    // In case of a multiple-page segment, this is the parent super-page
                    entry.pageCache.set(Number(page), data);
                    // These point to the parent super-page
                    for (let i = Number(page) + 1; i < Number(page) + Math.ceil(data.byteLength / entry.pageSize); i++) {
                        entry.pageCache.set(i, Number(page));
                    }
                }
                else {
                    debug['cache'](`[sync] cache hit for ${entry.url}:${page}`);
                }
                const pageOffset = Number(offset - pageStart);
                if (pageOffset + n > data.byteLength) {
                    if (dest instanceof Uint8Array) dest.fill(0);
                    else wasm.heap8u().fill(0, dest, dest + n);
                    return capi.SQLITE_IOERR_SHORT_READ;
                }
                if (dest instanceof Uint8Array)
                    dest.set(data.subarray(pageOffset, pageOffset + n));
                else
                    wasm.heap8u().set(data.subarray(pageOffset, pageOffset + n), dest);
                return capi.SQLITE_OK;
            }
            catch (e) {
                console.error(e);
                return capi.SQLITE_IOERR;
            }
        },
        xSync: function (fid, flags) {
            debug['vfs']('xSync', fid, flags);
            return 0;
        },
        xTruncate: function (fid, size) {
            debug['vfs']('xTruncate', fid, size);
            return capi.SQLITE_READONLY;
        },
        xUnlock: function (fid, lock) {
            debug['vfs']('xUnlock', fid, lock);
            return 0;
        },
        xWrite: function (fid, src, n, offset) {
            debug['vfs']('xWrite', fid, src, n, offset);
            return capi.SQLITE_READONLY;
        }
    };
    const vfsSyncWrappers = {
        xAccess: function (vfs, name, flags, out) {
            debug['vfs']('xAccess', vfs, name, flags, out);
            if ((flags & capi.SQLITE_OPEN_READONLY) === 0) {
                wasm.poke(out, 0, 'i32');
                return capi.SQLITE_OK;
            }
            const fid = Symbol();
            const r = vfsSyncWrappers.xOpen(vfs, name, fid, flags, out);
            if (r === capi.SQLITE_OK) {
                ioSyncWrappers.xClose(fid);
                wasm.poke(out, 1, 'i32');
            }
            else {
                wasm.poke(out, 0, 'i32');
            }
            return capi.SQLITE_OK;
        },
        xCurrentTime: function (vfs, out) {
            debug['vfs']('xCurrentTime', vfs, out);
            wasm.poke(out, 2440587.5 + (new Date().getTime() / 86400000), 'double');
            return 0;
        },
        xCurrentTimeInt64: function (vfs, out) {
            debug['vfs']('xCurrentTimeInt64', vfs, out);
            wasm.poke(out, (BigInt(2440587.5) * BigInt(86400000)) + BigInt(new Date().getTime()), 'i64');
            return 0;
        },
        xDelete: function (vfs, name, doSyncDir) {
            debug['vfs']('xDelete', vfs, name, doSyncDir);
            return capi.SQLITE_READONLY;
        },
        xFullPathname: function (vfs, name, nOut, pOut) {
            debug['vfs']('xFullPathname', vfs, name, nOut, pOut);
            const i = wasm.cstrncpy(pOut, name, nOut);
            return i < nOut ? 0 : capi.SQLITE_CANTOPEN;
        },
        xGetLastError: function (vfs, nOut, pout) {
            debug['vfs']('xGetLastError', vfs, nOut, pout);
            return 0;
        },
        xOpen: function (vfs, name, fid, flags, pOutFlags) {
            var _a, _b;
            debug['vfs']('xOpen (sync)', vfs, name, fid, flags, pOutFlags);
            if (name === 0) {
                console.error('HTTP VFS does not support anonymous files');
                return capi.SQLITE_CANTOPEN;
            }
            if (typeof name !== 'number') {
                return capi.SQLITE_ERROR;
            }
            const url = wasm.cstrToJs(name);
            let valid = false;
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('HEAD', url, false);
                for (const h of Object.keys((_a = options === null || options === void 0 ? void 0 : options.headers) !== null && _a !== void 0 ? _a : VFSHTTP.defaultOptions.headers))
                    xhr.setRequestHeader(h, ((_b = options === null || options === void 0 ? void 0 : options.headers) !== null && _b !== void 0 ? _b : VFSHTTP.defaultOptions.headers)[h]);
                xhr.onload = () => {
                    var _a, _b;
                    const fh = Object.create(null);
                    fh.fid = fid;
                    fh.url = url;
                    fh.sq3File = new sqlite3_file(fid);
                    fh.sq3File.$pMethods = httpIoMethods.pointer;
                    fh.size = BigInt((_a = xhr.getResponseHeader('Content-Length')) !== null && _a !== void 0 ? _a : 0);
                    fh.pageCache = new LRUCache({
                        maxSize: ((_b = options === null || options === void 0 ? void 0 : options.cacheSize) !== null && _b !== void 0 ? _b : VFSHTTP.defaultOptions.cacheSize) * 1024,
                        sizeCalculation: (value) => { var _a; return (_a = value.byteLength) !== null && _a !== void 0 ? _a : 4; }
                    });
                    if (xhr.getResponseHeader('Accept-Ranges') !== 'bytes') {
                        console.warn(`Server for ${url} does not advertise 'Accept-Ranges'. ` +
                            'If the server supports it, in order to remove this message, add "Accept-Ranges: bytes". ' +
                            'Additionally, if using CORS, add "Access-Control-Expose-Headers: *".');
                    }
                    openFiles[fid] = fh;
                    valid = true;
                };
                xhr.send();
            }
            catch (e) {
                console.error('xOpen', e);
            }
            if (!valid) {
                console.error('xOpen');
                return capi.SQLITE_CANTOPEN;
            }
            wasm.poke(pOutFlags, capi.SQLITE_OPEN_READONLY, 'i32');
            return capi.SQLITE_OK;
        }
    };
    sqlite3.vfs.installVfs({
        io: { struct: httpIoMethods, methods: ioSyncWrappers },
        vfs: { struct: httpVfs, methods: vfsSyncWrappers }
    });
    sqlite3.oo1.DB.dbCtorHelper.setVfsPostOpenCallback(httpVfs.pointer, function (oo1Db, sqlite3) {
        var _a;
        sqlite3.capi.sqlite3_busy_timeout(oo1Db, (_a = options === null || options === void 0 ? void 0 : options.timeout) !== null && _a !== void 0 ? _a : VFSHTTP.defaultOptions.timeout);
        sqlite3.capi.sqlite3_exec(oo1Db, [
            'PRAGMA query_only=ON;',
            'PRAGMA cache_size=0;'
        ], 0, 0, 0);
    });
}
//# sourceMappingURL=vfs-sync-http.js.map
