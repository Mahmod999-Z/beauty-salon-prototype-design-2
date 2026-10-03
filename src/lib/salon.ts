export const salon = {
  name: "Kapsalon Noord",
  street: "Voorbeeldstraat 12",
  postalCode: "1234 AB",
  city: "Voorbeeldstad",
  phoneDisplay: "06 12345678",
  phoneTel: "+31612345678",
  email: "info@voorbeeldsalon.nl",
  owner:
    "Bij Kapsalon Noord draait alles om jou en je eigen stijl. Als trotse eigenaar en enige medewerker van de zaak ben ik toegewijd om je de best mogelijke ervaring te bieden en te helpen aan de look die bij je past.",
  craft:
    "Onze topkappers gaan zoveel mogelijk uit van de vorm van het gezicht, de natuurlijke valling en structuur van het haar.",
  walkIn:
    "Heb je geen tijd om een afspraak te maken? Geen probleem! Bij Kapsalon Noord kun je gewoon binnenlopen.",
  hygiene:
    "Klik hier voor meer informatie over de maatregelen die wij treffen voor jouw en onze veiligheid.",
  services: [
    {
      name: "Haar knippen",
      price: "€32,50",
      popular: true,
      bundleOf: undefined,
    },
    { name: "Kort baard", price: "€22,50", popular: false, bundleOf: undefined },
    { name: "Lang baard", price: "€25,50", popular: false, bundleOf: undefined },
    {
      name: "Haar met baard",
      price: "€48",
      popular: false,
      bundleOf: ["Haar knippen", "Kort baard"],
    },
    { name: "Haar wassen", price: "€10", popular: false, bundleOf: undefined },
    { name: "Contouren", price: "€15", popular: false, bundleOf: undefined },
  ],
  hours: [
    { day: "Maandag", time: "gesloten", closed: true, sunday: false },
    { day: "Dinsdag", time: "09:00–18:00", closed: false, sunday: false },
    { day: "Woensdag", time: "09:00–18:00", closed: false, sunday: false },
    { day: "Donderdag", time: "09:00–18:00", closed: false, sunday: false },
    { day: "Vrijdag", time: "09:00–18:00", closed: false, sunday: false },
    { day: "Zaterdag", time: "09:00–16:00", closed: false, sunday: false },
    { day: "Zondag", time: "12:00–16:00", closed: false, sunday: true },
  ],
  // Illustrative only — a placeholder shape for the real thing. In a live build
  // this comes from the client's own booking or footfall data. One entry per
  // open hour, starting at that day's opening time.
  busyness: [
    { day: "Maandag", levels: [] },
    { day: "Dinsdag", levels: [0.22, 0.3, 0.46, 0.58, 0.44, 0.38, 0.52, 0.78, 0.92] },
    { day: "Woensdag", levels: [0.3, 0.42, 0.55, 0.6, 0.5, 0.44, 0.62, 0.85, 0.95] },
    { day: "Donderdag", levels: [0.26, 0.34, 0.48, 0.56, 0.46, 0.4, 0.58, 0.8, 0.9] },
    { day: "Vrijdag", levels: [0.35, 0.5, 0.66, 0.72, 0.6, 0.55, 0.74, 0.95, 1] },
    { day: "Zaterdag", levels: [0.6, 0.82, 0.95, 1, 0.92, 0.74, 0.58] },
    { day: "Zondag", levels: [0.52, 0.7, 0.62, 0.4] },
  ],
  rating: { score: "4,8", scoreValue: "4.8", count: 187, source: "Google" },
  reviews: [
    {
      quote:
        "Rustige zaak, duidelijke prijzen en ze nemen echt de tijd voor je. Precies wat ik zocht.",
      author: "Voorbeeld review",
    },
    {
      quote:
        "Kon zondag gewoon binnenlopen zonder afspraak. Voor mij als kwaliteit heel fijn.",
      author: "Voorbeeld review",
    },
    {
      quote: "Vakkundig geknipt en een gezellig gesprek erbij. Kom zeker terug.",
      author: "Voorbeeld review",
    },
  ],
} as const;

export function whatsappHref(message: string): string {
  const number = salon.phoneTel.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function parseEuroPrice(price: string): number {
  return Number(price.replace("€", "").replace(",", "."));
}

export function formatEuroPrice(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  const hasCents = Math.round(rounded * 100) % 100 !== 0;
  return `€${hasCents ? rounded.toFixed(2).replace(".", ",") : rounded.toFixed(0)}`;
}

export const hairSalonJsonLd = {
  "@context": "https://schema.org",
  "@type": ["HairSalon", "LocalBusiness"],
  name: salon.name,
  telephone: salon.phoneTel,
  email: salon.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: salon.street,
    postalCode: salon.postalCode,
    addressLocality: salon.city,
    addressCountry: "NL",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: salon.rating.scoreValue,
    reviewCount: String(salon.rating.count),
    bestRating: "5",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "https://schema.org/Tuesday",
        "https://schema.org/Wednesday",
        "https://schema.org/Thursday",
        "https://schema.org/Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "https://schema.org/Saturday",
      opens: "09:00",
      closes: "16:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "https://schema.org/Sunday",
      opens: "12:00",
      closes: "16:00",
    },
  ],
};
