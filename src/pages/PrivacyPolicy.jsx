import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
            Privacy Policy
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            For justankit.dev
          </p>
        </div>

        {/* Effective Date */}
        <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-sm">
          <strong>Effective Date:</strong> March 16, 2026
        </p>

        {/* Content */}
        <div className="space-y-8 text-neutral-700 dark:text-neutral-300">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              1. Introduction
            </h2>
            <p className="leading-relaxed">
              Welcome to justankit.dev. Your privacy is important to us. This
              Privacy Policy outlines how we collect, use, and protect your
              information when you visit our website.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              2. Information We Collect
            </h2>
            <p className="leading-relaxed">
              justankit.dev does not collect or store any personal information
              from its users. We are committed to protecting your privacy and do
              not maintain any user data on our servers.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              3. Use of Google Analytics
            </h2>
            <p className="leading-relaxed">
              To enhance user experience and analyze website performance, we use
              Google Analytics. Google Analytics collects information such as
              your IP address, browser type, and browsing behavior. This data
              helps us understand how visitors interact with our site. However,
              Google Analytics does not identify individual users, and the
              information collected is used solely for improving our website's
              functionality and performance.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              4. No Sharing of Personal Data
            </h2>
            <p className="leading-relaxed">
              We do not share, sell, or rent any user information to third
              parties. Our use of Google Analytics is restricted to the data
              collected for analytical purposes only, and no personal data is
              shared with external entities.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              5. Data Security
            </h2>
            <p className="leading-relaxed">
              While we do not store user data, we strive to ensure that our
              website is secure and protected against unauthorized access. We
              regularly review and update our security measures to maintain a
              safe browsing experience for our visitors.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              6. Third-Party Links
            </h2>
            <p className="leading-relaxed">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these external
              sites. We encourage you to review their privacy policies before
              providing any personal information.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              7. Changes to This Privacy Policy
            </h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated effective date. We
              encourage you to review this policy periodically to stay informed
              about how we are protecting your information.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              8. Contact Us
            </h2>
            <p className="leading-relaxed mb-3">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
            <p className="leading-relaxed">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:guptankit.2003@gmail.com"
                className="text-emerald-600 dark:text-emerald-400 hover:underline transition-colors"
              >
                guptankit.2003@gmail.com
              </a>
            </p>
          </section>
        </div>

        {/* Footer Divider */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Last updated: March 16, 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
