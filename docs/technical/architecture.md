# Technical architecture

## Status

Initial Astro application scaffolded. ADR 0001 records the accepted stack direction.

## Principles

- Static-first for narrative content, speed, accessibility, and operational simplicity
- Progressive enhancement for interactive spatial media
- Isolate heavy viewers and vendor integrations behind narrow interfaces
- Keep content reviewable in the repository until a CMS solves a demonstrated need
- Collect and retain the least customer data needed
- Prefer replaceable services and portable exports over platform lock-in
- Do not make the marketing site the canonical archive for customer memories

## Proposed application shape

An Astro application should render content pages statically. Strict TypeScript should cover application code and content schemas. React should be introduced only as an island for interaction that benefits from its ecosystem. A future spatial viewer should load on demand, expose a still-image/video fallback, and remain independent from the surrounding page.

Initial content can live as typed Markdown/MDX or structured local data. CSS custom properties should define brand tokens. Tailwind should be adopted only if the implementation team deliberately chooses it after visual exploration.

The initial application form posts directly to a Cloudflare Worker supplied through `PUBLIC_APPLICATION_FORM_ENDPOINT`. The Worker sends validated submissions through Resend without intentionally storing its own copy. Without endpoint configuration, the UI stays in an explicit preview state and does not collect data. See ADR 0002 and `deployment.md`.

## System boundaries

### Public site

Owns published narrative, examples, program details, application UI, consent copy, and accessible media presentation.

### Intake service

A replaceable server-side or serverless boundary validates submissions, performs spam controls, records consent context, and routes leads to an approved destination. Provider selection is open. Sensitive configuration must remain outside Git.

### Spatial media delivery

Large models, reconstructions, and video should use fit-for-purpose object storage and delivery rather than the Git repository. Define formats, access level, cache behavior, fallbacks, performance budgets, and deletion behavior before integration.

### Customer archive or portal

Explicitly out of scope for the first marketing site. Private delivery and long-term storage need separate product, identity, security, and support decisions.

### Analytics

Use a privacy-conscious, minimal event model after success questions are defined. Keep marketing analytics separate from private capture engagement where possible.

## Proposed quality tooling

- ESLint and Prettier for consistency
- Vitest for logic and component-level tests
- Playwright for critical journeys and browser behavior
- Automated type checking and production builds
- Accessibility and performance checks for representative pages

Exact scripts and CI configuration should be defined with scaffolding rather than invented in advance.

## Open decisions

- Whether email remains sufficient after initial application volume
- Analytics and consent approach
- Spatial viewer library and delivery formats
- Media storage and CDN
- Content authoring workflow
- Supported browser and device matrix
- Performance budgets based on real assets

## Current interactive example (2026-11-02)

The founder requested publication of the mobile hybrid scene using the supplied Hugging Face assets. The homepage's click-to-load iframe serves the Foundry Viewer build from `public/splat-viewer/`. The application and scene/settings JSON are static GitHub Pages assets. The compressed dynamic FSP and static PLY files remain on Hugging Face (`aleatorydialogue/stmodels`); they are not committed here. Total scene transfer is 93,559,033 bytes (about 94 MB), before viewer code. The homepage derives this figure from the manifest.

The iframe allows `fullscreen; xr-spatial-tracking`. WebGPU is preferred, with the viewer's WebGL fallback available. HTTPS and a compatible device/browser are required for XR; no headset compatibility claim is made. No model request is initiated until the visitor chooses to load the scene. Loading reports each asset's downloaded bytes and percentage, followed by preparation status. The scene configuration retains the registration transform and the original asset byte counts.

Viewer source is maintained separately in `aleatorydialogue/foundry-viewer` (private). See `public/splat-viewer/INTEGRATION.md` for the installed source revision and update steps. Public viewer JavaScript remains downloadable as required for browser execution, even though the source repository is private.
