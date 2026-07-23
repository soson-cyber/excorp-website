import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { works, getWork } from "@/lib/work";

// 활용 시나리오는 비공개(대표 결정, 2026-07-23) — 검증된 도입 사례(kind === "case")만 발행한다.
export function generateStaticParams() {
  return works.filter((w) => w.kind === "case").map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w || w.kind === "scenario") return { title: "Work" };
  return {
    title: `${w.title} — 도입 사례`,
    description: w.summary,
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w || w.kind === "scenario") notFound();

  const kindLabel = "도입 사례";
  const others = works.filter((x) => x.slug !== w.slug && x.kind === w.kind).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "홈", item: "https://excorp.kr/" },
              { "@type": "ListItem", position: 2, name: "Work", item: "https://excorp.kr/work" },
              { "@type": "ListItem", position: 3, name: w.title, item: `https://excorp.kr/work/${w.slug}` },
            ],
          }),
        }}
      />
      <PageHero
        breadcrumb={[
          { label: "Work", href: "/work" },
          { label: w.title, href: `/work/${w.slug}` },
        ]}
        tag={`${kindLabel} · ${w.category}`}
        title={w.title}
        lead={w.summary}
      />

      {/* meta + hero image */}
      <section className="section section--ink section--glow">
        <div className="container-ex">
          <div className="flex flex-wrap gap-x-10 gap-y-4 border-y border-border py-5">
            {[
              ["분야", w.sector],
              ["콘텐츠 형태", w.format],
              ["사용 솔루션", w.stack.join(" · ")],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">{k}</dt>
                <dd className="mt-1 text-sm font-medium text-fg">{v}</dd>
              </div>
            ))}
            <div className="ml-auto self-center">
              <span className="rounded-full bg-primary-soft px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-lav">
                {kindLabel}
              </span>
            </div>
          </div>

          <div className="card mt-8" style={{ overflow: "hidden", padding: 0 }}>
            <Image src={w.image} alt={w.title} width={1366} height={769} priority className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* challenge / solution */}
      <section className="section section--surface">
        <div className="container-ex grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel index="01">Challenge</SectionLabel>
            <h2 className="mt-5 text-balance text-2xl font-bold text-fg md:text-3xl">과제</h2>
            <p className="mt-5 leading-relaxed text-muted">{w.challenge}</p>
          </div>
          <div>
            <SectionLabel index="02">Solution</SectionLabel>
            <h2 className="mt-5 text-balance text-2xl font-bold text-fg md:text-3xl">EX의 해결</h2>
            <ul className="mt-5 space-y-3">
              {w.solution.map((s) => (
                <li key={s} className="flex gap-3 text-fg">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* result */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionLabel index="03">Result</SectionLabel>
          <h2 className="mt-5 text-balance text-2xl font-bold text-fg md:text-3xl">
            검증 결과
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {w.result.map((r) => (
              <div key={r.l} className="card" style={{ padding: 28 }}>
                <p className="font-mono text-4xl font-bold text-gradient-ex-bright">{r.v}</p>
                <p className="mt-2 text-sm text-muted">{r.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* other work */}
      <section className="section section--surface section--glow">
        <div className="container-ex">
          <SectionLabel index="04">More Work</SectionLabel>
          <h2 className="mt-5 text-balance text-2xl font-bold text-fg md:text-3xl">다른 {kindLabel}</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/work/${o.slug}`} className="card group" style={{ overflow: "hidden", padding: 0 }}>
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={o.image}
                    alt={o.title}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-lav">{o.category}</span>
                  <h3 className="mt-1.5 font-semibold text-fg">{o.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
