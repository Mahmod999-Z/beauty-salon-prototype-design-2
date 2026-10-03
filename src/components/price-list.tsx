import { BusyMeter } from "@/components/busy-meter";
import {
  formatEuroPrice,
  parseEuroPrice,
  salon,
  whatsappHref,
} from "@/lib/salon";

function bundleSavings(bundleOf: readonly string[] | undefined, price: string) {
  if (!bundleOf) return null;
  const separate = bundleOf.reduce((sum, name) => {
    const match = salon.services.find((service) => service.name === name);
    return sum + (match ? parseEuroPrice(match.price) : 0);
  }, 0);
  const savings = separate - parseEuroPrice(price);
  return savings > 0 ? formatEuroPrice(savings) : null;
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 shrink-0"
      fill="currentColor"
    >
      <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.27 4.9L2 22l5.25-1.27A9.94 9.94 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm5.8 14.2c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.13.09-1.83-.11-.42-.13-.96-.3-1.66-.6-2.92-1.26-4.83-4.2-4.98-4.4-.15-.2-1.2-1.6-1.2-3.05 0-1.46.76-2.17 1.03-2.47.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.52.24.6.83 2.06.9 2.21.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.15.48.13.66-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.94.29.15.48.22.55.34.07.13.07.72-.17 1.4Z" />
    </svg>
  );
}

export function PriceList() {
  return (
    <section id="diensten" className="scroll-mt-20 bg-porcelain">
      <div className="px-6 py-16 sm:px-10 sm:py-24 lg:px-20 lg:py-28">
        <div className="reveal flex flex-wrap items-end justify-between gap-6 pb-5">
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
        <hr className="metal-rule reveal" />

        <ol className="mt-2">
          {salon.services.map((service, index) => {
            const savings = bundleSavings(service.bundleOf, service.price);
            return (
              <li
                key={service.name}
                className={`menu-row row-glow reveal reveal-d${index + 1} border-b border-ink/10 last:border-b-0`}
              >
                <div className="grid grid-cols-[1.8rem_1fr_auto] items-baseline gap-x-3 px-2 py-4 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-x-5 sm:py-5">
                  <span
                    aria-hidden="true"
                    className="font-serif text-sm font-semibold text-steel tabular-nums"
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
                      {savings ? (
                        <span className="inline-flex items-center bg-pole/10 px-2 py-0.5 font-sans text-[0.65rem] font-bold tracking-[0.08em] text-pole uppercase">
                          Bespaar {savings}
                        </span>
                      ) : null}
                    </span>

                    <span className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <a
                        href={`tel:${salon.phoneTel}`}
                        data-cursor="link"
                        className="link-sweep font-sans text-xs font-semibold tracking-wide text-pole"
                      >
                        Bel om te reserveren
                      </a>
                      <a
                        href={whatsappHref(
                          `Hoi, ik wil graag "${service.name}" boeken bij ${salon.name}.`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="link"
                        className="link-sweep inline-flex items-center gap-1.5 font-sans text-xs font-semibold tracking-wide text-ink/55 hover:text-ink"
                      >
                        <WhatsAppIcon />
                        WhatsApp
                      </a>
                    </span>
                  </span>
                  <span
                    data-cursor="price"
                    className="row-glow-price text-right font-serif text-[clamp(1.25rem,2.8vw,1.9rem)] leading-none font-semibold text-stripe tabular-nums"
                  >
                    {service.price}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-12">
          <div className="reveal flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={`tel:${salon.phoneTel}`}
              data-cursor="link"
              className="inline-flex min-h-11 items-center bg-ink px-5 font-display text-sm font-bold tracking-tight text-paper shadow-e1 transition-colors hover:bg-pole"
            >
              Bel {salon.phoneDisplay}
            </a>
            <p className="max-w-sm text-sm text-ink/70">{salon.walkIn}</p>
          </div>
          <div className="reveal reveal-d2">
            <BusyMeter />
          </div>
        </div>
      </div>
    </section>
  );
}
