import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy of EX Corporation.",
  alternates: {
    canonical: "/en/privacy",
    languages: { ko: "/privacy", en: "/en/privacy", "x-default": "/privacy" },
  },
};

const EFFECTIVE_DATE = "June 11, 2026";

export default function PrivacyPageEn() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Privacy Policy", href: "/en/privacy" }]}
        title="Privacy Policy"
        lead={
          <>
            This is the Privacy Policy of EX Corporation. (Effective date: {EFFECTIVE_DATE})
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
          <p className="text-pretty">
            EX Corporation (hereinafter the &ldquo;Company&rdquo;) complies with the Personal Information Protection Act
            and other relevant laws and regulations, and establishes and discloses the following Privacy Policy in order
            to protect the personal information of data subjects and respect their rights and interests.
          </p>

          {/* Article 1 General Provisions */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 1 (General Provisions)</h2>
            <p className="text-pretty">
              In order to protect the freedom and rights of data subjects, the Company complies with the Personal
              Information Protection Act and relevant laws and regulations, and collects and uses personal information
              lawfully and fairly while managing it safely. This Privacy Policy applies to the processing of personal
              information conducted through the website operated by the Company (hereinafter the &ldquo;Site&rdquo;).
            </p>
          </article>

          {/* Article 2 Items and Methods of Collection */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 2 (Items and Methods of Collection of Personal Information)</h2>
            <p className="text-pretty">
              The Company collects the following personal information through the inquiry form on the Site (/contact).
              The Company does not operate any separate personal information collection procedures such as membership
              registration or payment.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>
                <span className="font-medium text-fg">Required items:</span> name, email address, content of inquiry
              </li>
              <li>
                <span className="font-medium text-fg">Optional items:</span> company name, contact (phone number), type
                of inquiry
              </li>
              <li>
                <span className="font-medium text-fg">Marketing consent (optional) items:</span> email address, name
                (only where the data subject has separately consented — see Article 5 for details)
              </li>
              <li>
                <span className="font-medium text-fg">Recruitment application items:</span> personal information
                contained in application documents such as a resume submitted by the applicant via email (see Article 6
                for details)
              </li>
              <li>
                <span className="font-medium text-fg">Automatically collected items:</span> access IP address, browser
                information, access logs (for security purposes, automatically generated and collected through the web
                infrastructure provider), and cookie-based behavioral information (collected through analytics tools —
                see Article 12 for details)
              </li>
            </ul>
            <p className="text-pretty">
              The collection methods are categorized as follows: the data subject directly entering information into the
              inquiry form on the Site; submitting application documents via email; and information automatically
              generated and collected during the use of the Site (security logs and analytics cookies).
            </p>
          </article>

          {/* Article 3 Purpose of Processing */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 3 (Purpose of Processing Personal Information)</h2>
            <p className="text-pretty">
              The Company processes the collected personal information only for the following purposes.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>
                Receipt, confirmation, and reply to inquiries, conducting consultations, and managing the history
                thereof
              </li>
              <li>Provision of information related to products, solutions, and the studio, and follow-up responses</li>
              <li>
                Stable operation of the Site, including prevention of fraudulent use and response to security threats
                (automatically collected items)
              </li>
            </ul>
          </article>

          {/* Article 4 Retention and Use Period */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 4 (Retention and Use Period of Personal Information)</h2>
            <p className="text-pretty">
              After the inquiry has been processed, the Company retains the relevant personal information for{" "}
              <span className="font-medium text-fg">three (3) years</span> for the purpose of managing the consultation
              history, and then destroys it. However, if the data subject requests deletion, the Company destroys it
              without delay. Automatically collected security logs are retained and managed in accordance with the
              policy of the infrastructure provider.
            </p>
            <p className="text-pretty">
              Where it is necessary to preserve personal information in accordance with relevant laws and regulations,
              the Company retains it for the period prescribed by such laws.
            </p>
          </article>

          {/* Article 5 Marketing Communications */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 5 (Matters Concerning Receipt of Marketing Information)</h2>
            <p className="text-pretty">
              The Company processes personal information as follows only where the data subject has separately consented
              to receive marketing information.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>
                <span className="font-medium text-fg">Items collected:</span> email address, name
              </li>
              <li>
                <span className="font-medium text-fg">Purpose of use:</span> sending news and insights from EX as well
                as product and event information
              </li>
              <li>
                <span className="font-medium text-fg">Retention period:</span> until consent is withdrawn
              </li>
              <li>
                <span className="font-medium text-fg">Withdrawal method:</span> you may use the unsubscribe link within
                the emails sent, or request withdrawal at soson@excorp.kr, and the Company will process it without
                delay.
              </li>
            </ul>
            <p className="text-pretty">
              Consent to receive marketing information is <span className="font-medium text-fg">optional</span>, and even
              if you do not consent, there is no restriction whatsoever on your use of the basic services of the Site,
              such as making inquiries.
            </p>
          </article>

          {/* Article 6 Recruitment Personal Information */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 6 (Processing of Recruitment Applicants&rsquo; Personal Information)</h2>
            <p className="text-pretty">
              The Company processes applicants&rsquo; personal information in connection with the recruitment process as
              follows.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>
                <span className="font-medium text-fg">Items collected:</span> personal information contained in
                application documents such as a resume submitted by the applicant to the recruitment email
                (careers@excorp.kr). Applicants are encouraged to provide only the minimum information necessary for
                recruitment evaluation, and are requested to refrain from including sensitive information such as
                resident registration numbers.
              </li>
              <li>
                <span className="font-medium text-fg">Purpose of use:</span> conducting the recruitment process and
                contacting applicants
              </li>
              <li>
                <span className="font-medium text-fg">Retention period:</span> retained for one (1) year after the
                completion of the recruitment process and then destroyed. However, if the applicant requests
                destruction, the Company destroys it without delay.
              </li>
              <li>
                <span className="font-medium text-fg">Receipt channel:</span> received via email (careers@excorp.kr)
              </li>
            </ul>
          </article>

          {/* Article 7 Provision to Third Parties */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 7 (Provision of Personal Information to Third Parties)</h2>
            <p className="text-pretty">
              The Company does not provide the personal information of data subjects to third parties. However, the
              following are exceptions.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>Where separate consent has been obtained from the data subject</li>
              <li>
                Where there are special provisions in the law, or where an investigative agency requests it in
                accordance with the procedures and methods prescribed by law
              </li>
            </ul>
          </article>

          {/* Article 8 Outsourcing and Overseas Transfer */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 8 (Outsourcing and Overseas Transfer of Personal Information Processing)</h2>
            <p className="text-pretty">
              For the smooth provision of services, the Company outsources the processing of personal information as
              follows, and because the servers of the relevant outsourcees are located overseas, personal information is
              transferred abroad. In its outsourcing contracts, the Company stipulates the matters necessary to ensure
              that personal information is managed safely in accordance with the Personal Information Protection Act.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface text-faint">
                    <th className="px-4 py-3 font-medium">Recipient</th>
                    <th className="px-4 py-3 font-medium">Country of Transfer</th>
                    <th className="px-4 py-3 font-medium">Items Transferred</th>
                    <th className="px-4 py-3 font-medium">Purpose of Transfer</th>
                    <th className="px-4 py-3 font-medium">Retention &amp; Use Period</th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  <tr className="border-b border-border align-top">
                    <td className="px-4 py-3 text-fg">Notion Labs, Inc.</td>
                    <td className="px-4 py-3">United States</td>
                    <td className="px-4 py-3">name, email, content of inquiry, company name, contact, type of inquiry</td>
                    <td className="px-4 py-3">storage of inquiry data and management of consultation history</td>
                    <td className="px-4 py-3">in accordance with the retention period under Article 4 (3 years after processing is completed)</td>
                  </tr>
                  <tr className="border-b border-border align-top">
                    <td className="px-4 py-3 text-fg">Cloudflare, Inc.</td>
                    <td className="px-4 py-3">United States</td>
                    <td className="px-4 py-3">access IP address, browser information, access logs</td>
                    <td className="px-4 py-3">transmission processing of web infrastructure and management of security logs</td>
                    <td className="px-4 py-3">in accordance with the policy of the infrastructure provider</td>
                  </tr>
                  <tr className="align-top">
                    <td className="px-4 py-3 text-fg">Google LLC</td>
                    <td className="px-4 py-3">United States</td>
                    <td className="px-4 py-3">cookie-based behavioral information</td>
                    <td className="px-4 py-3">analysis of usage statistics</td>
                    <td className="px-4 py-3">in accordance with Google&rsquo;s policy</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-pretty text-faint">
              Date and method of overseas transfer of personal information: at the time of service use, personal
              information is encrypted and transmitted/transferred via the information and communications network.
            </p>
          </article>

          {/* Article 9 Destruction Procedures and Methods */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 9 (Procedures and Methods for Destruction of Personal Information)</h2>
            <p className="text-pretty">
              When personal information becomes unnecessary because the retention period has elapsed or the purpose of
              processing has been achieved, the Company destroys the relevant personal information without delay.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>
                <span className="font-medium text-fg">Destruction procedure:</span> the Company selects the personal
                information for which grounds for destruction have arisen, and destroys it upon confirmation by the
                Chief Privacy Officer.
              </li>
              <li>
                <span className="font-medium text-fg">Destruction method:</span> personal information stored in the form
                of electronic files is permanently deleted using technical methods that prevent recovery or
                regeneration.
              </li>
            </ul>
          </article>

          {/* Article 10 Rights of Data Subjects */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 10 (Rights of Data Subjects and How to Exercise Them)</h2>
            <p className="text-pretty">
              Data subjects may exercise the following rights with respect to their personal information at any time.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>Request to access personal information</li>
              <li>Request to correct any errors</li>
              <li>Request for deletion</li>
              <li>Request to suspend processing</li>
            </ul>
            <p className="text-pretty">
              These rights may be exercised by requesting the Chief Privacy Officer under Article 13 in writing, by
              phone, or by email, and the Company will take action without delay. If a data subject requests the
              correction of an error in personal information, the Company will not use or provide the relevant personal
              information until the correction is completed.
            </p>
          </article>

          {/* Article 11 Security Measures */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 11 (Measures to Ensure the Security of Personal Information)</h2>
            <p className="text-pretty">
              The Company takes the following measures to ensure the security of personal information.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>Minimization of staff handling personal information and management of access rights</li>
              <li>Technical protection measures such as encrypted transmission of personal information</li>
              <li>Infrastructure security measures to inspect security logs and block unauthorized access</li>
            </ul>
          </article>

          {/* Article 12 Cookies and Behavioral Information */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 12 (Collection, Use, and Refusal of Cookies and Behavioral Information)</h2>
            <p className="text-pretty">
              The Company uses functional security cookies provided by the web infrastructure provider for the security
              and stable operation of the Site, and uses analytics cookies for the analysis of usage statistics. The
              Company does not use cookies for advertising purposes.
            </p>
            <p className="text-pretty">
              The Company uses Google Analytics provided by Google LLC (United States) to analyze the usage status of the
              Site. Through this, usage statistics such as visited pages and access environment are collected based on
              cookies, and this information is not used for the purpose of identifying individuals.
            </p>
            <p className="text-pretty">
              Users may refuse the storage of cookies through their web browser settings. In addition, if you do not
              wish to have information collected through Google Analytics, you may install the Google Analytics Opt-out
              Browser Add-on (
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-lav underline-offset-4 hover:underline"
              >
                https://tools.google.com/dlpage/gaoptout
              </a>
              ) to refuse collection. However, if you refuse security cookies, the use of some features of the Site may
              be restricted.
            </p>
          </article>

          {/* Article 13 Chief Privacy Officer */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 13 (Chief Privacy Officer)</h2>
            <p className="text-pretty">
              The Company designates a Chief Privacy Officer as follows, who takes overall responsibility for matters
              concerning the processing of personal information and handles data subjects&rsquo; inquiries, complaints,
              and remedies for damage in relation to the processing of personal information.
            </p>
            <div className="rounded-2xl border border-border bg-card p-6">
              <dl className="space-y-2 text-sm">
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-faint">Name</dt>
                  <dd className="text-fg">Seungoh Son</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-faint">Title</dt>
                  <dd className="text-fg">Chief Executive Officer</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-faint">Email</dt>
                  <dd className="text-fg">soson@excorp.kr</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-faint">Phone</dt>
                  <dd className="text-fg">031-699-8228</dd>
                </div>
              </dl>
            </div>
          </article>

          {/* Article 14 Remedies for Infringement of Rights */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 14 (Remedies for Infringement of Rights and Interests)</h2>
            <p className="text-pretty">
              Data subjects may apply to the following organizations for dispute resolution, consultation, etc., in
              order to obtain relief for personal information infringement.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-lav">
              <li>
                Privacy Infringement Report Center (개인정보침해 신고센터), Korea Internet &amp; Security Agency
                (한국인터넷진흥원) — 118 (no area code) (privacy.kisa.or.kr)
              </li>
              <li>
                Personal Information Dispute Mediation Committee (개인정보 분쟁조정위원회) — 1833-6972 (www.kopico.go.kr)
              </li>
              <li>
                Cyber Investigation Division, Supreme Prosecutors&rsquo; Office (대검찰청 사이버수사과) — 1301 (no area
                code) (www.spo.go.kr)
              </li>
              <li>
                Cyber Investigation Bureau, National Police Agency (경찰청 사이버수사국) — 182 (no area code)
                (ecrm.police.go.kr)
              </li>
            </ul>
          </article>

          {/* Article 15 Changes to the Policy */}
          <article className="space-y-3">
            <h2 className="text-xl font-bold text-fg">Article 15 (Changes to the Privacy Policy)</h2>
            <p className="text-pretty">
              This Privacy Policy may be subject to additions, deletions, and amendments in accordance with changes in
              laws, policies, or security technology. In the event of any amendment, the Company will announce the
              changes through a notice on the Site from seven (7) days prior to its effective date.
            </p>
          </article>

          {/* Addendum */}
          <article className="space-y-3 border-t border-border pt-8">
            <h2 className="text-xl font-bold text-fg">Addendum</h2>
            <p className="text-pretty">This Privacy Policy takes effect on {EFFECTIVE_DATE}.</p>
          </article>
        </div>
      </section>
    </>
  );
}
