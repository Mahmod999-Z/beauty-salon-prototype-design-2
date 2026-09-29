import { BarberPoleMark } from "@/components/wordmark";
import { salon } from "@/lib/salon";

const trust = [
  "Vaste prijzen, geen verrassingen",
  "Binnenlopen kan, een afspraak is niet nodig",
  "Vast hygiëneprotocol per klant",
];

export function Hygiene() {
  return (
    <section id="hygiene" className="scroll-mt-20 bg-paper">
      <div className="px-6 sm:px-10 lg:px-20">
        <div className="reveal flex gap-5 border-t border-ink/15 py-10 sm:gap-7 sm:py-12">
          <BarberPoleMark className="h-24 w-2 shrink-0 sm:h-28" />
          <div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] leading-tight font-bold tracking-[-0.03em]">
              Ons hygiëneprotocol
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg">
              {salon.hygiene}
            </p>
          </div>
        </div>
        <ul className="reveal grid gap-x-8 gap-y-4 border-b border-ink/15 pb-10 sm:grid-cols-3 sm:pb-12">
          {trust.map((item, index) => (
            <li
              key={item}
              className={`reveal reveal-d${index + 1} flex items-start gap-3 text-sm text-ink/75`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="mt-0.5 h-4 w-4 shrink-0 text-pole"
              >
                <path
                  fill="currentColor"
                  d="M8.2 13.6 4.6 10l-1.4 1.4 5 5 9-9-1.4-1.4z"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
