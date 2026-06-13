import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use of the EX Corporation website.",
  alternates: {
    canonical: "/en/terms",
    languages: { ko: "/terms", en: "/en/terms", "x-default": "/terms" },
  },
};

const EFFECTIVE_DATE = "June 11, 2026";

export default function TermsPageEn() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Terms of Use", href: "/en/terms" }]}
        title="Terms of Use"
        lead={
          <>
            These are the Terms of Use for the EX Corporation website. (Effective date: {EFFECTIVE_DATE})
            <br className="hidden sm:block" />
            <span className="mt-2 block text-base text-faint">
              This English version is provided for convenience. In case of any discrepancy, the Korean version shall
              prevail.
            </span>
          </>
        }
      />

      <section className="container-ex py-section">
        <div className="mx-auto max-w-3xl space-y-12 text-[0.975rem] leading-[1.85] text-muted">
          {/* Article 1 Purpose */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 1 (Purpose)</h2>
            <p className="text-pretty">
              The purpose of these Terms is to set forth the rights, obligations, and responsibilities between EX
              Corporation (hereinafter the &ldquo;Company&rdquo;) and users in connection with the use of the website
              (hereinafter the &ldquo;Site&rdquo;) operated by the Company.
            </p>
          </article>

          {/* Article 2 Definitions */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 2 (Definitions)</h2>
            <p className="text-pretty">The definitions of the terms used in these Terms are as follows.</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>
                <span className="font-medium text-fg">&ldquo;Site&rdquo;</span> means the website operated by the
                Company to provide information about the Company, products, and solutions, and to receive inquiries.
              </li>
              <li>
                <span className="font-medium text-fg">&ldquo;User&rdquo;</span> means a person who accesses the Site and
                uses the services provided by the Company in accordance with these Terms.
              </li>
            </ul>
          </article>

          {/* Article 3 Posting and Amendment of Terms */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 3 (Posting and Amendment of the Terms)</h2>
            <p className="text-pretty">
              The Company posts the contents of these Terms on the Site so that users can easily check them. The Company
              may amend these Terms within the scope that does not violate relevant laws and regulations, and in the
              event of any amendment, the Company will announce the effective date and the reasons for the amendment on
              the Site from before the effective date.
            </p>
          </article>

          {/* Article 4 Services Provided */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 4 (Services Provided)</h2>
            <p className="text-pretty">The services provided by the Company through the Site are as follows.</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>Provision of information about the Company, products, and solutions</li>
              <li>Receipt of and response to consultation and adoption inquiries through the inquiry form</li>
            </ul>
          </article>

          {/* Article 5 Change and Suspension of Services */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 5 (Change and Suspension of Services)</h2>
            <p className="text-pretty">
              The Company may change the contents of the services, or may suspend all or part of the services where there
              are unavoidable reasons such as system inspection or replacement, technical reasons, or natural disasters.
              In such cases, the Company will announce this in advance on the Site to the extent possible.
            </p>
          </article>

          {/* Article 6 Intellectual Property Rights */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 6 (Intellectual Property Rights)</h2>
            <p className="text-pretty">
              Copyright and other intellectual property rights to the content posted on the Site (text, images, designs,
              logos, etc.) belong to the Company. Users may not reproduce, distribute, transmit, or publish such content,
              or use it for commercial purposes, without the prior written consent of the Company.
            </p>
            <p className="text-pretty">
              Rights to the names and trademarks of the partner products displayed on the Site (Aximmetry, Moverse AI,
              RETracker, Unreal Engine, etc.) belong to their respective right holders, and the Company uses them solely
              for identification purposes.
            </p>
          </article>

          {/* Article 7 Obligations of Users */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 7 (Obligations of Users)</h2>
            <p className="text-pretty">Users shall not engage in any of the following acts.</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>Misappropriating another person&rsquo;s information or entering false information</li>
              <li>Infringing the Company&rsquo;s rights to its content</li>
              <li>
                Interfering with the normal operation of the Site (unauthorized access, automated mass requests, etc.)
              </li>
              <li>Acts prohibited by law or by these Terms</li>
            </ul>
          </article>

          {/* Article 8 Third-Party Information and External Links */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 8 (Third-Party Information and External Links)</h2>
            <p className="text-pretty">
              Information posted on the Site, such as the specifications and features of partner products, is prepared
              based on materials provided by each manufacturer, and such information may be changed without prior notice
              at the manufacturer&rsquo;s discretion. Please verify accurate and up-to-date information through the
              official materials of each manufacturer.
            </p>
            <p className="text-pretty">
              Where the Site provides links connecting to external sites, the Company is not responsible for the content
              and operation of such external sites.
            </p>
          </article>

          {/* Article 9 Disclaimer */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 9 (Disclaimer)</h2>
            <p className="text-pretty">
              The Company is not responsible where it is unable to provide services due to reasons beyond its reasonable
              control, such as natural disasters, power outages, or communication service failures. The Company is not
              liable, to the extent permitted by relevant laws and regulations, for judgments and decisions made by
              users in reliance on the information on the Site.
            </p>
          </article>

          {/* Article 10 Protection of Personal Information */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 10 (Protection of Personal Information)</h2>
            <p className="text-pretty">
              The Company endeavors to protect the personal information of users, and matters concerning the collection,
              use, and storage of personal information are governed by the Company&rsquo;s{" "}
              <a href="/en/privacy" className="font-medium text-lav underline-offset-4 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </article>

          {/* Article 11 Governing Law and Jurisdiction */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 11 (Governing Law and Jurisdiction)</h2>
            <p className="text-pretty">
              The laws of the Republic of Korea shall apply to these Terms and to matters relating to the use of the
              services. In the event of a dispute between the Company and a user in connection with the use of the
              services, the competent court under the Civil Procedure Act shall be the court of first instance having
              jurisdiction.
            </p>
          </article>

          {/* Addendum */}
          <article className="space-y-3 border-t border-border pt-8">
            <h2 className="text-xl font-bold text-fg">Addendum</h2>
            <p className="text-pretty">These Terms take effect on {EFFECTIVE_DATE}.</p>
          </article>
        </div>
      </section>
    </>
  );
}
