"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, getTodaySlot } from "@/lib/open-status";

export function TodayMarker({ day }: { day: string }) {
  const [state, setState] = useState<{ isToday: boolean; open: boolean } | null>(
    null,
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setState({
        isToday: getTodaySlot()?.day === day,
        open: getOpenStatus().open,
      });
    });
    return () => cancelAnimationFrame(id);
  }, [day]);

  if (!state?.isToday) return null;

  return (
    <span
      aria-label="Vandaag"
      className={`ml-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full align-middle ${
        state.open ? "bg-emerald-400 motion-safe:animate-pulse" : "bg-current opacity-30"
      }`}
    />
  );
}
