# Website video handoff

Use capture03-pingpong.mp4 for the front-page showcase and capture03-poster.jpg as its loading poster. Copy both into the site's public/static media directory. No model download or viewer code is needed.

The video follows the original cam02 trajectory forward, then plays the whole animation backward. It preserves the existing 15 fps preview cadence, at 960x540. Duration: 32.8 seconds, 492 frames, 19,058,975 bytes. Encoding: H.264, yuv420p, CRF 20, no audio, faststart MP4. Forward/reverse endpoints are not duplicated; the end-to-start loop continues into the next forward frame. Direction changes deliberately reverse the captured action too.

HTML (adjust paths to the site's asset location):
~~~html
<video autoplay muted loop playsinline preload="metadata"
       poster="/media/capture03-poster.jpg"
       style="display:block;width:100%;height:auto">
  <source src="/media/capture03-pingpong.mp4" type="video/mp4">
</video>
~~~
In React, use autoPlay and playsInline with muted and loop. Keep the poster visible if autoplay is unavailable. Honor the site's reduced-motion preference by showing the poster or offering playback on request. Use object-fit:cover only if intentional cropping is acceptable; contain preserves the full capture.

preview.html is a standalone example. Serve this folder via a local/static HTTP server to preview it. Production must serve the MP4 as video/mp4; byte-range support is useful. No special cross-origin headers are needed when these assets are hosted alongside the site.

Source: outputs/mvdr_capture03/train_v2/cam02_continuous.mp4, rendered from the raw dynamic model using gsplat. This is a presentation video, not an interactive 3D asset. The raw representation remains unchanged.
Validation: expected 492 frames / 32.8 seconds confirmed; complete decode finished without errors.
