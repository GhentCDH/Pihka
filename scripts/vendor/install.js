import { existsSync, renameSync, rmSync } from "node:fs";

/** Replace a prepared batch, restoring every original if any rename fails. */
export function installOutputs(outputs, { renameImpl = renameSync } = {}) {
    const installed = [];
    try {
        for (const [index, { source, target }] of outputs.entries()) {
            const backup = `${source}.backup-${index}`;
            const state = { target, backup, saved: false, replaced: false };
            installed.push(state);
            if (existsSync(target)) {
                renameImpl(target, backup);
                state.saved = true;
            }
            renameImpl(source, target);
            state.replaced = true;
        }
    } catch (error) {
        const rollbackErrors = [];
        for (const state of installed.reverse()) {
            try {
                if (state.replaced) rmSync(state.target, { recursive: true, force: true });
                if (state.saved) renameSync(state.backup, state.target);
            } catch (rollbackError) {
                rollbackErrors.push(rollbackError);
            }
        }
        if (rollbackErrors.length)
            throw new AggregateError(
                [error, ...rollbackErrors],
                "Vendor installation and rollback failed; staging backups retained",
            );
        throw error;
    }
    for (const state of installed)
        if (state.saved) rmSync(state.backup, { recursive: true, force: true });
}
