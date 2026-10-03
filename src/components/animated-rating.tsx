"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedRating({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        setDisplay(0);

        const duration = 1100;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value * 10) / 10);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <p
      ref={ref}
      className="font-serif text-[clamp(3.5rem,12vw,8rem)] leading-[0.82] font-semibold tracking-[-0.03em] tabular-nums"
    >
      {display.toFixed(1).replace(".", ",")}
    </p>
  );
}
