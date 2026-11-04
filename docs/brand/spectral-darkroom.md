# Spectral Darkroom

Status: approved by the founder for publication. The current layout,
copy, font families, responsive rules, capture media, viewer, and intake behavior
are preserved. This document supplements the project brief and brand context; it
does not change product promises or rename the service.

## Color definitions

`src/styles/tokens.css` is the color source of truth. Primitive `--palette-*`
variables contain values; components use semantic `--color-*` roles.

| Role           | Value   | Use                                                |
| -------------- | ------- | -------------------------------------------------- |
| Background     | #0B0D12 | Main photographic frame                            |
| Surface        | #151922 | Cards, method section, form                        |
| Surface alt    | #1C202A | Secondary surfaces, hover, feedback                |
| Text           | #F2F1EE | Warm primary text                                  |
| Muted text     | #B5B8C3 | Descriptions and captions                          |
| Border         | #343740 | Nonessential separators                            |
| Control border | #777C8B | Identifiable inputs and secondary controls         |
| Orange         | #FF622D | Brand details and primary actions                  |
| Orange hover   | #FF804F | Primary action hover                               |
| Lime           | #A5F951 | Checked inputs and actual success feedback         |
| Blue           | #48BBFF | Focus, viewer guidance, link interaction           |
| Pink           | #FF73B5 | Reserved expressive primitive; unused on this page |
| Error          | #FFAAA0 | Error text and marker                              |

## Semantic roles and hierarchy

- `--color-brand` identifies the project in the wordmark dot, product-line text,
  and occasional labels. The hero heading stays neutral.
- `--color-primary-action` and `--color-on-primary` pair orange with dark text.
  `--color-primary-action-hover` supplies the hover fill.
- `--color-secondary-action`, its hover token, and `--color-on-secondary` define
  neutral secondary actions, including Open Omnema and loading the viewer.
- `--color-focus` is a blue outline, offset from controls. Links gain underlines
  on hover, rather than relying on a color change alone.
- `--color-interactive-highlight` supports spatial guidance and interactive links.
- `--color-selected` and `--color-success` use lime only for genuine selection or
  success. The idle viewer placeholder does not imply active capture.
- `--color-error` and `--color-notice` are separate from brand/presentation colors.
  Existing written error, success, and preview messages remain intact, with their
  existing live-region behavior. Native validation still names missing fields.

Most pixels are neutral. Orange leads the accent hierarchy; blue is secondary,
lime appears in specific states, and pink need not appear at all. The old full
color section fills become neutral surfaces. Existing decorative circles retain
their geometry but lose gradients and glows. No filter, tint, blending, or overlay
is applied to videos, posters, or reconstructed media.

`BaseLayout.astro` imports tokens before component styles. The browser theme-color
and standalone SVG favicon repeat the background/brand values because external
browser chrome and favicon SVG cannot inherit page CSS variables. Keep these two
small browser assets synchronized when changing the shared palette.

## Accessibility

Targets: 4.5:1 for ordinary text and 3:1 for control boundaries and focus indicators.
Quiet separators use the low-contrast border token only where they are decorative;
controls use the stronger control-border token. Dark text is used on orange fills.
Disabled actions retain legible neutral text and native disabled semantics.
Focus adds an outline, checked inputs show a checkmark, hover adds underlining,
and feedback includes explicit text and a side rule. Status is never color alone.

The first rendered homepage contrast audit covered 99 visible text-bearing
elements with no failures below 4.5:1; the minimum measured pair was 5.89:1.
This is a targeted check, not certification of the third-party viewer or every
browser's native video/validation UI.

## Future session themes and Omnema adoption

Copy the neutral and semantic token layer into Omnema in a separate task. Map its
existing buttons, inputs, errors, capture indicators, and focus rings to semantic
roles before changing any session presentation. Do not replace session-derived
colors with orange globally.

`--color-session-accent` is a presentation-only hook, defaulting to blue. A future
session container can override it with a vetted session-derived color and use it
for a session title marker or media caption detail. It must not override global
navigation, primary actions, focus, success, errors, or capture-active state.
Test the derived accent against its actual surface (4.5:1 if used as small text,
3:1 for meaningful non-text indicators); adjust its lightness or fall back to blue
when it fails. Keep the session name or marker shape as a non-color cue.

The hook is declared here but not applied to an invented session identity. No
Omnema application, session page, capture workflow, or Opal producer is changed.
For future Opal presentations, use the same neutral frame and preserve the
captured image's actual colors. Existing film graphics and the separately bundled
viewer retain their original appearance and remain the known visual exceptions.

## Validation of this experiment

Astro check and production build pass. Prettier passes; no separate lint script is
configured. The three existing Worker tests pass with delivery mocked. The
homepage, application form, navigation, and bundled viewer/media sources are
unchanged. Desktop and 390px mobile views were inspected; no horizontal overflow
was found on mobile. The browser verified required fields, required consent, blue
focus, local-only submission success, and explicit error feedback. No live email
was sent. Reconstructed media and video retain filter:none.

Calculated contrast pairs, including the CSS-defined hover states:

| Pair                         | Contrast |
| ---------------------------- | -------- |
| Primary text                 | 17.21:1  |
| Muted text on raised surface | 8.23:1   |
| Primary action               | 6.51:1   |
| Primary hover                | 7.82:1   |
| Secondary action/hover       | 14.42:1  |
| Control boundary             | 3.91:1   |
| Focus on raised surface      | 7.62:1   |
| Success feedback             | 12.62:1  |
| Error feedback               | 8.93:1   |
