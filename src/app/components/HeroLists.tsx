const LEFT = [
  "Google Rankings",
  "GEO",
  "Local SEO",
  "GBP Optimization",
  "AI Visibility",
];
const RIGHT = [
  "More Calls",
  "More Leads",
  "Google Maps",
  "Local Authority",
  "Organic Growth",
];

export default function HeroLists() {
  return (
    <>
      <ul className="hero__list hero__list--left">
        {LEFT.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ul className="hero__list hero__list--right">
        {RIGHT.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
