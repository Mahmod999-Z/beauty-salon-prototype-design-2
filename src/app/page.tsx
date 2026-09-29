import { BeforeAfter } from "@/components/before-after";
import { CallBar } from "@/components/call-bar";
import { Contact } from "@/components/contact";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { Hours } from "@/components/hours";
import { Hygiene } from "@/components/hygiene";
import { PriceList } from "@/components/price-list";
import { Reviews } from "@/components/reviews";

export default function Home() {
  return (
    <>
      <main id="inhoud">
        <Hero />
        <Gallery />
        <PriceList />
        <Reviews />
        <Hours />
        <Hygiene />
        <BeforeAfter />
        <Contact />
      </main>
      <CallBar />
    </>
  );
}
