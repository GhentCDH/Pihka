import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
    {
        ignores: [
            "node_modules/**",
            "pihka/core/vendor/**",
            "pihka/core/stylesheets/**",
            "test-results/**",
            "playwright-report/**",
        ],
    },
    js.configs.recommended,
    {
        files: ["pihka/**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                fetch: "readonly",
                history: "readonly",
                location: "readonly",
                console: "readonly",
                CustomEvent: "readonly",
                EventTarget: "readonly",
                Event: "readonly",
                URL: "readonly",
                URLSearchParams: "readonly",
                Uint8Array: "readonly",
                setTimeout: "readonly",
                clearTimeout: "readonly",
                requestAnimationFrame: "readonly",
                ResizeObserver: "readonly",
            },
        },
        rules: {
            "no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
    },
    {
        files: ["tests/**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                Event: "readonly",
                console: "readonly",
            },
        },
    },
    {
        files: ["scripts/**/*.js", "*.config.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                process: "readonly",
                console: "readonly",
                Buffer: "readonly",
                __dirname: "readonly",
                URL: "readonly",
                fetch: "readonly",
                TransformStream: "readonly",
            },
        },
    },
    prettier,
];
