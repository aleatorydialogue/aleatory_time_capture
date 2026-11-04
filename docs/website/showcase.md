# Capture showcase

Local implementation at /showcase/, linked from the homepage scene section.
Uses the existing BaseLayout and typography. Orange-led accents are scoped to
the showcase per the requested palette; shared blue-led homepage tokens are intact.

Five sections: finished spatial scene, room, moving people, experimental sculpture,
and existing Opal film. Videos are native controls, preload=none, no autoplay.
Starting one pauses the others; leaving the tab pauses playback. No model downloads.
Sculpture is explicitly an interpretation and not a finished physical deliverable.

Four derived MP4s and JPEG posters live in ignored public/showcase-media/.
These personal capture assets are deliberately not committed. The production
build includes local assets, but a fresh GitHub checkout does not. Before publishing,
supply approved media through the deployment artifact process; do not push an
incomplete media-less gallery. Founder review of new public media is pending.
The existing Opal film uses its existing /site_video/ URL.

Current new previews total approximately 2.3 MB. Static scene previews have no audio.
The sculptural preview crops the pre-existing diagnostic title/footer away.
No private session identifiers or internal reconstruction settings appear on the page.

Validation: Astro check/build; browser desktop/mobile inspection. Local preview:
npm run preview -- --host 127.0.0.1 --port 4325
