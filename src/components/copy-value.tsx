"use client";

import { useState } from "react";

export function CopyValue({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable; the value is still visible and selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${label} kopiëren`}
      className={`link-sweep font-sans text-xs font-medium text-ink/45 hover:text-pole ${className ?? ""}`}
    >
      {copied ? "Gekopieerd ✓" : "Kopiëren"}
    </button>
  );
}
