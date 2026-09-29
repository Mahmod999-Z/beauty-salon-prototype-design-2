import { salon } from "@/lib/salon";

export function Wordmark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  const text = tone === "paper" ? "text-paper" : "text-ink";
  const [firstWord, ...rest] = salon.name.split(" ");
  const secondWord = rest.join(" ") || firstWord;

  return (
    <span
      className={`group inline-flex items-center gap-2.5 ${className ?? ""}`}
    >
      <BarberPoleMark className="h-7 w-[9px] shrink-0" />
      <span className="inline-flex flex-col leading-none">
        <span
          className={`font-display text-[0.92rem] leading-none font-bold tracking-[0.1em] uppercase ${text}`}
        >
          {firstWord}
        </span>
        <span
          className={`mt-[3px] font-display text-[0.92rem] leading-none font-bold tracking-[0.3em] uppercase ${text}`}
        >
          {secondWord}
        </span>
      </span>
    </span>
  );
}

export function BarberPoleMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pole-mark relative block overflow-hidden rounded-full bg-ink ring-1 ring-inset ring-white/10 ${className ?? ""}`}
    >
      <span className="pole-stripes absolute inset-[1.5px] rounded-full" />
    </span>
  );
}
