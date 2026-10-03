"use client";

import { useState } from "react";
import { salon } from "@/lib/salon";

const mapsQuery = encodeURIComponent(
  `${salon.street} ${salon.postalCode} ${salon.city}`,
);

/**
 * Click-to-load map. The embed is a Google iframe, which sets third-party
 * cookies the moment it loads — so the page does not load it until someone
 * asks for it. That is what keeps the "geen tracking, geen cookiebanner"
 * claim in `before-after.tsx` literally true on first paint.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={`Kaart naar ${salon.name}`}
        src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
        className="map-dark h-full w-full"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="map-facade relative grid h-full w-full place-items-center bg-ink text-center">
      <div className="relative z-10 px-6">
        <span
          aria-hidden="true"
          className="mx-auto block h-7 w-7 rounded-full border-2 border-stripe bg-stripe/20"
        />
        <p className="mt-4 font-display text-base font-bold tracking-tight text-paper">
          {salon.street}
        </p>
        <p className="font-sans text-sm text-paper/60">
          {salon.postalCode} {salon.city}
        </p>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          data-cursor="link"
          className="mt-5 inline-flex min-h-10 items-center bg-paper px-4 font-display text-sm font-bold tracking-tight text-ink transition-colors hover:bg-stripe hover:text-paper"
        >
          Kaart laden
        </button>
        <p className="mx-auto mt-3 max-w-62 font-sans text-[0.68rem] leading-relaxed text-paper/45">
          De kaart komt van Google en plaatst pas cookies zodra je hem laadt.
          Daarom laden we hem niet vanzelf.
        </p>
      </div>
    </div>
  );
}
