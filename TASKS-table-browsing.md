# Compact table browsing
Goal: compact word previews and viewport-filling tables, with the footer below the workspace.
Done: browser checks pass for both SQLite transports; desktop tables fit, details retain full text, footer remains reachable.
Constraints: no dependencies or database changes; preserve typography, logos and plugin registries.
Stop only for missing user decisions or destructive actions. Commit and publish are authorized.

- [x] Add configurable word previews and document renderer context.
- [x] Fit tables to available width and move footer below desktop table workspace.
- [x] Test both transports, inspect Chrome, run lint/type checks.
- [x] Create Conventional Commits and push refactor/main.

Verification: 10 focused Playwright checks passed across download/HTTP VFS; lint, type checks and diff checks passed. Chrome MCP: Dutch works table fits at 1440px, footer below viewport; narrower layouts retain scroll fallback.
