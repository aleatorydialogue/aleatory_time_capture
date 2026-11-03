# Foundry Viewer integration

Installed from `/home/aleat/foundry/viewer` on 2026-11-02. Source repository: https://github.com/aleatorydialogue/foundry-viewer (private).

Assets:
- https://huggingface.co/aleatorydialogue/stmodels/resolve/main/scene.dynamic.fsp.gz — 34,557,556 bytes
- https://huggingface.co/aleatorydialogue/stmodels/resolve/main/room.ply — 59,001,477 bytes

`scene.foundry.json` retains the mobile hybrid's exact registration matrix and declares both byte sizes. `settings.json` supplies the initial camera. The assets must be served over HTTPS with CORS allowing rememberingpresence.com. HTTP headers and sizes were verified before deployment. Avoid replacing either file in place with an unrelated model: update the transform and byte counts together.

To update viewer code, run `npm ci && npm run build` in the viewer repository, then copy `public/index.html`, `public/index.js`, `public/index.css`, `public/gsaf-decoder.wasm`, `LICENSE` and `THIRD_PARTY_NOTICES.md` into this directory. Preserve this site's `scene.foundry.json` and `settings.json`. Run the site's `npm run check` and `npm run build`, and verify the click-to-load experience before pushing main.

The PLY assets are external and must not be added to this repository. The old static `index.sog` has been removed from the current tree; it remains in Git history. The retained viewer MIT license and third-party notices apply to the bundled application.

Bundled viewer source revision: 9d0f45a (main).

Foundry scenes use the sorted renderer even when this origin has a saved Performance Mode preference. The stochastic renderer was reproduced omitting the static room. The iframe URL and module import are revisioned to refresh cached viewer code. Preserve/update these revision query strings when replacing the bundle.

The hybrid room now refreshes its render buffer alongside the animated subjects, fixing stale room transforms during AR placement/scaling. This trades some GPU work for correct registration; phone performance should be checked.

Opt-in phone diagnostics: `/splat-viewer/index.html?webgl&diagnostics`. Enter AR and adjust your interior viewpoint during the 30-second setup countdown. Four automatic stages each warm up for 3 seconds and measure for 15 seconds. Exit AR for a local text report. Nothing is uploaded. The normal viewer has no diagnostics overhead from sampling. People assets are unchanged.

The scene is floor-aligned using an estimated dominant plane and orthogonal wall direction. A reversible center crop in the leveled frame retains about 184,509 of 250,000 room splats: min [-2.65,-0.12,-4.25], max [2.8,3.35,2.25]. The crop is evaluated in memory; the original remote PLY is untouched and download size is unchanged. It does not remove interior floaters or precisely clip Gaussian extents. `?uncropped` bypasses it.

The starting camera is [1.6,1.65,-2.6], looking toward [-0.1,1.1,0]. AR now places the room around floor entry [1.6,0,-2.6] at authored scale, with no faded placement preview. `?diorama` restores small-object placement. AR device verification is pending; scale is approximate until calibrated from a physical measurement. Module, manifest and settings URLs are revisioned together to prevent stale camera/configuration caches.

GPU spline playback now evaluates motion, appearance and visibility in shaders. WebGL maintains sort centers in a background worker at up to 10 Hz; visible motion updates each render frame. `?cpu` restores the old evaluation path for comparisons. The existing external PLY works with this path. Production uses the compact FSP16 gzip asset. Its remote response was verified as HTTP 200, 34,557,556 bytes, with CORS allowing all origins. Interior placement, crop and alignment are preserved. Desktop WebGL/WebGPU playback and seeking passed; the user confirmed substantially improved phone AR animation after the GPU update.
