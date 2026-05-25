// guide.md · Section 7 — Company / About
export default function About() {
  return (
    <section className="about" aria-label="About Upscalers">
      <div className="about__inner">
        <h2 className="about__title">Company</h2>

        <div className="about__content">
          <p className="about__lead">
            We help local service businesses rank higher on Google and generate
            more inbound calls using AI-powered GEO strategies.
          </p>
          <p className="about__text">
            Our focus is simple: more visibility, more rankings, and more
            qualified leads through Google Maps and local search. From Google
            Business Profile optimization to high-converting websites, every
            system we build is designed around business growth.
          </p>
          <button type="button" className="about__btn">
            More About Us
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 17 17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
