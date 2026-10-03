# Bundled font

`bodoni-moda-figures.woff2` is a glyph subset of **Bodoni Moda** (weight 600),
licensed under the **SIL Open Font License 1.1**, which permits bundling and
redistribution. Upstream: https://fonts.google.com/specimen/Bodoni+Moda

It contains **figures and a handful of symbols only** — digits, space, comma,
period, slash, colon, en/em dash, the euro sign, and the letters `B K N m n o
s u`. That is 6.5KB instead of the 47KB full latin subset, because the serif is
only ever used for prices, times, ratings and measured numbers.

**Consequence:** only apply `font-serif` to numeric content. Any other
character falls through to the `ui-serif, Georgia, serif` fallback and will
look visibly different. `hours.tsx` already guards this — the word "gesloten"
stays in the UI face while the times use the serif.

To regenerate (or widen) the subset, ask Google Fonts for exactly the glyphs
you need and save the file it points at:

```bash
curl -s -A "Mozilla/5.0" --get \
  --data-urlencode "family=Bodoni Moda:opsz,wght@6..96,600" \
  --data-urlencode "text=0123456789,./:–—€ msKBNnuo" \
  "https://fonts.googleapis.com/css2"
```

The response is a `@font-face` block whose `src` URL is the subsetted woff2.
