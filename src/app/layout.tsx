import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">
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
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
