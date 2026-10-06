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

    // Scroll-spy via IntersectionObserver. Measuring every section with
    // getBoundingClientRect() on each scroll frame forced a synchronous layout
    // per section, which is exactly the work that makes a scroll feel heavy.
    const visible = new Set<string>();
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = sections.find((section) => visible.has(section.id));
        setActiveHref(current ? `#${current.id}` : null);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    for (const section of sections) spy.observe(section);

    // scrollY alone needs no layout, so this stays a cheap rAF-gated read.
    const update = () => {
      ticking.current = false;
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      spy.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 text-paper transition-[padding,background] duration-300 ${
        scrolled
          ? "bg-ink/90 py-2 backdrop-blur-md"
          : "bg-gradient-to-b from-ink/55 via-ink/25 to-transparent py-3"
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-5 sm:px-10 lg:px-20">
        <a href="#inhoud" aria-label={`${salon.name}, naar boven`} data-cursor="pole">
          <Wordmark
            tone="paper"
            wipe
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
                  data-cursor="link"
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
            data-cursor="link"
            className="inline-flex min-h-9 items-center bg-paper px-3.5 font-display text-sm font-bold tracking-tight text-ink shadow-e1 transition-colors hover:bg-stripe hover:text-paper sm:px-4"
          >
            Bel nu
          </a>
        </div>
      </div>
    </header>
  );
}
