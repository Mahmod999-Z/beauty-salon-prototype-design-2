import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { CursorRig } from "@/components/cursor-rig";
import { PitchMode } from "@/components/pitch-mode";
import { ShopPulse } from "@/components/shop-pulse";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { hairSalonJsonLd, salon } from "@/lib/salon";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Second voice: high-contrast serif for prices and figures, the way old
// barbershop signage sets its numerals. Self-hosted as a figures-only subset
// (6.5KB rather than 47KB) — so only apply `font-serif` to numeric content;
// anything else falls through to the serif stack below.
const bodoni = localFont({
  src: "./fonts/bodoni-moda-figures.woff2",
  variable: "--font-bodoni",
  weight: "600",
  display: "swap",
  fallback: ["ui-serif", "Georgia", "serif"],
});

const weekdayTime =
  salon.hours.find((slot) => slot.day === "Dinsdag")?.time ?? "";
const saturdayTime =
  salon.hours.find((slot) => slot.day === "Zaterdag")?.time ?? "";
const sundayTime =
  salon.hours.find((slot) => slot.day === "Zondag")?.time ?? "";

export const metadata: Metadata = {
  title: `${salon.name} — ${salon.street}, ${salon.city}`,
  description:
    `${salon.name}, ${salon.street}, ${salon.postalCode} ${salon.city}. Telefoon ${salon.phoneDisplay}. ` +
    `Dinsdag tot vrijdag ${weekdayTime}, zaterdag ${saturdayTime}, zondag ${sundayTime}. Maandag gesloten.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      className={`${spaceGrotesk.variable} ${inter.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">
        {/* The hero poster is a CSS background, so it is only discovered once
            the stylesheet parses. Preloading it per breakpoint pulls LCP in.
            React hoists these into <head> and emits a second matching hint;
            `media` rules out ReactDOM.preload(), which has no such option, and
            browsers dedupe preload hints by URL, so the extra tag is inert. */}
        <link
          rel="preload"
          as="image"
          href="/media/hero-poster.jpg"
          media="(min-width: 641px)"
        />
        <link
          rel="preload"
          as="image"
          href="/media/hero-poster-mobile.jpg"
          media="(max-width: 640px)"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(hairSalonJsonLd),
          }}
        />
        <a className="skip-link" href="#inhoud">
          Ga naar inhoud
        </a>
        <div className="scroll-progress" aria-hidden="true" />
        <ShopPulse />
        <CursorRig />
        <SiteHeader />
        {children}
        <SiteFooter />
        <PitchMode />
      </body>
    </html>
  );
}
