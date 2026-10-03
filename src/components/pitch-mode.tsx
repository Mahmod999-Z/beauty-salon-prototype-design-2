"use client";

import { useCallback, useEffect, useState } from "react";

type Metrics = {
  lcp: number | null;
  ttfb: number | null;
  domReady: number | null;
  transferredKb: number;
  requests: number;
  thirdParty: number;
  cookieNames: string[];
  nodes: number;
};

const SEQUENCE = ["x", "b"];

function readMetrics(lcp: number | null): Metrics {
  const nav = performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming | undefined;
  const resources = performance.getEntriesByType(
    "resource",
  ) as PerformanceResourceTiming[];

  const transferred =
    (nav?.transferSize ?? 0) +
    resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0);

  const thirdParty = resources.filter(
    (entry) => new URL(entry.name, location.href).origin !== location.origin,
  ).length;

  return {
    lcp,
    ttfb: nav ? Math.round(nav.responseStart) : null,
    domReady: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
    transferredKb: Math.round(transferred / 1024),
    requests: resources.length + 1,
    thirdParty,
    cookieNames: document.cookie
      ? document.cookie.split(";").map((pair) => pair.split("=")[0].trim())
      : [],
    nodes: document.getElementsByTagName("*").length,
  };
}

/**
 * Xbuilt pitch overlay: type "x" then "b" to show what this page actually
 * measured on this load. Every number is read from the Performance API —
 * nothing here is a claim we cannot show on the spot.
 */
export function PitchMode() {
  const [open, setOpen] = useState(false);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [lcp, setLcp] = useState<number | null>(null);

  useEffect(() => {
    if (!("PerformanceObserver" in window)) return;
    const observer = new PerformanceObserver((list) => {
      const last = list.getEntries().at(-1);
      if (last) setLcp(Math.round(last.startTime));
    });
    try {
      observer.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      return;
    }
    return () => observer.disconnect();
  }, []);

  const toggle = useCallback(() => {
    setOpen((wasOpen) => {
      if (!wasOpen) setMetrics(readMetrics(lcp));
      return !wasOpen;
    });
  }, [lcp]);

  useEffect(() => {
    let position = 0;

    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key.toLowerCase() === SEQUENCE[position]) {
        position += 1;
        if (position === SEQUENCE.length) {
          position = 0;
          toggle();
        }
      } else {
        position = event.key.toLowerCase() === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  if (!open || !metrics) return null;

  const rows: Array<[string, string]> = [
    ["Largest contentful paint", metrics.lcp === null ? "—" : `${metrics.lcp} ms`],
    ["Time to first byte", metrics.ttfb === null ? "—" : `${metrics.ttfb} ms`],
    ["DOM gereed", metrics.domReady === null ? "—" : `${metrics.domReady} ms`],
    ["Overgedragen", `${metrics.transferredKb} KB`],
    ["Verzoeken", String(metrics.requests)],
    ["Externe domeinen", String(metrics.thirdParty)],
    ["Cookies", String(metrics.cookieNames.length)],
    ["DOM-nodes", String(metrics.nodes)],
  ];

  return (
    <div
      role="dialog"
      aria-label="Bouwcijfers"
      className="fixed bottom-5 left-5 z-[70] w-[min(21rem,calc(100vw-2.5rem))] border border-paper/15 bg-charcoal/95 p-5 text-paper shadow-e3 backdrop-blur-xl"
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-display text-[0.65rem] font-bold tracking-[0.24em] text-stripe uppercase">
          Xbuilt · live gemeten
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          data-cursor="link"
          className="font-sans text-xs text-paper/50 transition-colors hover:text-paper"
        >
          Sluiten
        </button>
      </div>

      <dl className="mt-4 space-y-2">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-4 border-b border-paper/10 pb-2 last:border-b-0"
          >
            <dt className="font-sans text-xs text-paper/60">{label}</dt>
            <dd className="font-serif text-base font-semibold tabular-nums">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {metrics.cookieNames.length > 0 ? (
        <p className="mt-4 font-sans text-[0.68rem] leading-relaxed text-stripe">
          Gevonden: {metrics.cookieNames.join(", ")}. Deze site zet er zelf
          geen — op localhost delen alle poorten één cookiejar, dus dit komt
          van een ander project. Wis je cookies voor een demo.
        </p>
      ) : null}

      <p className="mt-4 font-sans text-[0.68rem] leading-relaxed text-paper/45">
        Gemeten in deze browser, op deze pagina, zojuist. In ontwikkelmodus
        liggen de cijfers hoger dan in productie.
      </p>
    </div>
  );
}
