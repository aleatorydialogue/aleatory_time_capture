# Website brief

## Purpose

The v0 website should introduce **Remembering Presence**, help a nontechnical visitor understand the value of a Spatial Memory, trust the care behind the service, and apply for a small Founding Captures program in Connecticut. It should not simulate the breadth or certainty of a mature service.

## Primary journey

1. Encounter an emotionally meaningful example.
2. Understand how a spatial memory differs from a photograph or video.
3. See an authentic capture and an accessible fallback.
4. Learn what the current experiment involves and what remains uncertain.
5. Decide whether the experience may fit a meaningful subject or occasion.
6. Submit a short, privacy-conscious application or contact request.

## Initial information architecture

- **Home:** emotional proposition, concise explanation, proof/example, Founding Captures call to action
- **What is a Spatial Memory?:** plain-language comparison and interactive or video demonstration
- **Capture a Memory:** current program, fit, process, limitations, location, expectations, and application
- **What You Receive:** confirmed outputs first; clearly labeled explorations second
- **The Memory Dome:** future vision, explicitly not presented as an operating studio
- **How It Works:** optional progressive disclosure from customer process to technical detail
- **Building Aleatory:** restrained link to aleatory.ai and Holding the String
- **Privacy / Terms:** available before intake launches

These may begin as sections rather than separate routes if that produces a clearer, faster v0.

## Omnema capture application

The home page includes a dedicated Omnema section after How It Works, with a
primary-navigation anchor and an **Open Omnema** link to
<https://capture.rememberingpresence.com/auto>. Omnema is our distributed capture
application, using available phones to record synchronized video from multiple
angles. This description comes from the founder; it does not establish device
compatibility, synchronization accuracy, or a promised reconstruction result.

## Content requirements

- At least one authentic, consented example before strong fidelity claims
- Poster image and ordinary video fallback for every interactive spatial example
- Plain-language description of experimental status
- Current geographic and subject constraints once known
- Connecticut as the initial service area
- Honest distinction between static scenes and captures that can support volumetric video
- Clear statement of what happens after an application
- Separate optional marketing/publication consent
- No required technical knowledge

## Conversion

The initial conversion is a qualified expression of interest, not checkout. Ask only for data needed to assess fit and make contact. Avoid asking applicants to upload sensitive capture media in the first form.

Instrument the minimum useful events once analytics is selected: meaningful example engagement, primary call-to-action activation, form start, form success, and form failure. Do not add invasive session replay by default.

## Quality requirements

- Fast and usable before large media loads
- Keyboard accessible and screen-reader understandable
- Respect reduced-motion preferences
- Functional without WebGL and resilient on lower-powered mobile devices
- Semantic, indexable core content
- Clear focus, error, loading, and fallback states
- No autoplay audio

## Initial success signals

Success should be evaluated through comprehension and qualified interest, not traffic alone. Early signals include whether visitors can accurately explain the proposition, whether suitable prospects apply, why they care, and where expectation differs from current capability.

Numeric targets remain open until baseline traffic and program capacity are known.

## Editorial refinement (2026-11-03)

The homepage now leads with the Remembering Presence product identity, explicitly
credited to Aleatory Time Capture. This is a founder-requested presentation change
to the public wordmark convention in ADR 0003, not a change of service name.
Consent, privacy, and the intake contract retain Aleatory Time Capture.

The page order is introduction, opt-in interactive capture, recorded film, method
(including Omnema), early Connecticut sessions, and application. The Memory Dome
is a small future-concept note after the application. Existing anchors remain.
The comparative cards and repeated conceptual explanations have been removed.

The current example is a static room combined with animated subjects, superseding
the older static-only example referenced in the redesign brief. Its transfer size
is derived from the scene manifest (currently about 94 MB, plus viewer code).
Neither the iframe nor its models load before a visitor selects the load button.
The film uses native controls and preload=none, with no autoplay, a poster, and a
visible direct MP4 link. The historic /video/intro.mp4 URL returns 404; no current
frontend link references it. The current /site_video/opal-58e2c44c43f74117.mp4
returns 200. No duplicate legacy media file has been added.

Rollback checkpoint: checkpoint/pre-editorial-refinement-2026-11-03 at 1a7a746.
Changes are local only; pushing main would trigger production deployment.
