/**
 * Notion 데이터 레이어 (서버 전용).
 *
 * 관리자 = Notion. 사이트는 이 레이어로 Notion DB(데이터 소스)를 읽고, 문의는 여기로 쓴다.
 * 공개 콘텐츠 읽기와 문의 쓰기는 서로 다른 Integration 토큰을 사용한다.
 * 미설정(.env 없음)이거나 에러면 read는 null을 반환 → 호출부가 하드코딩 fallback을 쓰므로
 * Notion 미연결 상태에서도 사이트는 정상 동작한다.
 *
 * @notionhq/client v5: 쿼리·생성은 "데이터 소스(data source)" 단위다.
 *  - 읽기:  client.dataSources.query({ data_source_id })
 *  - 쓰기:  client.pages.create({ parent: { data_source_id }, properties })
 * 따라서 .env에는 데이터베이스 ID가 아니라 **데이터 소스 ID**(ds)를 넣는다.
 * (Notion DB 생성 후 MCP fetch가 <data-source url="collection://ds-id"> 로 알려준다.)
 *
 * ⚠️ 속성명은 거버넌스 정렬 설계 기준(가칭). MCP 복구 후 실제 DB 속성명과 1:1 대조 필요.
 */
import { Client } from "@notionhq/client";

type EnvMap = Record<string, string | undefined>;

type DataSourceQueryRequest = {
  data_source_id: string;
  page_size: 100;
  start_cursor?: string;
};

type DataSourceQueryPage<T> = {
  results: readonly T[];
  has_more: boolean;
  next_cursor: string | null;
};

export async function queryAllDataSourcePages<T>(
  queryPage: (request: DataSourceQueryRequest) => Promise<DataSourceQueryPage<T>>,
  dataSourceId: string,
): Promise<T[]> {
  const rows: T[] = [];
  let cursor: string | undefined;

  while (true) {
    const page = await queryPage({
      data_source_id: dataSourceId,
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    });
    rows.push(...page.results);
    if (!page.has_more) return rows;
    if (!page.next_cursor) throw new Error("Notion pagination cursor missing");
    cursor = page.next_cursor;
  }
}

const NOTION_RICH_TEXT_CHUNK_SIZE = 1_900;

export function toNotionRichText(content: string): { text: { content: string } }[] {
  const characters = Array.from(content);
  const richText: { text: { content: string } }[] = [];

  for (let start = 0; start < characters.length; start += NOTION_RICH_TEXT_CHUNK_SIZE) {
    richText.push({ text: { content: characters.slice(start, start + NOTION_RICH_TEXT_CHUNK_SIZE).join("") } });
  }
  return richText;
}

/**
 * 런타임 env 해석 — Notion 시크릿/DS ID를 어디서 읽을지 결정한다.
 *
 * ⚠️ Cloudflare Workers(OpenNext)에서는 시크릿이 `process.env`가 아니라
 * `getCloudflareContext().env`에 들어온다. process.env로 읽으면 런타임에 전부 undefined가 되어
 * Notion 호출이 모두 실패한다(= 뉴스가 fallback으로 표시되고, 문의가 DB에 저장 안 되던 원인).
 * - Workers 런타임: ctx.env 사용
 * - Node(빌드/`next dev`): process.env(.dev.vars/.env.local) 사용
 */
async function resolveEnv(): Promise<EnvMap> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = await getCloudflareContext({ async: true });
    const cfEnv = ctx?.env as unknown as EnvMap | undefined;
    if (cfEnv && (cfEnv.NOTION_PUBLIC_TOKEN || cfEnv.NOTION_INQUIRY_TOKEN)) {
      return { ...(process.env as EnvMap), ...cfEnv };
    }
  } catch {
    // 워커 컨텍스트가 아님(빌드/Node) → process.env 사용
  }
  return process.env as EnvMap;
}

type NotionTokenKey = "NOTION_PUBLIC_TOKEN" | "NOTION_INQUIRY_TOKEN";

/** 용도별 Notion 클라이언트 + 해석된 env. 토큰 없으면 null. */
async function notion(tokenKey: NotionTokenKey): Promise<{ c: Client; env: EnvMap } | null> {
  const env = await resolveEnv();
  const token = env[tokenKey];
  if (!token) return null;
  return { c: new Client({ auth: token }), env };
}

export async function isNotionEnabled(): Promise<boolean> {
  return Boolean((await resolveEnv()).NOTION_PUBLIC_TOKEN);
}

/* ── 속성 안전 추출 헬퍼 (속성 부재·타입 불일치에도 안전) ─────────────── */
/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = Record<string, any>;
const txt = (p: any): string => {
  const arr = p?.title ?? p?.rich_text;
  return Array.isArray(arr) ? arr.map((t: any) => t?.plain_text ?? "").join("") : "";
};
const sel = (p: any): string => p?.select?.name ?? "";
const dateStart = (p: any): string => p?.date?.start ?? "";
const urlOf = (p: any): string => p?.url ?? "";
const fileUrl = (p: any): string => {
  const f = p?.files?.[0];
  return f?.external?.url ?? f?.file?.url ?? "";
};
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ── 타입 (사이트 렌더용 정규화 형태) ────────────────────────────── */
export type NotionNews = {
  id: string;
  slug: string;
  title: string;
  outlet: string;
  date: string;
  summary: string;
  sourceUrl: string;
  thumbnail: string;
  category: string;
};
export type NotionWork = {
  id: string;
  title: string;
  slug: string;
  sector: string;
  format: string;
  summary: string;
  image: string;
};
export type NotionCareer = {
  id: string;
  title: string;
  employment: string;
  summary: string;
  deadline: string;
};

/* ── 공통 쿼리 (게시여부=true만, 미설정/에러 → null) ───────────────── */
/* eslint-disable @typescript-eslint/no-explicit-any */
async function queryPublished(dsEnvKey: string): Promise<any[] | null> {
  const n = await notion("NOTION_PUBLIC_TOKEN");
  if (!n) return null;
  const dataSourceId = n.env[dsEnvKey];
  if (!dataSourceId) return null;
  try {
    // "게시여부" 체크박스가 true인 행만. 속성이 없으면 Notion이 무시하지 않고 에러낼 수 있어
    // 실제 속성명 확정 후 필터를 활성화한다. 지금은 전체 페이지를 조회 후 코드에서 거른다.
    return await queryAllDataSourcePages((request) => n.c.dataSources.query(request), dataSourceId);
  } catch (e) {
    console.warn("[notion] query 실패 — fallback 사용:", (e as Error).message);
    return null;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/** 보도자료/인사이트 — 게시여부=true만, 발행일 최신순. 미설정/에러 시 null(호출부 fallback). */
export async function getNews(): Promise<NotionNews[] | null> {
  const rows = await queryPublished("NOTION_DS_NEWS");
  if (!rows) return null;
  return rows
    .filter((r) => r.properties?.["게시여부"]?.checkbox === true)
    .map((r): NotionNews => {
      const p: Props = r.properties ?? {};
      // slug 미설정 시 page id로 폴백 → 항상 라우팅 가능
      const slug = txt(p["slug"]) || r.id.replace(/-/g, "");
      return {
        id: r.id,
        slug,
        title: txt(p["제목"] ?? p["Title"]),
        outlet: txt(p["매체"]),
        date: dateStart(p["발행일"]),
        summary: txt(p["요약"]),
        sourceUrl: urlOf(p["원문URL"]),
        thumbnail: fileUrl(p["썸네일"]),
        category: sel(p["카테고리"]) || "보도자료",
      };
    })
    .filter((n) => n.title)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

/** slug로 단일 보도자료 조회(요약 랜딩 페이지용). */
export async function getNewsItem(slug: string): Promise<NotionNews | null> {
  const all = await getNews();
  return all?.find((n) => n.slug === slug) ?? null;
}

/* ── Insight(기술 인사이트 글) ─────────────────────────────────────
   WEBSITE_INSIGHTS 데이터 소스. 본문은 Notion 페이지 콘텐츠(heading_2 + paragraph)로 작성하고,
   상세 페이지에서 {h, p[]} 섹션 구조로 복원한다. 미설정/에러 시 null → lib/insights.ts fallback. */
export type NotionInsightMeta = {
  id: string;
  slug: string;
  year: string;
  title: string;
  summary: string;
  thumbnail: string;
};
export type NotionInsight = NotionInsightMeta & { body: { h: string; p: string[] }[] };

function mapInsightMeta(r: { id: string; properties?: Props }): NotionInsightMeta {
  const p: Props = r.properties ?? {};
  const slug = txt(p["slug"]) || r.id.replace(/-/g, "");
  return {
    id: r.id,
    slug,
    title: txt(p["제목"] ?? p["Title"]),
    summary: txt(p["요약"]),
    year: txt(p["연도"]) || dateStart(p["발행일"]).slice(0, 4),
    // 썸네일: public 경로(예: /shell_vp.png)는 URL/텍스트 속성에, 업로드 파일은 files 속성에.
    thumbnail: urlOf(p["썸네일경로"]) || txt(p["썸네일경로"]) || fileUrl(p["썸네일"]),
  };
}

/** 인사이트 목록(카드용, 본문 제외) — 게시여부=true, 연도 최신순. 미설정/에러 → null. */
export async function getInsights(): Promise<NotionInsightMeta[] | null> {
  const rows = await queryPublished("NOTION_DS_INSIGHTS");
  if (!rows) return null;
  return rows
    .filter((r) => r.properties?.["게시여부"]?.checkbox === true)
    .map(mapInsightMeta)
    .filter((n) => n.title)
    .sort((a, b) => (b.year || "").localeCompare(a.year || ""));
}

/** 페이지 블록(heading_2 + paragraph)을 {h, p[]} 섹션 배열로 복원. */
/* eslint-disable @typescript-eslint/no-explicit-any */
async function readInsightBody(pageId: string): Promise<{ h: string; p: string[] }[]> {
  const n = await notion("NOTION_PUBLIC_TOKEN");
  if (!n) return [];
  const c = n.c;
  const sections: { h: string; p: string[] }[] = [];
  let cursor: string | undefined;
  try {
    do {
      const res = await c.blocks.children.list({ block_id: pageId, start_cursor: cursor, page_size: 100 });
      for (const b of (res.results ?? []) as any[]) {
        if (b.type === "heading_2") {
          sections.push({ h: txt(b.heading_2), p: [] });
        } else if (b.type === "heading_3") {
          sections.push({ h: txt(b.heading_3), p: [] });
        } else if (b.type === "paragraph") {
          const t = txt(b.paragraph);
          if (!t) continue;
          if (sections.length === 0) sections.push({ h: "", p: [] });
          sections[sections.length - 1].p.push(t);
        }
      }
      cursor = (res as any).has_more ? (res as any).next_cursor : undefined;
    } while (cursor);
  } catch (e) {
    console.warn("[notion] insight body 읽기 실패:", (e as Error).message);
  }
  return sections;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/** slug로 단일 인사이트(본문 포함) 조회. 미설정/없음 → null(lib/insights.ts fallback). */
export async function getInsightItem(slug: string): Promise<NotionInsight | null> {
  const list = await getInsights();
  const meta = list?.find((n) => n.slug === slug);
  if (!meta) return null;
  const body = await readInsightBody(meta.id);
  return { ...meta, body };
}

/** Work 활용 사례. */
export async function getWork(): Promise<NotionWork[] | null> {
  const rows = await queryPublished("NOTION_DS_WORK");
  if (!rows) return null;
  return rows
    .map((r): NotionWork => {
      const p: Props = r.properties ?? {};
      return {
        id: r.id,
        title: txt(p["제목"] ?? p["Title"]),
        slug: txt(p["slug"]),
        sector: txt(p["분야"]) || sel(p["분야"]),
        format: txt(p["형태"]) || sel(p["형태"]),
        summary: txt(p["요약"]),
        image: fileUrl(p["대표이미지"]),
      };
    })
    .filter((w) => w.title);
}

/** Career 공고. */
export async function getCareers(): Promise<NotionCareer[] | null> {
  const rows = await queryPublished("NOTION_DS_CAREER");
  if (!rows) return null;
  return rows
    .map((r): NotionCareer => {
      const p: Props = r.properties ?? {};
      return {
        id: r.id,
        title: txt(p["직무"] ?? p["Title"]),
        employment: sel(p["고용형태"]),
        summary: txt(p["요약"]),
        deadline: dateStart(p["마감"]),
      };
    })
    .filter((c) => c.title);
}

/* ── 문의 접수 쓰기 (Contact 폼 → WEBSITE_INQUIRY) ───────────────── */
export type InquiryInput = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  type?: string;
  message: string;
  marketing?: boolean;
};

/** Notion 미설정이면 false(호출부는 다른 경로로 처리). 성공 시 true. */
export async function createInquiry(input: InquiryInput): Promise<boolean> {
  const n = await notion("NOTION_INQUIRY_TOKEN");
  const dsId = n?.env.NOTION_DS_INQUIRY;
  if (!n || !dsId) return false;
  try {
    await n.c.pages.create({
      parent: { type: "data_source_id", data_source_id: dsId },
      // 속성명은 실제 WEBSITE_INQUIRY DB와 1:1 확인됨(이름·회사·이메일·연락처·유형·메시지·상태).
      properties: {
        이름: { title: [{ text: { content: input.name } }] },
        회사: { rich_text: [{ text: { content: input.company ?? "" } }] },
        이메일: { email: input.email },
        연락처: { phone_number: input.phone || null },
        유형: input.type ? { select: { name: input.type } } : { select: null },
        메시지: { rich_text: toNotionRichText(input.message) },
        상태: { select: { name: "신규" } },
        "마케팅 수신동의": { checkbox: input.marketing ?? false },
      },
    });
    return true;
  } catch (e) {
    console.error("[notion] inquiry 생성 실패:", (e as Error).message);
    return false;
  }
}
