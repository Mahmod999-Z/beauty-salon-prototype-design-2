"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      return;
    }

    const start = () => {
      video.play().catch(() => {
        // Some browsers still require a gesture; the poster carries the frame.
      });
    };

    start();
    document.addEventListener("pointerdown", start, { once: true });
    return () => document.removeEventListener("pointerdown", start);
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
    <div ref={wrapRef} className="group absolute inset-0 z-0">
      <video
        ref={videoRef}
        className="hero-video-el h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/media/hero-poster.jpg"
        src="/media/hero-loop.mp4"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="hero-spotlight absolute inset-0" aria-hidden="true" />
    </div>
  );
}
