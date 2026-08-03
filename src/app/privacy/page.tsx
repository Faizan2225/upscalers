import React from "react";

export const metadata = {
  title: "Privacy Policy — Business Upscalers",
  description: "Read our privacy policy regarding how we collect, protect, and use your personal information.",
};

const SECTIONS = [
  { id: "intro", title: "1. Introduction" },
  { id: "collect", title: "2. Information We Collect" },
  { id: "use", title: "3. How We Use Your Information" },
  { id: "sms", title: "4. SMS Communications & Opt-Out" },
  { id: "sharing", title: "5. Data Sharing & Security" },
  { id: "links", title: "6. Third-Party Links" },
  { id: "updates", title: "7. Updates to This Policy" },
  { id: "contact", title: "8. Contact Us" },
];

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-page__container">
        
        {/* Header Block */}
        <header className="legal-header">
          <span className="legal-header__kicker">Business Upscalers LLC</span>
          <h1 className="legal-page__title">Privacy Policy</h1>
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
              <h2><span className="legal-card__num">1.</span> Introduction</h2>
              <p>
                Business Upscalers LLC (“Company,” “we,” “us,” or “our”) values your privacy. This Privacy Policy explains how we collect, use, and protect your personal information, including SMS communications and mobile opt-in data. By using our website and services, you agree to the terms of this Privacy Policy.
              </p>
            </section>

            <section className="legal-card" id="collect">
              <h2><span className="legal-card__num">2.</span> Information We Collect</h2>
              <p>We collect the following types of information to serve you better:</p>
              <ul>
                <li>
                  <span className="legal-card__label">Personal Information</span> 
                  Name, phone number, email address, business details, and other identifiers you provide.
                </li>
                <li>
                  <span className="legal-card__label">Automated Data</span> 
                  IP address, browser type, device information, and website usage analytics.
                </li>
                <li>
                  <span className="legal-card__label">Mobile Opt-In Data</span> 
                  If you opt-in to receive SMS messages, we collect and store your phone number along with consent details.
                </li>
              </ul>
            </section>

            <section className="legal-card" id="use">
              <h2><span className="legal-card__num">3.</span> How We Use Your Information</h2>
              <p>We use your information for the following business purposes:</p>
              <ul>
                <li>Providing, maintaining, and improving our services.</li>
                <li>Sending marketing communications, updates, and promotions.</li>
                <li>Responding to inquiries and customer support requests.</li>
                <li>Compliance with legal and regulatory obligations.</li>
              </ul>
            </section>

            <section className="legal-card" id="sms">
              <h2><span className="legal-card__num">4.</span> SMS Communications & Opt-Out Policy</h2>
              <p>
                By opting in, you consent to receive SMS messages related to our services.
              </p>
              
              <div className="legal-page__callout">
                <p>
                  <strong>Mobile Privacy Guarantee:</strong> Your mobile opt-in data and phone number will not be shared, sold, or disclosed to third parties or affiliates for marketing or promotional purposes under any circumstances.
                </p>
              </div>

              <ul>
                <li>Message frequency may vary. Message and data rates may apply.</li>
                <li>You may opt-out at any time by replying <strong>STOP</strong> to any SMS message.</li>
                <li>For assistance, reply <strong>HELP</strong> or contact us at <a href="mailto:info@businessupscalers.com">info@businessupscalers.com</a>.</li>
              </ul>
            </section>

            <section className="legal-card" id="sharing">
              <h2><span className="legal-card__num">5.</span> Data Sharing & Security</h2>
              <p>
                We prioritize protecting your data and keeping it confidential.
              </p>
              <ul>
                <li>We do not sell, rent, or lease your personal data.</li>
                <li>We may share information with trusted service providers under strict confidentiality agreements to support our operations.</li>
                <li>We implement industry-standard security measures (physical, technical, and administrative) to protect your data from unauthorized access or breaches.</li>
              </ul>
            </section>

            <section className="legal-card" id="links">
              <h2><span className="legal-card__num">6.</span> Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for their privacy practices, and we encourage you to review their privacy policies before sharing personal information.
              </p>
            </section>

            <section className="legal-card" id="updates">
              <h2><span className="legal-card__num">7.</span> Updates to This Privacy Policy</h2>
              <p>
                We may update this policy from time to time. Any changes will be posted on this page with the updated effective date. Continued use of our services after changes indicates acceptance of the revised policy.
              </p>
            </section>

            <section className="legal-card" id="contact">
              <h2><span className="legal-card__num">8.</span> Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <address className="legal-page__address">
                <strong>Business Upscalers LLC</strong><br />
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
