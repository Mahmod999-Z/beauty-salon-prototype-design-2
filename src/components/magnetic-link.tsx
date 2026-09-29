"use client";

import { useRef, type ReactNode } from "react";

const STRENGTH = 0.25;
const MAX_OFFSET = 10;

export function MagneticLink({
  href,
  className,
  children,
  target,
  rel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    const dx = Math.max(Math.min(x * STRENGTH, MAX_OFFSET), -MAX_OFFSET);
    const dy = Math.max(Math.min(y * STRENGTH, MAX_OFFSET), -MAX_OFFSET);
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`magnetic ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
