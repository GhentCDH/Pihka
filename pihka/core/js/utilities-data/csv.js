/**
 * Plain-JSON to CSV serialization (RFC 4180 style). Pure data code — no
 * preact, no DOM — so it stays reusable outside the UI.
 */

/**
 * Serialize rows to a CSV string with a header line.
 *
 * Fields containing a quote, comma, or line break are quoted, with inner
 * quotes doubled; null/undefined become empty fields; everything else is
 * emitted via String() (raw values, no display formatting).
 *
 * @param {string[]} columnNames - header names, also the row keys to emit
 * @param {Array<Object>} rows - row objects
 * @returns {string} CSV text with \r\n line endings
 */
export function toCsv(columnNames, rows) {
    const lines = [columnNames.map(escapeField).join(",")];
    for (const row of rows) {
        lines.push(columnNames.map(name => escapeField(row[name])).join(","));
    }
    return lines.join("\r\n") + "\r\n";
}

function escapeField(value) {
    if (value == null) return "";
    const text = String(value);
    return /[",\r\n]/.test(text)
        ? '"' + text.replace(/"/g, '""') + '"'
        : text;
}
