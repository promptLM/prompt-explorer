# Lovable Changes

- [x] BrowserRouter basename set to `import.meta.env.BASE_URL`
- [x] public/404.html SPA redirect for GitHub Pages
- [x] All data fetches use `resolvePath()` with BASE_URL
- [x] Evaluation rendering falls back to `evaluator`/`type` when `name` is missing
- [x] UI reads from `/data/index.json`, `/data/prompts/<group>/<name>/history.json`, `/data/prompts/<group>/<name>/versions/<version>.json`
- [x] Vite `base` set via `VITE_BASE` env or defaults to `"./"` for relative paths
