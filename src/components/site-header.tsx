"use client";

import { useEffect, useRef, useState } from "react";
import { OpenStatus } from "@/components/open-status";
import { Wordmark } from "@/components/wordmark";
import { salon } from "@/lib/salon";

const links = [
  { href: "#diensten", label: "Prijzen" },
  { href: "#reviews", label: "Reviews" },
  { href: "#openingstijden", label: "Tijden" },
  { href: "#hygiene", label: "Hygiëne" },
  { href: "#contact", label: "Contact" },
];

const popularService = salon.services.find((service) => service.popular);

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);

    const update = () => {
      ticking.current = false;
      setScrolled(window.scrollY > window.innerHeight * 0.6);

      let current: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 140) {
          current = `#${section.id}`;
        }
      }
      setActiveHref(current);
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 text-paper backdrop-blur-sm transition-[padding,background] duration-300 ${
        scrolled
          ? "bg-ink/80 py-2 backdrop-blur-xl"
          : "bg-gradient-to-b from-ink/55 via-ink/25 to-transparent py-3"
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-5 sm:px-10 lg:px-20">
        <a href="#inhoud" aria-label={`${salon.name}, naar boven`}>
          <Wordmark
            tone="paper"
            className={`origin-left transition-transform duration-300 ${scrolled ? "scale-90" : ""}`}
          />
        </a>
        <nav aria-label="Pagina" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={activeHref === link.href ? "true" : undefined}
                  className={`link-sweep font-sans text-sm font-medium hover:text-paper ${
                    activeHref === link.href
                      ? "is-active text-paper"
                      : "text-paper/80"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <OpenStatus className="hidden font-sans text-xs text-paper/70 lg:inline-flex" />
          {scrolled && popularService ? (
            <a
              href="#diensten"
              className="hidden items-baseline gap-1.5 font-sans text-xs text-paper/70 hover:text-paper sm:inline-flex"
            >
              {popularService.name}
              <span className="font-display font-bold text-paper">
                {popularService.price}
              </span>
            </a>
          ) : null}
          <a
            href={`tel:${salon.phoneTel}`}
            className="inline-flex min-h-9 items-center bg-paper px-3.5 font-display text-sm font-bold tracking-tight text-ink transition-colors hover:bg-stripe hover:text-paper sm:px-4"
          >
            Bel nu
          </a>
        </div>
      </div>
    </header>
  );
}
