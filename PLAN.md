# Beauty salon prototype design — reuse guide

An Xbuilt Studio pitch-template system for hair salons and barbershops. Every
name, address, price, review, and photo in this repo is fictional/placeholder
content, kept only to demonstrate the design system. Fork this to pitch a
real, named client — see "Forking for a client" below.

## What this is

A single-route (`/`) Next.js site: a dark, video-led hero, a signature price
menu, a reviews band with a live count-up rating, a photo gallery, opening
hours with a live open/closed indicator, a hygiene/trust strip, a
before/after comparison against a generic "standard template," and a
contact section with a map, click-to-copy details, and a WhatsApp link.

## Design tokens

In `src/app/globals.css`, via Tailwind v4 `@theme`.

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#0F0F10` | Text, dark sections, the pole mark |
| Paper | `#FFFFFF` | Page ground |
| Pole blue | `#2030A0` | Links, focus rings, accents |
| Pole red (stripe) | `#D01020` | Prices, the Sunday badge, emphasis |

Swap these three hex values to re-brand the whole system — everything else
(menus, badges, hover glows, the barber-pole mark) derives from them via
`color-mix()` and Tailwind's `@theme inline`, so a new palette propagates
automatically. Contrast rules worth keeping when you do: pole blue is never
used as small text on ink (fails AA at that size); pole red on ink is only
used as large/bold display type for the same reason.

Type: Space Grotesk (display/wordmark) + Inter (body/UI), loaded with
`next/font`. Display scale uses `clamp()`.

## Component architecture

Server components except where interactivity requires a client boundary:

- `src/lib/salon.ts` — **the only place with business facts.** Name,
  address, phone, email, owner blurb, services/prices, hours, rating, and
  reviews. Also the euro-formatting helpers and the `HairSalon` JSON-LD.
- `src/lib/open-status.ts` — pure functions that compute "open now / opens
  at / closed" from `salon.hours` and the current time. Everything that
  shows live status (`open-status.tsx`, `today-marker.tsx`) reads through
  this, so changing the hours shape in one place keeps it all correct.
- `src/components/wordmark.tsx` — logo lockup + the small animated
  `BarberPoleMark`. The two-line wordmark splits `salon.name` on its first
  space automatically; pick a two-word name (or adjust the split) to keep
  the layout balanced.
- `src/components/hero.tsx` / `hero-video.tsx` — the video hero. Title,
  eyebrow city, and street all read from `salon`. The Ken Burns zoom and
  cursor spotlight are CSS/JS in `hero-video.tsx`.
- `src/components/gallery.tsx` — three-photo strip (storefront, interior,
  portrait). Swap the files in `public/media/gallery-*.jpg`.
- `src/components/price-list.tsx` — the menu. A service can carry
  `popular: true` (shows a "Meest gekozen" tag) or `bundleOf: [names]`
  (auto-computes and shows a savings badge vs. buying those separately).
- `src/components/reviews.tsx` / `animated-rating.tsx` — the rating
  count-up and star-fill are driven entirely by `salon.rating`.
- `src/components/hours.tsx` / `today-marker.tsx` — the opening-hours grid;
  `TodayMarker` renders a live dot next to whichever row is today.
- `src/components/hygiene.tsx` — protocol copy + a 3-item trust strip.
- `src/components/before-after.tsx` — generic "standard template vs. this"
  comparison. Keep the claims true for whatever you actually shipped — the
  "receipts" row (static generation, no tracking, contrast-checked, build
  time) should describe the real build, not be copied blind.
- `src/components/contact.tsx` / `site-footer.tsx` — phone/email
  (click-to-copy via `copy-value.tsx`, magnetic hover via
  `magnetic-link.tsx`), a WhatsApp deep link, and an embedded map — all
  built from `salon.street/postalCode/city` at render time, so nothing here
  needs manual edits once `salon.ts` is correct.
- `src/components/call-bar.tsx` — sticky mobile call bar.

Motion is CSS-first: scroll-driven reveals (`animation-timeline: view()`),
a scroll-progress bar (`animation-timeline: scroll()`), hover glows, and a
handful of small client components only where real interactivity is needed
(scroll-spy nav, count-up, magnetic hover, live open/closed). Everything
non-essential is gated under `prefers-reduced-motion: no-preference`.

## Forking for a client

1. Copy this folder (exclude `.git`, `node_modules`, `.next`).
2. Rewrite `src/lib/salon.ts` with the client's real facts. Keep the shape
   (same fields, same `hours` day order) so `open-status.ts` and every
   component that reads from it keeps working without further edits.
3. Replace `public/media/hero-loop.mp4` + `hero-poster.jpg` and the three
   `public/media/gallery-*.jpg` files with the client's own footage/photos,
   or with properly-licensed stock in their niche if none exists yet.
   Never use a real business's real photos without their permission.
4. Update `package.json`'s `name`, and `src/app/layout.tsx`'s metadata
   (already derived from `salon`, so this should need no manual edits).
5. Re-check `before-after.tsx`'s "receipts" list against what you actually
   built, and `reviews.tsx`'s disclaimer line — it must say "example
   reviews" until the reviews are the client's real, attributed ones.
6. `git init`, commit, push. Confirm no client-identifying data leaked back
   into this repo (`git diff` against this file's own reuse-guide state is
   a fast sanity check).

## Media

`hero-loop.mp4` / `hero-poster.jpg`: graded-dark stock footage (properly
licensed, no faces, no third-party shop signage — see the component's own
history for sourcing). `gallery-*.jpg`: three properly-licensed stock
photos (storefront, interior, stylist portrait), graded to match.
