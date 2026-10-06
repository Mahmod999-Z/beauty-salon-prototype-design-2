import { CompareSlider } from "@/components/compare-slider";
import Image from "next/image";
import { salon } from "@/lib/salon";

const photos = [
  {
    src: "/media/gallery-storefront.jpg",
    alt: `De gevel van ${salon.name}`,
    label: "De zaak",
  },
  {
    src: "/media/gallery-interior.jpg",
    alt: `Interieur van ${salon.name}`,
    label: "Interieur",
  },
  {
    src: "/media/gallery-portrait.jpg",
    alt: "De kapper aan het werk",
    label: "Vakmanschap",
  },
];

export function Gallery() {
  return (
    <section className="section-stack bg-paper">
      <div className="px-6 py-14 sm:px-10 sm:py-20 lg:px-20 lg:py-24">
        <ul className="grid gap-4 sm:grid-cols-3">
          {photos.map((photo, index) => (
            <li
              key={photo.src}
              data-cursor="media"
              className={`card-lift reveal reveal-d${index + 1} group relative aspect-4/5 overflow-hidden bg-ink`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-4 py-3 font-display text-xs font-bold tracking-[0.16em] text-paper uppercase"
              >
                {photo.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-center lg:gap-14">
          <figure className="reveal overflow-hidden shadow-e2">
            <CompareSlider
              before="/media/style-short.jpg"
              after="/media/style-long.jpg"
              beforeLabel="Kort"
              afterLabel="Langer"
              alt="Twee haarlengtes naast elkaar"
            />
          </figure>

          <div className="reveal reveal-d1">
            <p className="font-display text-xs font-bold tracking-[0.22em] text-stripe uppercase">
              Lengte kiezen
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4.4vw,3rem)] leading-[0.95] font-bold tracking-[-0.04em]">
              Kort of wat langer?
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/75">
              Sleep de greep om twee lengtes naast elkaar te zien. Niet zeker
              wat bij je past? Loop binnen — we kijken samen naar de vorm van je
              gezicht en de val van je haar.
            </p>
            <p className="mt-5 max-w-md font-sans text-[0.68rem] leading-relaxed text-ink/45">
              Voorbeeldfoto&apos;s van twee verschillende modellen, puur ter
              illustratie van lengte. Dit is geen voor-en-na van één klant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
