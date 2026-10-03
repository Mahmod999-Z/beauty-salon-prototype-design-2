"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Narrow screens get the 9:16 crop, so a phone never downloads the 16:9
    // master. A hidden or not-yet-laid-out tab reports 0 — treat that as
    // desktop rather than locking the page to the phone crop.
    const width = window.innerWidth;
    const base =
      width > 0 && width <= 640 ? "/media/hero-mobile" : "/media/hero-desktop";

    const start = () => {
      video.play().catch(() => {
        // Some browsers still require a gesture; the poster carries the frame.
      });
    };

    // The loop is decoration — it must not compete with the poster for
    // bandwidth during LCP. Attach the sources once the page is loaded and
    // the main thread is idle; until then the poster carries the hero.
    const attach = () => {
      video.replaceChildren();
      for (const [src, type] of [
        [`${base}.webm`, "video/webm"],
        [`${base}.mp4`, "video/mp4"],
      ]) {
        const source = document.createElement("source");
        source.src = src;
        source.type = type;
        video.append(source);
      }
      video.load();
      video.addEventListener("canplay", start);
      start();
    };

    const hasIdle = typeof window.requestIdleCallback === "function";
    let idle = 0;
    const schedule = () => {
      idle = hasIdle
        ? requestIdleCallback(attach, { timeout: 2500 })
        : window.setTimeout(attach, 300);
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    document.addEventListener("pointerdown", start, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (hasIdle) cancelIdleCallback(idle);
      else clearTimeout(idle);
      video.removeEventListener("canplay", start);
      document.removeEventListener("pointerdown", start);
    };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      wrap.style.setProperty("--mx", `${x}%`);
      wrap.style.setProperty("--my", `${y}%`);
    };

    wrap.addEventListener("pointermove", onMove);
    return () => wrap.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={wrapRef} className="hero-media group bg-ink" data-cursor="media">
      <div className="hero-poster" aria-hidden="true" />
      <video
        ref={videoRef}
        className="hero-video-el relative h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="hero-spotlight absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20"
        aria-hidden="true"
      />
      <div className="grain absolute inset-0 opacity-50" aria-hidden="true" />
    </div>
  );
}
