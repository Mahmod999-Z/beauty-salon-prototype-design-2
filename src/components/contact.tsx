import { CopyValue } from "@/components/copy-value";
import { MagneticLink } from "@/components/magnetic-link";
import { MapEmbed } from "@/components/map-embed";
import { salon } from "@/lib/salon";

const whatsappHref = `https://wa.me/${salon.phoneTel.replace("+", "")}?text=${encodeURIComponent(
  `Hoi, ik wil graag langskomen bij ${salon.name}.`,
)}`;

const mapsQuery = encodeURIComponent(
  `${salon.street} ${salon.postalCode} ${salon.city}`,
);

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-porcelain">
      <div className="grid gap-10 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:px-20 lg:py-32">
        <div className="reveal">
          <p className="font-display text-xs font-bold tracking-[0.22em] text-stripe uppercase">
            Contact
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,6.5vw,4.75rem)] leading-[0.9] font-bold tracking-[-0.045em]">
            Kom langs.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-ink/75">
            {salon.walkIn}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="mt-6 inline-flex min-h-11 items-center gap-2 border border-ink/20 bg-paper px-5 font-display text-sm font-bold tracking-tight text-ink shadow-e1 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0"
              fill="currentColor"
            >
              <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.27 4.9L2 22l5.25-1.27A9.94 9.94 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm5.8 14.2c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.13.09-1.83-.11-.42-.13-.96-.3-1.66-.6-2.92-1.26-4.83-4.2-4.98-4.4-.15-.2-1.2-1.6-1.2-3.05 0-1.46.76-2.17 1.03-2.47.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.52.24.6.83 2.06.9 2.21.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.15.48.13.66-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.94.29.15.48.22.55.34.07.13.07.72-.17 1.4Z" />
            </svg>
            WhatsApp
          </a>
        </div>
        <div className="reveal reveal-d1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <MagneticLink
              href={`tel:${salon.phoneTel}`}
              className="font-display text-[clamp(2rem,6.5vw,4rem)] leading-none font-bold tracking-[-0.045em] text-ink underline-offset-8 hover:text-pole hover:underline"
            >
              {salon.phoneDisplay}
            </MagneticLink>
            <CopyValue value={salon.phoneDisplay} label="Telefoonnummer" />
          </div>
          <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <MagneticLink
              href={`mailto:${salon.email}`}
              className="font-display text-[clamp(1.15rem,3vw,1.75rem)] font-semibold tracking-tight text-pole underline-offset-4 hover:underline"
            >
              {salon.email}
            </MagneticLink>
            <CopyValue value={salon.email} label="E-mailadres" />
          </div>
          <address className="mt-8 font-display text-[clamp(1.25rem,2.6vw,1.85rem)] leading-tight font-semibold tracking-tight text-ink not-italic">
            {salon.street}
            <br />
            {salon.postalCode} {salon.city}
          </address>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
            className="group/route mt-6 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-pole underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Route plannen
            <span
              aria-hidden="true"
              className="inline-block motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/route:translate-x-1"
            >
              →
            </span>
          </a>

          <div className="reveal reveal-d2 mt-8 h-64 overflow-hidden border border-ink/15 shadow-e2 sm:h-72">
            <MapEmbed />
          </div>
        </div>
      </div>
    </section>
  );
}
