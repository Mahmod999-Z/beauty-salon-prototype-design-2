import { Wordmark } from "@/components/wordmark";
import { salon } from "@/lib/salon";

const mapsQuery = encodeURIComponent(
  `${salon.street} ${salon.postalCode} ${salon.city}`,
);

const links = [
  { href: "#diensten", label: "Prijzen" },
  { href: "#reviews", label: "Reviews" },
  { href: "#openingstijden", label: "Tijden" },
  { href: "#hygiene", label: "Hygiëne" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-paper px-6 pt-16 pb-28 sm:px-10 sm:pb-16 lg:px-20 lg:pt-20">
      <div
        className="line-grow absolute inset-x-0 top-0 h-px bg-ink/25"
        aria-hidden="true"
      />
      <div className="reveal flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div>
          <a href="#inhoud" aria-label={`${salon.name}, naar boven`}>
            <Wordmark className="origin-left scale-125" />
          </a>
          <p className="mt-6 max-w-2xs text-sm leading-relaxed text-ink/60">
            Barbier in {salon.city}. Vaste prijzen, geen afspraak nodig.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-sweep font-display text-sm font-semibold tracking-tight text-ink hover:text-pole"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="text-sm leading-relaxed text-ink/70">
          <a
            href={`tel:${salon.phoneTel}`}
            className="link-sweep block font-display font-semibold text-ink hover:text-pole"
          >
            {salon.phoneDisplay}
          </a>
          <a
            href={`mailto:${salon.email}`}
            className="link-sweep mt-1.5 block text-pole"
          >
            {salon.email}
          </a>
          <p className="mt-3">
            {salon.street}
            <br />
            {salon.postalCode} {salon.city}
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
            target="_blank"
            rel="noreferrer"
            className="group/route mt-3 inline-flex items-center gap-1.5 font-medium text-pole hover:underline"
          >
            Route plannen
            <span
              aria-hidden="true"
              className="inline-block motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/route:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-sm font-semibold tracking-tight text-ink/60">
          Een Xbuilt Studio conceptontwerp — geen bestaande salon.
          <span className="mt-1 block font-sans text-xs font-normal text-ink/40">
            Van concept tot livegang in dagen, niet maanden.
          </span>
        </p>
        <a
          href="#inhoud"
          className="group/top inline-flex items-center gap-1.5 self-start font-display text-sm font-semibold tracking-tight text-ink/60 transition-colors hover:text-ink sm:self-auto"
        >
          Terug naar boven
          <span
            aria-hidden="true"
            className="inline-block motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/top:-translate-y-1"
          >
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}
