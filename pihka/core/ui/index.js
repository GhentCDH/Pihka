// @ts-check
import { h, render } from "preact";
import { Router, redirectLegacyPathUrl } from "./runtime/router.js";
import { RegistryContext, ComponentHost } from "./runtime/component-host.js";
import { createPresentationStore } from "./runtime/presentation.js";
import { loadPerspectives } from "./runtime/perspectives.js";
import { ensureStylesheet } from "./runtime/stylesheets.js";
export { createComponentRegistry } from "./registry/index.js";
export {
    ComponentHost,
    registeredComponent,
    RegistryContext,
    useRegistry,
} from "./runtime/component-host.js";
export { buildPath, navigate, updateParams, useRouter } from "./runtime/router.js";
export { useQuery, QueryStatus } from "./runtime/use-query.js";
export { localize, visibleColumns } from "./runtime/table-config.js";
export { assetUrl } from "./runtime/paths.js";
export function installPlugin(registry, plugin) {
    for (const { href, options } of registry.install(plugin)) ensureStylesheet(href, options);
}
export function showStatus({ element, registry, message, error }) {
    render(
        h(
            RegistryContext.Provider,
            { value: registry },
            h(ComponentHost, { kind: "shell", id: "status", message, error }),
        ),
        element,
    );
}
export async function mountUI({ element, registry, store, schema, config, footer, menu }) {
    redirectLegacyPathUrl();
    const presentation = createPresentationStore(store, schema, config, registry);
    const { perspectives, defaultLanguage } = await loadPerspectives(
        presentation.schema,
        config,
        registry,
    );
    render(
        h(
            RegistryContext.Provider,
            { value: registry },
            h(
                Router,
                { registry },
                h(ComponentHost, {
                    kind: "shell",
                    id: "app",
                    store: presentation.store,
                    perspectives,
                    defaultLang: defaultLanguage,
                    languages: config.languages || null,
                    footer,
                    menu,
                }),
            ),
        ),
        element,
    );
    return { ...presentation, unmount: () => render(null, element) };
}

export { extensionOptions } from "./runtime/extension-options.js";
