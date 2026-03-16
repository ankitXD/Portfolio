import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
            Terms of Service
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
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed">
              By accessing and using justankit.dev, you agree to be bound by
              these Terms of Service and our Privacy Policy. If you do not agree
              with any part of these terms, please do not use the website.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              2. Use of the Website
            </h2>
            <p className="leading-relaxed">
              You agree to use justankit.dev only for lawful purposes and in a
              way that does not infringe on the rights of others, restrict or
              inhibit their use and enjoyment of the website, or violate any
              applicable laws.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              3. Intellectual Property
            </h2>
            <p className="leading-relaxed">
              All content on justankit.dev, including text, graphics, logos, and
              images, is the property of justankit.dev unless otherwise stated.
              You may not reproduce, distribute, or modify any content without
              prior written consent.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              4. Disclaimer of Warranties
            </h2>
            <p className="leading-relaxed">
              justankit.dev is provided "as is" and "as available" without any
              warranties of any kind. We do not guarantee that the website will
              be available at all times or free of errors or viruses.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              5. Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              In no event shall justankit.dev or its owners be liable for any
              indirect, incidental, special, or consequential damages arising
              out of or in connection with your use of the website.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              6. External Links
            </h2>
            <p className="leading-relaxed">
              justankit.dev may contain links to third-party websites. We are
              not responsible for the content or reliability of any external
              sites linked from our platform.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              7. Modifications to Terms
            </h2>
            <p className="leading-relaxed">
              We reserve the right to update or change these Terms of Service at
              any time. Any changes will be effective immediately upon posting
              on this page. Continued use of the website constitutes acceptance
              of the updated terms.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              8. Governing Law
            </h2>
            <p className="leading-relaxed">
              These Terms of Service shall be governed by and construed in
              accordance with the laws of your jurisdiction, without regard to
              conflict of law principles.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              9. Contact Information
            </h2>
            <p className="leading-relaxed mb-3">
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <p className="leading-relaxed mb-6">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:guptankit.2003@gmail.com"
                className="text-emerald-600 dark:text-emerald-400 hover:underline transition-colors"
              >
                guptankit.2003@gmail.com
              </a>
            </p>
            <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
              Thank you for using justankit.dev.
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

export default Terms;
