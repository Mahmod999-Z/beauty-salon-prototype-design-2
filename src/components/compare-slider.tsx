"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

export function CompareSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  alt,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div
      className="compare aspect-16/9 w-full bg-ink"
      style={{ "--pos": `${pos}%` } as CSSProperties}
      data-cursor="media"
    >
      <Image
        src={before}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover"
      />
      <div className="compare-after">
        <Image
          src={after}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>

      <span className="absolute top-3 left-3 z-10 bg-ink/70 px-2.5 py-1 font-display text-[0.6rem] font-bold tracking-[0.18em] text-paper/80 uppercase backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 z-10 bg-paper/90 px-2.5 py-1 font-display text-[0.6rem] font-bold tracking-[0.18em] text-ink uppercase">
        {afterLabel}
      </span>

      <div className="compare-handle z-10" aria-hidden="true">
        <span className="compare-grip">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M9.5 6 4 12l5.5 6 1.4-1.4L6.8 12l4.1-4.6zm5 0-1.4 1.4 4.1 4.6-4.1 4.6 1.4 1.4 5.5-6z" />
          </svg>
        </span>
      </div>

      {/* A real range input carries the keyboard, touch and screen-reader
          behaviour; the visible handle above is only paint. */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(event) => setPos(Number(event.target.value))}
        aria-label={`${alt}: schuif tussen ${beforeLabel} en ${afterLabel}`}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
      />
    </div>
  );
}
