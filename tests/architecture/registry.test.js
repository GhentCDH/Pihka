import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createComponentRegistry } from '../../pihka/core/ui/registry/index.js';
import { loadPluginModules, normalizeEngineConfig } from '../../pihka/bootstrap.js';

const component = () => null;
test('registry installs atomically, overrides by identity and isolates instances', () => {
    const registry = createComponentRegistry();
    registry.install({ register(api) { api.registerComponent({kind:'view',context:'list',id:'table',component}); } });
    let scope;
    assert.throws(() => registry.install({ register(api) { scope = api; api.registerComponent({kind:'view',context:'list',id:'table',component:()=>1}); throw new Error('broken'); } }), /broken/);
    assert.equal(registry.get('view','table','list').component, component);
    assert.throws(() => scope.registerComponent({kind:'cell',id:'late',component}), /closed/);
    assert.equal(createComponentRegistry().get('view','table','list'), undefined);
    assert.throws(() => registry.install({ async register(api) { api.registerComponent({kind:'cell',id:'async',component}); } }), /synchronous/);
    assert.equal(registry.get('cell','async'), undefined);
    registry.seal();
    assert.throws(() => registry.install({register(){}}), /sealed/);
});

test('timed-out import cannot install after completing late', async () => {
    const source = 'await new Promise(resolve => setTimeout(resolve, 40)); export function register(){ throw new Error("must never install"); }';
    const modules = await loadPluginModules(['data:text/javascript,' + encodeURIComponent(source)], {baseUrl:'http://localhost/',timeoutMs:5});
    assert.deepEqual(modules, []);
    await new Promise(resolve => globalThis.setTimeout(resolve, 60));
    assert.deepEqual(modules, []);
});

test('composition extracts only semantic engine settings', () => {
    const config = normalizeEngineConfig({tables:{works:{hidden:true,columns:{count:{type:'number',label:'Count'},body:{type:'text',fts:false}}}}, perspectives:[{id:'summary',table:'summary',query:'SELECT 1',label:'Summary'}]});
    assert.deepEqual(config.columns.works, {count:{numeric:true,noFts:false},body:{numeric:false,noFts:true}});
    assert.deepEqual(config.perspectives,[{id:'summary',table:'summary',query:'SELECT 1'}]);
    assert.ok(!JSON.stringify(config).includes('hidden'));
    assert.ok(!JSON.stringify(config).includes('label'));
    assert.deepEqual(normalizeEngineConfig({perspectives:'invalid',tables:{works:{columns:{title:null}}}}).perspectives, []);
    assert.deepEqual(normalizeEngineConfig({tables:{works:null}}).columns.works, {});
});
