import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { insights, getInsight } from "@/lib/insights";
import { getNews, getNewsItem, getInsights, getInsightItem, type NotionNews } from "@/lib/notion";

export const revalidate = 300;

export async function generateStaticParams() {
  const press = (await getNews()) ?? [];
  const ins = (await getInsights()) ?? insights;
  return [...ins.map((i) => ({ slug: i.slug })), ...press.map((p) => ({ slug: p.slug }))];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = (await getInsightItem(slug)) ?? getInsight(slug);
  if (a) {
    return {
      title: `${a.title} — Insight`,
      description: a.summary,
      alternates: {
        canonical: `/en/news/${slug}`,
        languages: { "ko-KR": `/news/${slug}`, "en-US": `/en/news/${slug}`, "x-default": `/news/${slug}` },
      },
    };
  }
  const p = await getNewsItem(slug);
  if (p) {
    return {
      title: `${p.title} — News`,
      description: p.summary,
      alternates: {
        canonical: `/en/news/${slug}`,
        languages: { "ko-KR": `/news/${slug}`, "en-US": `/en/news/${slug}`, "x-default": `/news/${slug}` },
      },
    };
  }
  return { title: "News & Insight" };
}

export default async function NewsDetailPageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = (await getInsightItem(slug)) ?? getInsight(slug);

  if (!a) {
    const p = await getNewsItem(slug);
    if (!p) notFound();
    return <PressLandingEn p={p} />;
  }

  const others = ((await getInsights()) ?? insights).filter((x) => x.slug !== a.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: a.title,
              description: a.summary,
              datePublished: String(a.year),
              inLanguage: "en-US",
              author: { "@type": "Organization", name: "EX Corporation" },
              publisher: {
                "@type": "Organization",
                name: "EX Corporation",
                logo: { "@type": "ImageObject", url: "https://excorp.kr/ex-logo.png" },
              },
              mainEntityOfPage: `https://excorp.kr/en/news/${a.slug}`,
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://excorp.kr/en" },
                { "@type": "ListItem", position: 2, name: "News & Insight", item: "https://excorp.kr/en/news" },
                { "@type": "ListItem", position: 3, name: a.title, item: `https://excorp.kr/en/news/${a.slug}` },
              ],
            },
          ]),
        }}
      />
      <PageHero
        breadcrumb={[
          { label: "News & Insight", href: "/en/news" },
          { label: "Insight", href: `/en/news/${a.slug}` },
        ]}
        tag={`Insight · ${a.year}`}
        title={a.title}
        lead={a.summary}
      />

      {a.thumbnail && (
        <figure className="container-ex mt-2">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.thumbnail} alt={a.title} className="h-auto w-full" />
          </div>
        </figure>
      )}

      <article className="container-ex py-section">
        <div className="mx-auto max-w-3xl space-y-10">
          <div className="rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed text-muted">
            <p>
              This English detail page is provided to keep international links and hreflang targets valid. The current article body is maintained in Korean until the full English editorial workflow is connected.
            </p>
            <p className="mt-3">
              For now, use the Korean original below as the source of truth, or contact EX for an English briefing.
            </p>
          </div>

          {a.body.map((sec) => (
            <section key={sec.h}>
              <h2 className="text-balance text-2xl font-bold text-fg">{sec.h}</h2>
              <div className="mt-4 space-y-4">
                {sec.p.map((para, i) => (
                  <p key={i} className="leading-relaxed text-muted">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div className="flex flex-wrap gap-3 border-t border-border pt-8">
            <Link href={`/news/${a.slug}`} className="text-sm font-medium text-lav transition-colors hover:text-lav-hover">
              Read Korean original →
            </Link>
            <Link href="/en/news" className="text-sm font-medium text-lav transition-colors hover:text-lav-hover">
              ← Back to News & Insight
            </Link>
          </div>

          {others.length > 0 && (
            <div className="border-t border-border pt-8">
              <h3 className="font-mono text-xs uppercase tracking-wider text-faint">More Insight</h3>
              <ul className="mt-4 space-y-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/en/news/${o.slug}`}
                      className="group flex items-baseline gap-2 text-fg transition-colors hover:text-lav"
                    >
                      <span className="font-medium">{o.title}</span>
                      <span aria-hidden="true" className="text-lav transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      <CtaBanner />
    </>
  );
}

function PressLandingEn({ p }: { p: NotionNews }) {
  const year = p.date ? p.date.slice(0, 4) : "";
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: p.title,
              description: p.summary,
              ...(p.date ? { datePublished: p.date } : {}),
              ...(p.thumbnail ? { image: [p.thumbnail] } : {}),
              inLanguage: "en-US",
              ...(p.outlet ? { publisher: { "@type": "Organization", name: p.outlet } } : {}),
              mainEntityOfPage: `https://excorp.kr/en/news/${p.slug}`,
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://excorp.kr/en" },
                { "@type": "ListItem", position: 2, name: "News & Insight", item: "https://excorp.kr/en/news" },
                { "@type": "ListItem", position: 3, name: p.title, item: `https://excorp.kr/en/news/${p.slug}` },
              ],
            },
          ]),
        }}
      />
      <PageHero
        breadcrumb={[
          { label: "News & Insight", href: "/en/news" },
          { label: "Press", href: `/en/news/${p.slug}` },
        ]}
        tag={`Press${year ? ` · ${year}` : ""}`}
        title={p.title}
        lead={p.summary}
      />

      <article className="container-ex py-section">
        <div className="mx-auto max-w-3xl space-y-8">
          {p.thumbnail && (
            <figure className="overflow-hidden rounded-2xl border border-border bg-card">
              {/* Notion signed URLs can expire/change, so use a plain img. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.thumbnail} alt={p.title} className="h-auto w-full" />
            </figure>
          )}

          <div className="rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed text-muted">
            <p>
              This page summarizes EX press coverage for international visitors. The publisher article remains the source of truth.
            </p>
          </div>

          {(p.outlet || year) && (
            <p className="font-mono text-xs text-faint">
              {[p.outlet, year].filter(Boolean).join(" · ")}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {p.sourceUrl && (
              <a
                href={p.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Read publisher article
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <Link
              href={`/news/${p.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-primary/50 hover:text-lav"
            >
              Korean page →
            </Link>
          </div>

          <div className="border-t border-border pt-8">
            <Link href="/en/news" className="text-sm font-medium text-lav transition-colors hover:text-lav-hover">
              ← Back to News & Insight
            </Link>
          </div>
        </div>
      </article>

      <CtaBanner />
    </>
  );
}
