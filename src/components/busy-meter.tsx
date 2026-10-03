"use client";

import { useState, useSyncExternalStore, type CSSProperties } from "react";
import { salon } from "@/lib/salon";

const LEVEL_WORD = ["rustig", "rustig", "gemiddeld", "druk", "erg druk"];

function levelWord(level: number) {
  return LEVEL_WORD[Math.min(Math.floor(level * LEVEL_WORD.length), 4)];
}

function openingHour(time: string) {
  return Number(time.split("–")[0].split(":")[0]);
}

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

/** Day index and hour in one stable number, so the snapshot only changes hourly. */
function nowKey() {
  const now = new Date();
  return ((now.getDay() + 6) % 7) * 100 + now.getHours();
}

export function BusyMeter() {
  const [picked, setPicked] = useState<number | null>(null);
  const key = useSyncExternalStore(subscribe, nowKey, () => -1);

  const today = key < 0 ? null : Math.floor(key / 100);
  const nowHour = key < 0 ? null : key % 100;
  const selected = picked ?? today ?? 1;

  const slot = salon.hours[selected];
  const profile = salon.busyness[selected];
  const levels = profile.levels;
  const isToday = today === selected;

  const start = slot.closed ? 0 : openingHour(slot.time);
  const quietest = levels.length
    ? levels.reduce(
        (best, level, index) => (level < levels[best] ? index : best),
        0,
      )
    : -1;

  return (
    <div className="border border-ink/10 bg-paper p-5 shadow-e1 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display text-sm font-bold tracking-[0.18em] text-ink uppercase">
          Hoe druk is het?
        </h3>
        {quietest >= 0 ? (
          <p className="font-sans text-xs text-ink/60">
            Rustigst rond{" "}
            <span className="font-semibold text-pole tabular-nums">
              {String(start + quietest).padStart(2, "0")}:00
            </span>
          </p>
        ) : null}
      </div>

      <div
        role="group"
        aria-label="Kies een dag"
        className="mt-5 flex flex-wrap gap-1.5"
      >
        {salon.busyness.map((entry, index) => (
          <button
            key={entry.day}
            type="button"
            aria-pressed={selected === index}
            aria-label={entry.day}
            onClick={() => setPicked(index)}
            data-cursor="link"
            className={`min-h-9 px-2.5 font-display text-xs font-bold tracking-[0.08em] uppercase transition-colors ${
              selected === index
                ? "bg-ink text-paper"
                : "bg-porcelain text-ink/55 hover:bg-bone hover:text-ink"
            }`}
          >
            {entry.day.slice(0, 2)}
            {today === index ? (
              <span className="ml-1 text-stripe" aria-hidden="true">
                ·
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {levels.length === 0 ? (
        <p className="mt-7 font-sans text-sm text-ink/55">
          {slot.day} is de zaak gesloten.
        </p>
      ) : (
        <>
          <ul className="mt-6 flex h-28 items-end gap-0.5">
            {levels.map((level, index) => {
              const hour = start + index;
              const current = isToday && nowHour === hour;
              return (
                <li
                  key={hour}
                  className="busy-col relative h-full flex-1"
                  title={`${String(hour).padStart(2, "0")}:00 — ${levelWord(level)}`}
                >
                  <span
                    className={`busy-fill ${current ? "busy-fill-now" : ""}`}
                    style={{ "--level": `${Math.max(level * 100, 6)}%` } as CSSProperties}
                  />
                  <span className="sr-only">
                    {String(hour).padStart(2, "0")}:00 — {levelWord(level)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-2 flex justify-between font-sans text-[0.65rem] text-ink/45 tabular-nums">
            <span>{String(start).padStart(2, "0")}:00</span>
            <span>{String(start + levels.length).padStart(2, "0")}:00</span>
          </div>

          {isToday && nowHour !== null ? (
            <p className="mt-4 font-sans text-xs text-ink/60">
              <span className="inline-block h-2 w-2 rounded-full bg-pole align-middle" />{" "}
              Nu, rond {String(nowHour).padStart(2, "0")}:00
            </p>
          ) : null}
        </>
      )}

      <p className="mt-5 font-sans text-[0.68rem] leading-relaxed text-ink/45">
        Voorbeeldprofiel ter illustratie. In de live versie komt dit uit je eigen
        agenda- of kassadata.
      </p>
    </div>
  );
}
