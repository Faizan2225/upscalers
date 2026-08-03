import React from "react";

export const metadata = {
  title: "Terms of Service — Business Upscalers",
  description: "Read the Terms of Service for accessing and using Business Upscalers.",
};

const SECTIONS = [
  { id: "intro", title: "Introduction" },
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "services", title: "2. Services Offered" },
  { id: "sms", title: "3. SMS Terms" },
  { id: "conduct", title: "4. User Conduct" },
  { id: "disclaimer", title: "5. Disclaimer" },
  { id: "liability", title: "6. Limitation of Liability" },
  { id: "termination", title: "7. Termination" },
  { id: "law", title: "8. Governing Law" },
  { id: "changes", title: "9. Changes to Terms" },
  { id: "contact", title: "10. Contact Info" },
];

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="legal-page__container">
        
        {/* Header Block */}
        <header className="legal-header">
          <span className="legal-header__kicker">Business Upscalers</span>
          <h1 className="legal-page__title">Terms of Service</h1>
          <p className="legal-page__date">Effective Date: August 4, 2026</p>
        </header>

        {/* Two Column Layout */}
        <div className="legal-layout">
          
          {/* Sidebar */}
          <aside className="legal-sidebar">
            <h3 className="legal-sidebar__title">Sections</h3>
            <nav className="legal-sidebar__nav">
              {SECTIONS.map((sec) => (
                <a key={sec.id} href={`#${sec.id}`} className="legal-sidebar__link">
                  {sec.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="legal-content">
            <section className="legal-card" id="intro">
              <p>
                By accessing and using <a href="https://businessupscalers.com">https://businessupscalers.com</a>, you agree to be bound by the following Terms of Service:
              </p>
            </section>

            <section className="legal-card" id="acceptance">
              <h2><span className="legal-card__num">1.</span> Acceptance of Terms</h2>
              <p>
                By using our website and services, including consenting to SMS communications, you agree to these terms.
              </p>
            </section>

            <section className="legal-card" id="services">
              <h2><span className="legal-card__num">2.</span> Services Offered</h2>
              <p>
                Business Upscalers provides premier digital services to help businesses elevate their brand, increase market presence, and achieve success.
              </p>
            </section>

            <section className="legal-card" id="sms">
              <h2><span className="legal-card__num">3.</span> SMS Terms</h2>
              <p>By opting in to receive SMS messages from Business Upscalers:</p>
              
              <div className="legal-page__callout">
                <p>
                  <strong>Mobile Privacy Guarantee:</strong> SMS opt-in consent and phone numbers are not shared with third parties or affiliates for marketing or promotional purposes under any circumstances.
                </p>
              </div>

              <ul>
                <li>You consent to receive informational, promotional, or conversational SMS communications.</li>
                <li>Message & data rates may apply.</li>
                <li>Messaging frequency may vary.</li>
                <li>Reply <strong>STOP</strong> to opt out of SMS communications.</li>
                <li>Reply <strong>HELP</strong> for support or assistance.</li>
              </ul>
            </section>

            <section className="legal-card" id="conduct">
              <h2><span className="legal-card__num">4.</span> User Conduct</h2>
              <p>Users agree not to engage in any of the following prohibited behaviors:</p>
              <ul>
                <li>Violating local, state, national, or international laws or regulations.</li>
                <li>Transmitting any unlawful, harmful, threatening, or offensive content.</li>
                <li>Attempting unauthorized access to our systems, servers, or user accounts.</li>
              </ul>
            </section>

            <section className="legal-card" id="disclaimer">
              <h2><span className="legal-card__num">5.</span> Disclaimer</h2>
              <p>
                Our services and website are provided “as is” without warranties of any kind, either express or implied. We do not guarantee uninterrupted, secure, or error-free service.
              </p>
            </section>

            <section className="legal-card" id="liability">
              <h2><span className="legal-card__num">6.</span> Limitation of Liability</h2>
              <p>
                Business Upscalers LLC is not liable for any direct, indirect, incidental, special, or consequential damages arising from the use of, or inability to use, our services or website.
              </p>
            </section>

            <section className="legal-card" id="termination">
              <h2><span className="legal-card__num">7.</span> Termination</h2>
              <p>
                We reserve the right, at our sole discretion, to terminate or restrict your access to our website or services for violations of these terms.
              </p>
            </section>

            <section className="legal-card" id="law">
              <h2><span className="legal-card__num">8.</span> Governing Law</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of the State of Texas, USA, without regard to conflicts of law principles.
              </p>
            </section>

            <section className="legal-card" id="changes">
              <h2><span className="legal-card__num">9.</span> Changes to Terms</h2>
              <p>
                We may update these terms at any time. Any changes will be posted on this page with the updated effective date. Continued use of our website constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="legal-card" id="contact">
              <h2><span className="legal-card__num">10.</span> Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <address className="legal-page__address">
                <strong>Business Upscalers</strong><br />
                8115 Valburn Drive, Richmond, TX 77406, USA<br />
                Email: <a href="mailto:info@businessupscalers.com">info@businessupscalers.com</a><br />
                Phone: (832) 340-9080
              </address>
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}
