import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { insights, getInsight } from "@/lib/insights";
import { getNews, getNewsItem, type NotionNews } from "@/lib/notion";

export const revalidate = 300; // 보도자료(Notion) ISR

export async function generateStaticParams() {
  const press = (await getNews()) ?? [];
  return [...insights.map((i) => ({ slug: i.slug })), ...press.map((p) => ({ slug: p.slug }))];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getInsight(slug);
  if (a) {
    return {
      title: `${a.title} — Insight`,
      description: a.summary,
      alternates: { canonical: `/news/${slug}` },
    };
  }
  const p = await getNewsItem(slug);
  if (p) {
    return {
      title: `${p.title} — News`,
      description: p.summary,
      alternates: { canonical: `/news/${slug}` },
    };
  }
  return { title: "News & Insight" };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getInsight(slug);

  // 인사이트가 아니면 → 보도자료 요약 랜딩(원문은 외부 링크)
  if (!a) {
    const p = await getNewsItem(slug);
    if (!p) notFound();
    return <PressLanding p={p} />;
  }

  const others = insights.filter((x) => x.slug !== a.slug);

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
              inLanguage: "ko-KR",
              author: { "@type": "Organization", name: "EX Corporation" },
              publisher: {
                "@type": "Organization",
                name: "EX Corporation",
                logo: { "@type": "ImageObject", url: "https://excorp.kr/ex-logo.png" },
              },
              mainEntityOfPage: `https://excorp.kr/news/${a.slug}`,
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "홈", item: "https://excorp.kr/" },
                { "@type": "ListItem", position: 2, name: "뉴스 & 인사이트", item: "https://excorp.kr/news" },
                { "@type": "ListItem", position: 3, name: a.title, item: `https://excorp.kr/news/${a.slug}` },
              ],
            },
          ]),
        }}
      />
      <PageHero
        breadcrumb={[
          { label: "News & Insight", href: "/news" },
          { label: "Insight", href: `/news/${a.slug}` },
        ]}
        tag={`Insight · ${a.year}`}
        title={a.title}
        lead={a.summary}
      />

      <article className="container-ex py-section">
        <div className="mx-auto max-w-3xl space-y-12">
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

          <div className="border-t border-border pt-8">
            <Link href="/news" className="text-sm font-medium text-lav transition-colors hover:text-lav-hover">
              ← News & Insight 전체 보기
            </Link>
          </div>

          {others.length > 0 && (
            <div className="border-t border-border pt-8">
              <h3 className="font-mono text-xs uppercase tracking-wider text-faint">More Insight</h3>
              <ul className="mt-4 space-y-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/news/${o.slug}`}
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

/* 보도자료 요약 랜딩 — 썸네일 + 요약 + 매체·발행일 + "원문 보기"(외부).
   기사 본문은 저작권상 재게시하지 않고, 우리 요약 + 원문 링크만 노출한다. */
function PressLanding({ p }: { p: NotionNews }) {
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
              inLanguage: "ko-KR",
              ...(p.outlet ? { publisher: { "@type": "Organization", name: p.outlet } } : {}),
              mainEntityOfPage: `https://excorp.kr/news/${p.slug}`,
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "홈", item: "https://excorp.kr/" },
                { "@type": "ListItem", position: 2, name: "뉴스 & 인사이트", item: "https://excorp.kr/news" },
                { "@type": "ListItem", position: 3, name: p.title, item: `https://excorp.kr/news/${p.slug}` },
              ],
            },
          ]),
        }}
      />
      <PageHero
        breadcrumb={[
          { label: "News & Insight", href: "/news" },
          { label: "보도자료", href: `/news/${p.slug}` },
        ]}
        tag={`보도자료${year ? ` · ${year}` : ""}`}
        title={p.title}
        lead={p.summary}
      />

      <article className="container-ex py-section">
        <div className="mx-auto max-w-3xl space-y-8">
          {p.thumbnail && (
            <figure className="overflow-hidden rounded-2xl border border-border bg-card">
              {/* Notion 서명 URL은 만료·변경 → next/image 대신 단순 img (설정 불필요) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.thumbnail} alt={p.title} className="h-auto w-full" />
            </figure>
          )}

          {(p.outlet || year) && (
            <p className="font-mono text-xs text-faint">
              {[p.outlet, year].filter(Boolean).join(" · ")}
            </p>
          )}

          {p.sourceUrl && (
            <div>
              <a
                href={p.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                원문 보기
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}

          <div className="border-t border-border pt-8">
            <Link href="/news" className="text-sm font-medium text-lav transition-colors hover:text-lav-hover">
              ← News & Insight 전체 보기
            </Link>
          </div>
        </div>
      </article>

      <CtaBanner />
    </>
  );
}
