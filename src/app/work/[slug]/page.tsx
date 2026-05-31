import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { works, getWork } from "@/lib/work";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) return { title: "Work" };
  return { title: `${w.title} — Work`, description: w.summary };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();

  const others = works.filter((x) => x.slug !== w.slug).slice(0, 3);

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Work", href: "/work" },
          { label: w.title, href: `/work/${w.slug}` },
        ]}
        tag={w.category}
        title={w.title}
        lead={w.summary}
      />

      {/* meta + hero image */}
      <section className="container-ex py-section">
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
              활용 시나리오
            </span>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
          <Image
            src={w.image}
            alt={w.title}
            width={1366}
            height={769}
            priority
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* challenge / solution / result */}
      <section className="bg-surface">
        <div className="container-ex grid gap-12 py-section lg:grid-cols-2">
          <div>
            <SectionLabel index="01">Challenge</SectionLabel>
            <h2 className="mt-5 text-balance text-2xl font-bold md:text-3xl">과제</h2>
            <p className="mt-5 leading-relaxed text-muted">{w.challenge}</p>
          </div>
          <div>
            <SectionLabel index="02">Solution</SectionLabel>
            <h2 className="mt-5 text-balance text-2xl font-bold md:text-3xl">EX의 해결</h2>
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
      <section className="container-ex py-section">
        <SectionLabel index="03">Result</SectionLabel>
        <h2 className="mt-5 text-balance text-2xl font-bold md:text-3xl">기대 효과</h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {w.result.map((r) => (
            <div key={r.l} className="rounded-2xl border border-border bg-card p-7">
              <p className="font-mono text-4xl font-bold text-gradient-ex-bright">{r.v}</p>
              <p className="mt-2 text-sm text-muted">{r.l}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-faint">
          ※ 위 수치는 도입 시 기대 효과(예시)이며, 구성·환경에 따라 달라질 수 있습니다.
        </p>
      </section>

      {/* other work */}
      <section className="bg-surface">
        <div className="container-ex py-section">
          <SectionLabel index="04">More Work</SectionLabel>
          <h2 className="mt-5 text-balance text-2xl font-bold md:text-3xl">다른 사례</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/work/${o.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/50"
              >
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
