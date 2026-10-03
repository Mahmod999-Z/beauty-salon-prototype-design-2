"use client";

import { useEffect, useRef } from "react";

const DOT_LERP = 0.7;
const RING_LERP = 0.17;
const SCALE_LERP = 0.18;
const STRETCH_PER_PX = 0.012;
const MAX_STRETCH = 0.3;
const SNIP_MS = 420;

const SCALE_BY_STATE: Record<string, number> = {
  default: 1,
  link: 1.55,
  media: 1.3,
  price: 1.95,
  pole: 1.4,
};

/**
 * Two-layer cursor: a dot that tracks the pointer almost exactly and a ring
 * that trails it, stretches along its direction of travel, and snips on click.
 * Everything runs in one rAF writing transforms directly — no React state is
 * touched per frame.
 */
export function CursorRig() {
  const layerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const bladeTopRef = useRef<HTMLSpanElement>(null);
  const bladeBottomRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const bladeTop = bladeTopRef.current;
    const bladeBottom = bladeBottomRef.current;
    if (!layer || !dot || !ring || !bladeTop || !bladeBottom) return;

    // Touch and pen never get a fake cursor, and reduced motion keeps the real one.
    if (
      !matchMedia("(pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const root = document.documentElement;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let dotX = pointerX;
    let dotY = pointerY;
    let ringX = pointerX;
    let ringY = pointerY;
    let scale = 1;
    let targetScale = 1;
    let angle = 0;
    let snipStart = 0;
    let visible = false;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!visible) {
        visible = true;
        dotX = ringX = pointerX;
        dotY = ringY = pointerY;
        layer.classList.remove("cursor-hidden");
        // Only now give up the native cursor: if anything above this point
        // threw, the user is still left with a pointer they can see.
        root.classList.add("cursor-rig-on");
      }
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const holder = target.closest<HTMLElement>("[data-cursor]");
      const state = holder?.dataset.cursor ?? "default";
      targetScale = SCALE_BY_STATE[state] ?? 1;
      ring.classList.toggle("is-media", state === "media");
      ring.classList.toggle("is-price", state === "price");
      ring.classList.toggle("is-pole", state === "pole");
    };

    const onLeave = () => {
      visible = false;
      layer.classList.add("cursor-hidden");
    };

    const onDown = () => {
      snipStart = performance.now();
    };

    const tick = (now: number) => {
      const prevX = ringX;
      const prevY = ringY;

      dotX += (pointerX - dotX) * DOT_LERP;
      dotY += (pointerY - dotY) * DOT_LERP;
      ringX += (pointerX - ringX) * RING_LERP;
      ringY += (pointerY - ringY) * RING_LERP;
      scale += (targetScale - scale) * SCALE_LERP;

      // Velocity stretches the ring into an ellipse along its travel direction.
      const vx = ringX - prevX;
      const vy = ringY - prevY;
      const speed = Math.hypot(vx, vy);
      if (speed > 0.6) angle = Math.atan2(vy, vx);
      const stretch = Math.min(speed * STRETCH_PER_PX, MAX_STRETCH);

      let snipScale = 1;
      let bladeAngle = 26;
      let bladeAlpha = 0;
      const snipAge = now - snipStart;
      if (snipStart && snipAge < SNIP_MS) {
        const p = snipAge / SNIP_MS;
        const arc = Math.sin(Math.PI * p);
        snipScale = 1 - 0.34 * arc;
        bladeAngle = 26 - 24 * p;
        bladeAlpha = arc;
      }

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      ring.style.transform =
        `translate3d(${ringX}px, ${ringY}px, 0) rotate(${angle}rad) ` +
        `scale(${scale * snipScale * (1 + stretch)}, ${scale * snipScale * (1 - stretch)})`;

      bladeTop.style.opacity = `${bladeAlpha}`;
      bladeBottom.style.opacity = `${bladeAlpha}`;
      bladeTop.style.transform = `rotate(${bladeAngle}deg)`;
      bladeBottom.style.transform = `rotate(${180 - bladeAngle}deg)`;

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("cursor-rig-on");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={layerRef} className="cursor-layer cursor-hidden" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={bladeTopRef} className="cursor-blade" />
        <span ref={bladeBottomRef} className="cursor-blade" />
      </div>
    </div>
  );
}
