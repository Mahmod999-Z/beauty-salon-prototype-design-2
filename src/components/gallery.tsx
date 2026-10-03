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
      </div>
    </section>
  );
}
