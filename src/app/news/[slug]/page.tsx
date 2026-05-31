import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { insights, getInsight } from "@/lib/insights";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) return { title: "News & Insight" };
  return { title: `${a.title} — Insight`, description: a.summary };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) notFound();

  const others = insights.filter((x) => x.slug !== a.slug);

  return (
    <>
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
