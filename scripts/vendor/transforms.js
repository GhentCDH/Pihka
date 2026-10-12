/** Explicit patches fail closed when an upstream file changes. */
export function transformFile(buffer, replacements = [], file = "file") {
    if (!replacements.length) return buffer;
    let source = buffer.toString("utf8");
    for (const [before, after] of replacements) {
        if (source.split(before).length !== 2) {
            throw new Error(`Vendor patch no longer matches uniquely: ${file}`);
        }
        source = source.replace(before, () => after);
    }
    return Buffer.from(source.endsWith("\n") ? source : source + "\n");
}
