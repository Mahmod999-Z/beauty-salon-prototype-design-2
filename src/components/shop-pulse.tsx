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
 *  - `--pole-phase`, one shared value every barber pole reads, advanced in a
 *    single rAF loop and nudged by scroll velocity.
 */
export function ShopPulse() {
  useEffect(() => {
    const root = document.documentElement;

    const applyStatus = () => {
      root.dataset.shop = getOpenStatus().open ? "open" : "closed";
    };
    applyStatus();
    const statusTimer = setInterval(applyStatus, 60_000);

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => clearInterval(statusTimer);
    }

    let phase = 0;
    let boost = 0;
    let lastY = window.scrollY;
    let last = performance.now();
    let frame = 0;

    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.min(boost + Math.abs(y - lastY) * SCROLL_GAIN, MAX_BOOST);
      lastY = y;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      boost = Math.max(0, boost - boost * BOOST_DECAY * dt);
      const speed = root.dataset.shop === "open" ? IDLE_SPEED + boost : boost;
      phase = (phase + speed * dt) % PERIOD;
      root.style.setProperty("--pole-phase", `${-phase}px`);

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
      } else {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(statusTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
