import { salon } from "@/lib/salon";

export function Wordmark({
  className,
  tone = "ink",
  wipe = false,
}: {
  className?: string;
  tone?: "ink" | "paper";
  wipe?: boolean;
}) {
  const text = tone === "paper" ? "text-paper" : "text-ink";
  const [firstWord, ...rest] = salon.name.split(" ");
  const secondWord = rest.join(" ") || firstWord;

  return (
    <span
      className={`group inline-flex items-center gap-2.5 ${className ?? ""}`}
      data-cursor="pole"
    >
      <BarberPoleMark className="h-7 w-[11px] shrink-0" />
      <span className={`inline-flex flex-col leading-none ${wipe ? "wordmark-wipe" : ""}`}>
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
      className={`pole-mark ring-1 ring-white/10 ring-inset ${className ?? ""}`}
    >
      <span className="pole-stripes" />
      <span className="pole-shade" />
      <span className="pole-cap pole-cap-top" />
      <span className="pole-cap pole-cap-bottom" />
    </span>
  );
}
