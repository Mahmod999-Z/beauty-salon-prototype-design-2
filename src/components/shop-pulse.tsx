"use client";

import { useEffect } from "react";
import { getOpenStatus } from "@/lib/open-status";

/** Vertical travel that advances the 45° stripe pattern by exactly one period. */
const PERIOD = 39.6;
const IDLE_SPEED = 26;
const SCROLL_GAIN = 2.6;
const BOOST_DECAY = 2.8;
const MAX_BOOST = 190;

/**
 * Drives two global signals:
 *  - `data-shop` on <html>, so any component can style against open/closed.
 *  - the barber poles' stripe phase, advanced in a single rAF loop and nudged
 *    by scroll velocity.
 *
 * The phase is written straight to the pole elements rather than to a custom
 * property on <html>: a `:root` custom property changing every frame
 * invalidates style for the entire document, which showed up as scroll jank.
 */
export function ShopPulse() {
  useEffect(() => {
    const root = document.documentElement;

    const applyStatus = () => {
      root.dataset.shop = getOpenStatus().open ? "open" : "closed";
      wake();
    };

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.dataset.shop = getOpenStatus().open ? "open" : "closed";
      const reducedTimer = setInterval(() => {
        root.dataset.shop = getOpenStatus().open ? "open" : "closed";
      }, 60_000);
      return () => clearInterval(reducedTimer);
    }

    let poles: HTMLElement[] = [];
    let phase = 0;
    let boost = 0;
    let lastY = window.scrollY;
    let last = performance.now();
    let frame = 0;
    let running = false;

    function wake() {
      if (running || document.hidden) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }

    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.min(boost + Math.abs(y - lastY) * SCROLL_GAIN, MAX_BOOST);
      lastY = y;
      wake();
    };

    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (poles.length === 0) {
        poles = Array.from(
          document.querySelectorAll<HTMLElement>(".pole-stripes"),
        );
      }

      boost = Math.max(0, boost - boost * BOOST_DECAY * dt);
      const open = root.dataset.shop === "open";
      const speed = open ? IDLE_SPEED + boost : boost;
      phase = (phase + speed * dt) % PERIOD;

      for (const pole of poles) {
        pole.style.setProperty("--pole-phase", `${-phase}px`);
      }

      // A closed shop's pole is still; once the scroll nudge has decayed there
      // is nothing left to draw, so stop burning frames until something moves.
      if (!open && boost < 0.5) {
        running = false;
        return;
      }

      frame = requestAnimationFrame(tick);
    }

    applyStatus();
    const statusTimer = setInterval(applyStatus, 60_000);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        running = false;
      } else {
        wake();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(statusTimer);
      cancelAnimationFrame(frame);
      running = false;
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
