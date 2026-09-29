import { salon } from "@/lib/salon";

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function getTodaySlot(date: Date = new Date()) {
  const jsDay = date.getDay(); // 0 = Sunday
  const index = (jsDay + 6) % 7; // salon.hours starts on Maandag
  return salon.hours[index];
}

export function getOpenStatus(date: Date = new Date()): {
  open: boolean;
  detail: string;
} {
  const slot = getTodaySlot(date);
  if (!slot || slot.closed) {
    return { open: false, detail: "Gesloten vandaag" };
  }

  const [startStr, endStr] = slot.time.split("–");
  const start = toMinutes(startStr);
  const end = toMinutes(endStr);
  const now = date.getHours() * 60 + date.getMinutes();

  if (now < start) return { open: false, detail: `Opent om ${startStr}` };
  if (now >= end) return { open: false, detail: "Gesloten voor vandaag" };
  return { open: true, detail: `Tot ${endStr}` };
}
