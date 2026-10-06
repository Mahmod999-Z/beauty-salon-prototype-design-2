const before = [
  "Kleine, gecentreerde hero-tekst",
  "Prijzen verstopt achter een klik",
  "Trage, algemene sjabloonopmaak",
  "Niet ontworpen voor mobiel eerst",
];

const after = [
  "Volledig beeldvullende hero met video",
  "Prijzen direct zichtbaar, geen omwegen",
  "Statisch gegenereerd en razendsnel",
  "Mobiel-eerst, met duidelijke call-to-actions",
];

const receipts = [
  "Statisch gegenereerd",
  "Geen tracking, geen cookiebanner",
  "Kleurcontrast getoetst op AA/AAA",
  "Bouwtijd: dagen, niet maanden",
];

function CrossIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-ink/30">
      <path
        fill="currentColor"
        d="m10 8.59 4.24-4.25 1.41 1.41L11.41 10l4.24 4.24-1.41 1.41L10 11.41l-4.24 4.24-1.41-1.41L8.59 10 4.35 5.76l1.41-1.41z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-pole">
      <path fill="currentColor" d="M8.2 13.6 4.6 10l-1.4 1.4 5 5 9-9-1.4-1.4z" />
    </svg>
  );
}

export function BeforeAfter() {
  return (
    <section className="bg-paper">
      <div className="px-6 py-20 sm:px-10 sm:py-28 lg:px-20 lg:py-32">
        <div className="reveal max-w-2xl">
          <p className="font-display text-xs font-bold tracking-[0.22em] text-stripe uppercase">
            Xbuilt Studio
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,5.5vw,4.25rem)] leading-[0.95] font-bold tracking-[-0.04em]">
            Het verschil met een standaard sjabloon.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-6">
          <div className="reveal reveal-d1 border border-ink/12 p-6 sm:p-8">
            <p className="font-display text-xs font-bold tracking-[0.18em] text-ink/40 uppercase">
              Standaard sjabloon
            </p>
            <ul className="mt-5 space-y-3">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink/60">
                  <CrossIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal reveal-d2 border border-ink bg-ink p-6 text-paper sm:p-8">
            <p className="font-display text-xs font-bold tracking-[0.18em] text-stripe uppercase">
              Dit concept
            </p>
            <ul className="mt-5 space-y-3">
              {after.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-paper/85">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="reveal reveal-d3 mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {receipts.map((item) => (
            <li
              key={item}
              className="font-display text-xs font-semibold tracking-[0.04em] text-ink/50"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
