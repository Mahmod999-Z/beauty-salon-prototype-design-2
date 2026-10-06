# Beauty salon prototype design — reuse guide

An Xbuilt Studio pitch-template system for hair salons and barbershops. Every
name, address, price, review, and photo in this repo is fictional/placeholder
content, kept only to demonstrate the design system. Fork this to pitch a
real, named client — see "Forking for a client" below.

## What this is

A single-route (`/`) Next.js site: a video hero that stays pinned and scales
away as you scroll, a signature price menu with per-service WhatsApp deep
links, an illustrative busy-times meter, a reviews band with a live count-up
rating, a photo gallery, opening hours with a live open/closed indicator, a
hygiene/trust strip, a drag-to-compare hair-length chooser, and a contact section with
a map, click-to-copy details, and a WhatsApp link.

Two things run globally and are worth knowing about before you edit anything:

- **`ShopPulse`** sets `data-shop="open" | "closed"` on `<html>` and advances
  one shared `--pole-phase` variable in a single rAF loop. Every barber pole on
  the page reads that variable, so the mark literally turns while the shop is
  open and stops, drained of colour, when it is closed. Scroll velocity nudges
  the speed and decays back to idle.
- **`CursorRig`** replaces the pointer on fine-pointer, motion-allowed devices
  with a tracking dot and a trailing ring that stretches along its direction of
  travel and snips on click. Elements opt into a state with
  `data-cursor="link | media | price | pole"`.

## Design tokens

In `src/app/globals.css`, via Tailwind v4 `@theme`.

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#0F0F10` | Text, dark sections, the pole body |
| Charcoal | `#17171A` | Raised dark surfaces (pitch overlay) |
| Graphite / Slate | `#232327` / `#3A3A41` | Dark borders and metal shading |
| Steel | `#8B8D94` | Muted text, busy-meter bars, metal rules |
| Bone | `#E4E0D9` | Warm neutral for hover states |
| Porcelain | `#F7F5F2` | Alternating warm section ground |
| Paper | `#FFFFFF` | Page ground |
| Pole blue | `#2030A0` | Links, focus rings, accents |
| Pole red (stripe) | `#D01020` | Prices, the Sunday badge, emphasis |
| Oxblood | `#7D1622` | Deep red alternative for body use |

Swap ink, paper, pole and stripe to re-brand the whole system — everything else
derives from them via `color-mix()`, so a new palette propagates automatically.
The ladder between ink and paper (charcoal → slate → steel → bone → porcelain)
is what keeps the page from reading like a template; pure black on pure white
with nothing in between is the single biggest "stock" tell.

Elevation is a three-step scale (`--shadow-e1/e2/e3`), all tinted with pole
blue rather than neutral grey. Use `shadow-e1` for resting surfaces, `e2` for
raised cards and media, `e3` for hover lift.

Contrast rules worth keeping: pole blue is never used as small text on ink
(fails AA at that size); pole red on ink is only used as large/bold display
type for the same reason.

Type is three voices: Space Grotesk (display/wordmark) and Inter (body/UI) via
`next/font/google`, plus **Bodoni Moda** (`font-serif`) for prices, the rating,
and opening times — the high-contrast serif numerals of old barbershop signage.
Display scale uses `clamp()`.

Bodoni is self-hosted as a **figures-only subset** (6.5KB rather than 47KB) —
see `src/app/fonts/README.md`. Only apply `font-serif` to numeric content;
words fall through to the Georgia fallback and will look wrong.

## Component architecture

Server components except where interactivity requires a client boundary:

- `src/lib/salon.ts` — **the only place with business facts.** Name, address,
  phone, email, owner blurb, services/prices, hours, the illustrative
  `busyness` profile, rating, and reviews. Also the euro helpers, the
  `whatsappHref()` builder, and the `HairSalon` JSON-LD.
- `src/lib/open-status.ts` — pure functions that compute "open now / opens at /
  closed" from `salon.hours`. `ShopPulse`, `OpenStatus`, `TodayMarker` and
  `BusyMeter` all read through this, so changing the hours shape in one place
  keeps everything correct.
- `src/components/shop-pulse.tsx` — the global open/closed + pole-rotation
  driver described above. Renders nothing.
- `src/components/cursor-rig.tsx` — the two-layer cursor. One rAF, transforms
  written directly to the DOM, no React state per frame.
- `src/components/wordmark.tsx` — logo lockup + `BarberPoleMark`. The pole is
  built as a cylinder (stripes + shading gradient + chrome caps), not a flat
  pill. The two-line wordmark splits `salon.name` on its first space; pick a
  two-word name (or adjust the split) to keep the layout balanced.
- `src/components/hero.tsx` / `hero-video.tsx` — the pinned hero. The shell is
  185svh tall with a sticky 100svh pin; scroll-driven CSS scales the media to
  0.84 with a radius while the copy rises, blurs and fades, and the two title
  words parallax at different rates. `hero-video.tsx` picks the 9:16 or 16:9
  encode at mount so a phone never downloads the desktop master.
- `src/components/gallery.tsx` — three-photo strip. Carries `.section-stack`,
  which gives every post-hero section its overlapping rounded top edge.
- `src/components/price-list.tsx` — the menu. A service can carry
  `popular: true` or `bundleOf: [names]` (auto-computes a savings badge). Each
  row offers both a `tel:` link and a WhatsApp deep link prefilled with that
  service name.
- `src/components/busy-meter.tsx` — day picker + hourly bars. Height encodes
  magnitude and the bars stay deliberately grey; only "now" takes pole blue.
  Reads the clock through `useSyncExternalStore`, so there is no hydration
  mismatch and no setState-in-effect.
- `src/components/compare-slider.tsx` — drag-to-compare, used by the gallery's
  hair-length chooser. A real `input[type=range]` carries keyboard, touch and
  screen-reader behaviour; the visible handle is paint. Read the honesty note
  under **Media** before repurposing this as a before/after.
- `src/components/reviews.tsx` / `animated-rating.tsx` — count-up and star-fill
  driven by `salon.rating`.
- `src/components/hours.tsx` / `today-marker.tsx` — the opening-hours grid.
- `src/components/hygiene.tsx` — protocol copy + a 3-item trust strip.
- `src/components/before-after.tsx` — the Xbuilt pitch: a generic
  "standard template vs. this" comparison plus the grade compare slider. Keep
  the claims true for whatever you actually shipped.
- `src/components/contact.tsx` / `site-footer.tsx` — phone/email, WhatsApp,
  and the map, all built from `salon.street/postalCode/city`.
- `src/components/map-embed.tsx` — **click-to-load** map. The Google embed sets
  third-party cookies the moment it loads, so the page ships a CSS-drawn
  placeholder instead and only swaps in the iframe when someone asks. This is
  what keeps the "geen tracking, geen cookiebanner" receipt in
  `before-after.tsx` literally true: a fresh load makes **zero** third-party
  requests and sets **zero** cookies. Do not replace this with a bare iframe
  without also removing that claim — `pitch-mode` measures and displays the
  external-domain count, so the contradiction would show up on screen.
- `src/components/pitch-mode.tsx` — type `x` then `b` for an overlay of what
  the page actually measured on this load (LCP, TTFB, bytes, requests,
  third-party domains, cookies, DOM nodes). Every figure comes from the
  Performance API — nothing in it is a claim you cannot show on the spot.
- `src/components/call-bar.tsx` — sticky mobile call bar.

Motion is CSS-first: scroll-driven reveals and the hero choreography
(`animation-timeline: view()`), a scroll-progress bar
(`animation-timeline: scroll()`), hover glows, and a handful of small client
components only where real interactivity is needed. The hero's scroll-driven
rules sit behind `@supports (animation-timeline: view())` — without that guard
they would fall back to the document timeline and animate the hero away with no
scroll at all. Everything non-essential is gated under
`prefers-reduced-motion: no-preference`, and reduced motion also un-pins the
hero back to a normal static section.

## Forking for a client

1. Copy this folder (exclude `.git`, `node_modules`, `.next`).
2. Rewrite `src/lib/salon.ts` with the client's real facts. Keep the shape
   (same fields, same `hours` day order) so `open-status.ts` and every
   component that reads from it keeps working without further edits.
3. Replace the media (see below) with the client's own footage/photos, or with
   properly-licensed stock in their niche if none exists yet. Never use a real
   business's real photos without their permission.
4. Update `package.json`'s `name`. `src/app/layout.tsx`'s metadata is already
   derived from `salon`, so it should need no manual edits.
5. Re-check `before-after.tsx`'s "receipts" list against what you actually
   built, `reviews.tsx`'s disclaimer line, and the `busyness` disclaimer in
   `busy-meter.tsx` — all three must keep saying "example" until the data is
   the client's real, attributed data.
6. `git init`, commit, push. Confirm no client-identifying data leaked back
   into this repo.

## Media

The hero ships as four encodes plus two posters, all generated from one master:

| File | What |
| --- | --- |
| `hero-desktop.mp4` / `.webm` | 1920×1080, seamless 7s loop |
| `hero-mobile.mp4` / `.webm` | 720×1280 centre crop of the same grade |
| `hero-poster.jpg` / `-mobile.jpg` | first-paint frame per breakpoint |
| `style-short.jpg` / `style-long.jpg` | the length chooser's two portraits |

`gallery-*.jpg`: three properly-licensed stock photos (storefront, interior,
stylist portrait).

`style-short.jpg` / `style-long.jpg` are Pexels photos (Pexels License:
commercial use, no attribution required, modification allowed), cropped to a
matching 4:5 frame with the faces aligned and put through a gentler version of
the hero grade so they sit in the same tonal world as the rest of the page.

**They are two different models, and the UI says so.** Free stock libraries do
not carry genuine same-person before/after haircut pairs — the "before and
after haircut" tags on Pexels and Unsplash are keyword matches on unrelated
photos. Dropping two strangers into a wipe slider labelled *voor* and *na*
would depict a transformation that never happened, which is both a false claim
in a client pitch and a breach of the Pexels License clause against implying
endorsement by the people shown. So the component is framed as a *length
comparison* ("Kort" / "Langer") with a caption stating it is not a single
client's before-and-after. If a client supplies real, consented before/after
photos of the same person, swap the two files and relabel — the component
itself is agnostic.

The ungraded 720p master lives in **`media-src/hero-loop-master.mp4`**, outside
`public/` on purpose — nothing references it at runtime, so serving it would
ship 2.1MB to every visitor for nothing. Keep new masters there too.

Two loading rules matter and are easy to undo by accident:

- The posters are **preloaded per breakpoint** in `layout.tsx`. They are CSS
  backgrounds, so without that the browser only discovers them after the
  stylesheet parses, and LCP suffers.
- `hero-video.tsx` attaches its `<source>` elements only after `load` fires and
  the main thread goes idle. The loop is decoration and must not compete with
  the poster for bandwidth during LCP.

To re-grade new footage, the chain that produced the current look (via the
bundled `ffmpeg-static` binary) is: denoise → lanczos upscale to 1080p →
light unsharp → `selectivecolor` to pull saturated yellows toward neutral →
a curve that crushes shadows toward ink → desaturate to ~0.70 → `colorbalance`
cooling the shadows toward pole blue. The seamless loop is made by crossfading
the final 0.6s back over the first 0.6s and cutting the output at that point,
so the wrap is continuous.

The yellow-pull step matters more than it sounds: barber capes and salon
lighting are overwhelmingly warm, and an un-neutralised cape is usually the
most saturated object on the page, fighting whatever brand colour you picked.
