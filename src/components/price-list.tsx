import { formatEuroPrice, parseEuroPrice, salon } from "@/lib/salon";

function bundleSavings(bundleOf: readonly string[] | undefined, price: string) {
  if (!bundleOf) return null;
  const separate = bundleOf.reduce((sum, name) => {
    const match = salon.services.find((service) => service.name === name);
    return sum + (match ? parseEuroPrice(match.price) : 0);
  }, 0);
  const savings = separate - parseEuroPrice(price);
  return savings > 0 ? formatEuroPrice(savings) : null;
}

export function PriceList() {
  return (
    <section id="diensten" className="scroll-mt-20 bg-paper">
      <div className="px-6 py-14 sm:px-10 sm:py-20 lg:px-20 lg:py-24">
        <div className="reveal flex flex-wrap items-end justify-between gap-6 border-b border-ink pb-5">
          <div>
            <p className="font-display text-xs font-bold tracking-[0.22em] text-stripe uppercase">
              Barbiersmenu
            </p>
            <h2 className="mt-2.5 font-display text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[0.95] font-bold tracking-[-0.04em]">
              Zes diensten,
              <br />
              één vakman.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink/70">
            Alle prijzen zijn vaste prijzen. Bellen mag, binnenlopen mag ook.
          </p>
        </div>

        <ol className="mt-2">
          {salon.services.map((service, index) => (
            <li
              key={service.name}
              className={`menu-row row-glow reveal reveal-d${index + 1} border-b border-ink/12 last:border-b-0`}
            >
              <a
                href={`tel:${salon.phoneTel}`}
                className="group grid grid-cols-[1.8rem_1fr_auto] items-baseline gap-x-3 px-2 py-4 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-x-5 sm:py-5"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-xs font-bold tracking-[0.1em] text-ink/35 tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="menu-name font-display text-[clamp(1.2rem,3.4vw,2rem)] leading-[1.05] font-bold tracking-[-0.03em] text-ink">
                      {service.name}
                    </span>
                    {service.popular ? (
                      <span className="inline-flex items-center bg-stripe/10 px-2 py-0.5 font-sans text-[0.65rem] font-bold tracking-[0.08em] text-stripe uppercase">
                        Meest gekozen
                      </span>
                    ) : null}
                    {(() => {
                      const savings = bundleSavings(service.bundleOf, service.price);
                      return savings ? (
                        <span className="inline-flex items-center bg-pole/10 px-2 py-0.5 font-sans text-[0.65rem] font-bold tracking-[0.08em] text-pole uppercase">
                          Bespaar {savings}
                        </span>
                      ) : null;
                    })()}
                  </span>
                  <span className="mt-1 block font-sans text-xs font-medium tracking-wide text-pole opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    Bel om te reserveren
                  </span>
                </span>
                <span className="row-glow-price text-right font-display text-[clamp(1.1rem,2.6vw,1.7rem)] leading-none font-bold tracking-[-0.02em] text-stripe tabular-nums">
                  {service.price}
                </span>
              </a>
            </li>
          ))}
        </ol>

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={`tel:${salon.phoneTel}`}
            className="inline-flex min-h-11 items-center bg-ink px-5 font-display text-sm font-bold tracking-tight text-paper transition-colors hover:bg-pole"
          >
            Bel {salon.phoneDisplay}
          </a>
          <p className="text-sm text-ink/70">{salon.walkIn}</p>
        </div>
      </div>
    </section>
  );
}
