import { salon } from "@/lib/salon";

export function CallBar() {
  const sunday = salon.hours.find((slot) => slot.sunday);

  return (
    <div className="callbar-in fixed inset-x-0 bottom-0 z-40 border-t border-paper/15 bg-ink/92 px-4 py-3 backdrop-blur-md sm:hidden">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-xs leading-tight font-semibold text-paper">
          Zondag open
          <span className="block font-sans font-normal text-paper/65">
            {sunday?.time}
          </span>
        </p>
        <a
          href={`tel:${salon.phoneTel}`}
          data-cursor="link"
          className="callbar-pulse inline-flex min-h-11 flex-1 items-center justify-center bg-paper px-4 font-display text-sm font-bold tracking-tight text-ink"
        >
          Bel {salon.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
