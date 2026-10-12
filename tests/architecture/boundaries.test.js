import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { Linter } from 'eslint';

const root = resolve('pihka');
function files(dir) {
    return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.name === 'vendor' ? []
        : entry.isDirectory() ? files(resolve(dir, entry.name))
        : entry.name.endsWith('.js') ? [resolve(dir, entry.name)] : []);
}
function imports(path) {
    const targets = [];
    const linter = new Linter();
    const messages = linter.verify(readFileSync(path, 'utf8'), [{
        languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
        plugins: { graph: { rules: { imports: { create: () => ({
            ImportDeclaration: node => targets.push(node.source.value),
            ExportNamedDeclaration: node => { if (node.source) targets.push(node.source.value); },
            ExportAllDeclaration: node => targets.push(node.source.value),
            ImportExpression: node => { if (typeof node.source.value === 'string') targets.push(node.source.value); },
        }) } } } },
        rules: { 'graph/imports': 'error' },
    }]);
    assert.deepEqual(messages, [], `${relative(root, path)} must parse`);
    return targets;
}

test('authored import graph respects engine, registry, runtime and extension boundaries', () => {
    const graph = new Map();
    for (const path of files(root)) {
        const name = relative(root, path);
        assert.ok(!name.startsWith('core/js/'), 'obsolete implementation must be removed');
        const targets = imports(path);
        const local = targets.filter(target => target.startsWith('.')).map(target => resolve(dirname(path), target));
        for (const target of local) assert.ok(existsSync(target), `${name} imports missing ${target}`);
        graph.set(path, local.filter(target => !target.includes('/vendor/')));
        for (const target of targets) {
            const full = target.startsWith('.') ? relative(root, resolve(dirname(path), target)) : target;
            if (name.startsWith('core/engine/')) {
                assert.ok(!/^(?:preact|core\/ui|app\/|extensions\/)/.test(full), `${name} → ${full}`);
            }
            if (name.startsWith('core/ui/registry/')) assert.ok(full.startsWith('core/ui/registry/'), `${name} → ${full}`);
            if (name.startsWith('core/ui/')) assert.ok(!/^(?:core\/engine|app\/|extensions\/)/.test(full), `${name} → ${full}`);
            if (name.startsWith('core/ui/runtime/')) assert.ok(!full.startsWith('core/ui/defaults/'), `${name} → ${full}`);
            if (name.startsWith('extensions/')) {
                assert.ok(!full.startsWith('app/'), `${name} → ${full}`);
                if (full.startsWith('core/ui/')) assert.equal(full, 'core/ui/index.js', `${name} must use UI public API`);
                if (full.startsWith('extensions/')) assert.equal(full.split('/')[1], name.split('/')[1], `${name} crosses plugin implementations`);
            }
        }
    }
    const visited = new Set();
    function visit(path, ancestors = []) {
        assert.ok(!ancestors.includes(path), `import cycle: ${[...ancestors, path].map(p => relative(root, p)).join(' → ')}`);
        if (visited.has(path)) return;
        for (const target of graph.get(path) ?? []) visit(target, [...ancestors, path]);
        visited.add(path);
    }
    for (const path of graph.keys()) visit(path);
});
