# Foundry Viewer integration

Installed from `/home/aleat/foundry/viewer` on 2026-11-02. Source repository: https://github.com/aleatorydialogue/foundry-viewer (private).

Assets:
- https://huggingface.co/aleatorydialogue/stmodels/resolve/main/scene.dynamic.ply — 70,776,703 bytes
- https://huggingface.co/aleatorydialogue/stmodels/resolve/main/room.ply — 59,001,477 bytes

`scene.foundry.json` retains the mobile hybrid's exact registration matrix and declares both byte sizes. `settings.json` supplies the initial camera. The assets must be served over HTTPS with CORS allowing rememberingpresence.com. HTTP headers and sizes were verified before deployment. Avoid replacing either file in place with an unrelated model: update the transform and byte counts together.

To update viewer code, run `npm ci && npm run build` in the viewer repository, then copy `public/index.html`, `public/index.js`, `public/index.css`, `public/gsaf-decoder.wasm`, `LICENSE` and `THIRD_PARTY_NOTICES.md` into this directory. Preserve this site's `scene.foundry.json` and `settings.json`. Run the site's `npm run check` and `npm run build`, and verify the click-to-load experience before pushing main.

The PLY assets are external and must not be added to this repository. The old static `index.sog` has been removed from the current tree; it remains in Git history. The retained viewer MIT license and third-party notices apply to the bundled application.

Bundled viewer source revision: 61de4f6 (main).

Foundry scenes use the sorted renderer even when this origin has a saved Performance Mode preference. The stochastic renderer was reproduced omitting the static room. The iframe URL and module import are revisioned to refresh cached viewer code. Preserve/update these revision query strings when replacing the bundle.

The hybrid room now refreshes its render buffer alongside the animated subjects, fixing stale room transforms during AR placement/scaling. This trades some GPU work for correct registration; phone performance should be checked.
