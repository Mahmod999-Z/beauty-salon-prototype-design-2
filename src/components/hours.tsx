import { TodayMarker } from "@/components/today-marker";
import { salon } from "@/lib/salon";

export function Hours() {
  const weekdays = salon.hours.filter((slot) => !slot.sunday);
  const sunday = salon.hours.find((slot) => slot.sunday);

  return (
    <section id="openingstijden" className="scroll-mt-20 bg-paper">
      <div className="grid gap-10 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:px-20 lg:py-32">
        <div className="reveal">
          <p className="font-display text-xs font-bold tracking-[0.22em] text-stripe uppercase">
            Openingstijden
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,6.5vw,4.75rem)] leading-[0.9] font-bold tracking-[-0.045em]">
            Ook op zondag.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-ink/75">
            Zes dagen per week open, inclusief zondagmiddag. In {salon.city} is
            dat zeldzaam.
          </p>
        </div>
        <div>
          {sunday ? (
            <div className="glow-pulse reveal bg-stripe px-5 py-6 text-paper sm:px-7 sm:py-8">
              <p className="font-display text-xs font-bold tracking-[0.2em] uppercase">
                Zondag open
              </p>
              <p className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-display text-[clamp(2rem,5.5vw,3.5rem)] leading-none font-bold tracking-[-0.045em]">
                <span>
                  {sunday.day}
                  <TodayMarker day={sunday.day} />
                </span>
                <span className="font-serif font-semibold tabular-nums">
                  {sunday.time}
                </span>
              </p>
            </div>
          ) : null}
          <ul className="mt-8 border-t border-ink/15">
            {weekdays.map((slot, index) => (
              <li
                key={slot.day}
                className={`row-glow reveal reveal-d${index + 1} flex items-baseline justify-between gap-6 border-b border-ink/12 px-2 py-3.5 font-display text-lg tracking-tight sm:text-xl ${
                  slot.closed ? "text-ink/40" : "text-ink"
                }`}
              >
                <span>
                  {slot.day}
                  <TodayMarker day={slot.day} />
                </span>
                {/* The serif is a figures-only subset — words stay in the UI face. */}
                <span
                  className={`row-glow-price tabular-nums ${
                    slot.closed ? "text-base" : "font-serif font-semibold"
                  }`}
                >
                  {slot.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
