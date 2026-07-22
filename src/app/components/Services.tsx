import Image from "next/image";
import PixelEye from "./PixelEye";

/* guide.md · Section 4 — Services (4 cards).
   To use real images, add `src` (file in /public) to a card. */
type SvcCard = {
  src?: string;
  from: string;
  to: string;
  tags: string[];
};
type Service = {
  n: string;
  title: string;
  desc: string;
  theme: "dark" | "purple" | "light";
  cards: [SvcCard, SvcCard];
};

const SERVICES: Service[] = [
  {
    n: "/01",
    title: "Google Maps Rankings",
    theme: "dark",
    desc: "We optimize your Google Business Profile to improve local visibility, increase rankings, and generate consistent inbound calls from nearby customers.",
    cards: [
      { src: "/images/services/IMG_3716.PNG", from: "#1c1c22", to: "#3a3a44", tags: ["GBP", "Local SEO"] },
      { src: "/images/services/IMG_3714.PNG", from: "#2a2a30", to: "#5a5a66", tags: ["Maps", "Calls"] },
    ],
  },
  {
    n: "/02",
    title: "AI-Powered GEO",
    theme: "purple",
    desc: "We structure your online presence using Generative Engine Optimization strategies designed for modern search visibility and long-term local authority.",
    cards: [
      { src: "/images/services/AI1.PNG", from: "#4a3aa0", to: "#7c5cff", tags: ["GEO", "AI"] },
      { src: "/images/services/AI2.PNG", from: "#5b49c0", to: "#b6a2ff", tags: ["Visibility", "Authority"] },
    ],
  },
  {
    n: "/03",
    title: "High-Converting Websites",
    theme: "light",
    desc: "Fast, modern websites built to turn visitors into leads while supporting stronger Google visibility and local trust.",
    cards: [
      { src: "/websites/express_towing.PNG", from: "#c9c4ba", to: "#efece3", tags: ["Frontend", "CRO"] },
      { src: "/websites/life_restoration.PNG", from: "#cfd6dd", to: "#eef2f6", tags: ["Speed", "Leads"] },
    ],
  },
  {
    n: "/04",
    title: "Local Authority",
    theme: "dark",
    desc: "We strengthen your business credibility through review optimization, trust signals, local relevance, and consistent online authority building.",
    cards: [
      { src: "/images/services/LA1.PNG", from: "#241712", to: "#e0853a", tags: ["Reviews", "Trust"] },
      { src: "/images/services/LA2.PNG", from: "#15151a", to: "#3a3a46", tags: ["Local", "Brand"] },
    ],
  },
];

function Card({ card }: { card: SvcCard }) {
  return (
    <div className="scard">
      {card.src ? (
        <Image
          className="scard__img"
          src={card.src}
          alt=""
          fill
          sizes="(max-width: 760px) 90vw, 45vw"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div
          className="scard__img"
          style={{
            background: `linear-gradient(150deg, ${card.from}, ${card.to})`,
          }}
        />
      )}
      <div className="scard__eye">
        <div className="scard__eye-circle">
          <PixelEye />
        </div>
      </div>
      <div className="scard__tags">
        {card.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section className="services" aria-label="Services">
      {SERVICES.map((s, i) => (
        <article
          key={s.n}
          className="svc"
          data-theme={s.theme}
          style={{ ["--i" as string]: i }}
        >
          <div className="svc__inner">
            <header className="svc__head">
              <h2 className="svc__title">{s.title}</h2>
              <span className="svc__num">{s.n}</span>
            </header>
            <p className="svc__desc">{s.desc}</p>
            <div className="svc__cards">
              <Card card={s.cards[0]} />
              <Card card={s.cards[1]} />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
