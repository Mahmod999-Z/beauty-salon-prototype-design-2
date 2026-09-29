"use client";

import { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/open-status";

export function OpenStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<{
    open: boolean;
    detail: string;
  } | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) return null;

  return (
    <span className={`inline-flex items-center gap-1.5 ${className ?? ""}`}>
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${
          status.open
            ? "bg-emerald-400 motion-safe:animate-pulse"
            : "bg-current opacity-40"
        }`}
      />
      <span>{status.open ? "Nu open" : "Nu gesloten"}</span>
      <span className="opacity-60">· {status.detail}</span>
    </span>
  );
}
