import type { CSSProperties } from "react";
import { AnimatedRating } from "@/components/animated-rating";
import { salon } from "@/lib/salon";

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-ink text-paper">
      <div className="grain grain-ink ambient relative overflow-hidden px-6 py-20 sm:px-10 sm:py-28 lg:px-20 lg:py-32">
        <div className="relative z-10">
          <p className="reveal font-display text-xs font-bold tracking-[0.22em] text-paper/60 uppercase">
            Wat klanten zeggen
          </p>
          <div className="reveal mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <AnimatedRating value={Number(salon.rating.scoreValue)} />
            <div>
              <span
                className="star-fill"
                style={
                  {
                    "--fill": `${(Number(salon.rating.scoreValue) / 5) * 100}%`,
                  } as CSSProperties
                }
                aria-hidden="true"
              >
                <span className="stars-base">★★★★★</span>
                <span className="stars-top">★★★★★</span>
              </span>
              <p className="mt-1 font-display text-lg font-semibold tracking-tight text-paper/80">
                van 5 · {salon.rating.count} {salon.rating.source}-reviews
              </p>
            </div>
          </div>

          <ul className="mt-14 grid gap-px sm:grid-cols-3 sm:bg-paper/15">
            {salon.reviews.map((review, index) => (
              <li
                key={review.quote}
                className={`card-lift reveal reveal-d${index + 1} border-t border-paper/20 bg-ink pt-6 sm:border-t-0 sm:px-6 sm:pt-0 sm:first:pl-0`}
              >
                <blockquote className="font-display text-lg leading-snug font-medium tracking-tight text-paper sm:text-xl">
                  “{review.quote}”
                </blockquote>
                <p className="mt-4 font-sans text-sm text-paper/60">
                  {review.author}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-12 max-w-xl text-sm leading-relaxed text-paper/55">
            Voorbeeldcijfer en -reviews ter illustratie. In de live versie
            halen we je eigen Google-reviews automatisch op, zodat het cijfer
            altijd actueel is.
          </p>
        </div>
      </div>
    </section>
  );
}
