# Temporary Field Notes media
Owner authorized publishing an approved Field Notes test on 2026-11-10.
The /fieldnotes/ static page has no gallery or recordings. A 256-bit token in its
URL fragment selects exactly one approved branded video served by the existing
forms Worker at /fieldnotes/TOKEN.mp4. These capability links are unlisted,
no-index and no-store, not authenticated/private links. No raw captures or media
enter Git. Cloudflare Access continues protecting the separate capture app.

R2 bucket aleatory-fieldnotes-outbound is non-public; only the Worker exposes
individual random keys. Authenticated multipart upload uses FIELDNOTES_UPLOAD_KEY.
No listing route. Each render gets a fresh token; never overwrite a URL used by
Buffer. The publisher removes the temporary copy only after all configured
platforms report sent, while preserving the canonical local recording/render.
Unknown or failed publication retains media for reconciliation. Deployment uses
existing GitHub Actions Cloudflare credentials with R2 Storage edit permission.
