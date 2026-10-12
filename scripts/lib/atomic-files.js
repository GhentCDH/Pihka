import { createWriteStream } from "node:fs";
import { mkdir, mkdtemp, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

/** Build beside the destination so the final rename stays on one filesystem. */
export async function atomicOutput(destination, produce) {
    await mkdir(dirname(destination), { recursive: true });
    const staging = await mkdtemp(join(dirname(destination), ".pihka-"));
    const temporary = join(staging, "output");
    try {
        const result = await produce(temporary);
        await rename(temporary, destination);
        return result;
    } finally {
        await rm(staging, { recursive: true, force: true });
    }
}

export function atomicWrite(destination, contents) {
    return atomicOutput(destination, (temporary) => writeFile(temporary, contents));
}

/** Stream with backpressure; a failed response never becomes a completed file. */
export async function downloadFile(url, destination, { onProgress, ...fetchOptions } = {}) {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) throw new Error(`Failed to download ${url}: HTTP ${response.status}`);
    if (!response.body) throw new Error(`Empty response body: ${url}`);
    const total = Number(response.headers.get("content-length")) || 0;
    let received = 0;
    try {
        await atomicOutput(destination, async (temporary) => {
            await pipeline(
                Readable.fromWeb(response.body),
                new Transform({
                    transform(chunk, encoding, callback) {
                        received += chunk.length;
                        try {
                            onProgress?.(received, total);
                            callback(null, chunk);
                        } catch (error) {
                            callback(error);
                        }
                    },
                }),
                createWriteStream(temporary, { flags: "wx" }),
            );
        });
    } finally {
        if (!response.body.locked) await response.body.cancel().catch(() => {});
    }
    return received;
}
