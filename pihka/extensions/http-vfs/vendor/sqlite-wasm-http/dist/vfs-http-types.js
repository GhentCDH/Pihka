var _a;
export const defaultOptions = {
    timeout: 20000,
    maxPageSize: 4096,
    cacheSize: 1024,
    headers: {}
};
// These must be different from any SQLite CAPI codes
export var SYNC;
(function (SYNC) {
    SYNC[SYNC["WORKMSG"] = 16777215] = "WORKMSG";
    SYNC[SYNC["HANDSHAKE"] = 16777214] = "HANDSHAKE";
})(SYNC = SYNC || (SYNC = {}));
const debugOptions = (typeof SQLITE_DEBUG !== 'undefined' && SQLITE_DEBUG) ||
    (typeof process !== 'undefined' && typeof ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.SQLITE_DEBUG) !== 'undefined' && process.env.SQLITE_DEBUG) ||
    '';
export const debugSys = ['threads', 'vfs', 'cache', 'http'];
export const debug = {};
for (const d of debugSys) {
    debug[d] = debugOptions.includes(d) ?
        console.debug.bind(console) :
        () => undefined;
}
//# sourceMappingURL=vfs-http-types.js.map