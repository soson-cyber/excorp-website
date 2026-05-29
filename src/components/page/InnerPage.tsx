import { PageHero, type Crumb } from "@/components/page/PageHero";
import { PlaceholderSection, type SectionSpec } from "@/components/page/PlaceholderSection";
import { CtaBanner } from "@/components/layout/CtaBanner";

export function InnerPage({
  breadcrumb,
  tag,
  title,
  lead,
  sections,
  showCta = true,
}: {
  breadcrumb: Crumb[];
  tag?: string;
  title: string;
  lead?: string;
  sections: SectionSpec[];
  showCta?: boolean;
}) {
  return (
    <>
      <PageHero breadcrumb={breadcrumb} tag={tag} title={title} lead={lead} />
      {sections.map((spec, i) => (
        <PlaceholderSection key={spec.index + spec.label} spec={spec} surface={i % 2 === 1} />
      ))}
      {showCta && <CtaBanner />}
    </>
  );
}
