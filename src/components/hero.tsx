import { HeroVideo } from "@/components/hero-video";
import { OpenStatus } from "@/components/open-status";
import { salon } from "@/lib/salon";

export function Hero() {
  const [firstWord, ...rest] = salon.name.split(" ");
  const secondWord = rest.join(" ") || firstWord;
  const sunday = salon.hours.find((slot) => slot.sunday);

  return (
    <section className="hero-shell bg-ink text-paper">
      <div className="hero-pin flex flex-col justify-end">
        <HeroVideo />

        <div className="hero-copy relative z-20 px-6 pt-28 pb-24 sm:px-10 sm:pb-16 lg:px-20 lg:pb-20">
          <p className="enter flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-sm font-medium text-paper/75">
            <span className="font-display font-semibold tracking-[0.2em] text-paper uppercase">
              Barbier · {salon.city}
            </span>
            <span aria-hidden="true" className="text-paper/40">
              ·
            </span>
            <span>{salon.street}</span>
          </p>

          <h1 className="enter enter-d1 mt-5 font-display text-[clamp(2.9rem,11.5vw,8.5rem)] leading-[0.84] font-bold tracking-[-0.05em]">
            <span className="hero-word-a block">{firstWord}</span>
            <span className="hero-word-b flex flex-wrap items-baseline gap-x-[0.3em]">
              {secondWord}
              <span className="hidden translate-y-[-0.4em] items-center font-sans text-[0.11em] font-semibold tracking-[0.18em] text-paper/70 uppercase sm:inline-flex">
                eigenaar &amp; enige kapper
              </span>
            </span>
          </h1>

          <p className="enter enter-d2 mt-7 max-w-lg text-base leading-relaxed text-paper/85 sm:text-lg">
            {salon.craft}
          </p>

          <div className="enter enter-d3 mt-9 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${salon.phoneTel}`}
              data-cursor="link"
              className="inline-flex min-h-13 items-center gap-2 bg-paper px-6 font-display text-base font-bold tracking-tight text-ink shadow-e2 transition-colors hover:bg-stripe hover:text-paper motion-safe:transition-[transform,background-color,color] motion-safe:hover:-translate-y-0.5"
            >
              Bel {salon.phoneDisplay}
            </a>
            <a
              href="#diensten"
              data-cursor="link"
              className="inline-flex min-h-13 items-center border border-paper/35 px-6 font-display text-base font-semibold tracking-tight text-paper backdrop-blur-sm transition-colors hover:border-paper hover:bg-paper/10 motion-safe:transition-[transform,border-color,background-color] motion-safe:hover:-translate-y-0.5"
            >
              Prijzen bekijken
            </a>
          </div>

          <dl className="enter enter-d4 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-paper/15 pt-6 text-sm">
            <div className="flex items-baseline gap-2">
              <dt className="sr-only">Beoordeling</dt>
              <dd className="font-serif text-2xl leading-none font-semibold text-paper">
                {salon.rating.score}
                <span className="text-paper/50">/5</span>
              </dd>
              <dd className="text-paper/70">
                {salon.rating.count} {salon.rating.source}-reviews
              </dd>
            </div>
            {sunday ? (
              <div className="flex items-center gap-2">
                <dt className="sr-only">Zondag</dt>
                <dd className="bg-stripe px-2.5 py-1 font-display text-xs font-bold tracking-[0.12em] text-paper uppercase">
                  Zondag open
                </dd>
                <dd className="text-paper/70 tabular-nums">{sunday.time}</dd>
              </div>
            ) : null}
            <div>
              <dt className="sr-only">Afspraak</dt>
              <dd className="text-paper/70">Binnenlopen kan ook</dd>
            </div>
            <div>
              <dt className="sr-only">Status</dt>
              <dd className="text-paper/70">
                <OpenStatus />
              </dd>
            </div>
          </dl>
        </div>

        <div
          className="hero-cue pointer-events-none absolute right-6 bottom-10 z-20 hidden flex-col items-center gap-3 lg:right-20 lg:flex"
          aria-hidden="true"
        >
          <span className="font-display text-[0.6rem] font-bold tracking-[0.3em] text-paper/55 uppercase [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="hero-cue-line" />
        </div>
      </div>
    </section>
  );
}
