/**
 * Notion 데이터 레이어 (서버 전용).
 *
 * 관리자 = Notion. 사이트는 이 레이어로 Notion DB(데이터 소스)를 읽고, 문의는 여기로 쓴다.
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

const TOKEN = process.env.NOTION_TOKEN;

/** 각 DB의 데이터 소스 ID (.env). 미설정 항목은 해당 read가 null을 반환. */
export const NOTION_DS = {
  news: process.env.NOTION_DS_NEWS,
  work: process.env.NOTION_DS_WORK,
  career: process.env.NOTION_DS_CAREER,
  inquiry: process.env.NOTION_DS_INQUIRY,
} as const;

export function isNotionEnabled(): boolean {
  return Boolean(TOKEN);
}

let _client: Client | null = null;
function client(): Client | null {
  if (!TOKEN) return null;
  if (!_client) _client = new Client({ auth: TOKEN });
  return _client;
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
  title: string;
  outlet: string;
  date: string;
  summary: string;
  sourceUrl: string;
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
async function queryPublished(dataSourceId: string | undefined): Promise<any[] | null> {
  const c = client();
  if (!c || !dataSourceId) return null;
  try {
    const res = await c.dataSources.query({
      data_source_id: dataSourceId,
      // "게시여부" 체크박스가 true인 행만. 속성이 없으면 Notion이 무시하지 않고 에러낼 수 있어
      // 실제 속성명 확정 후 필터를 활성화한다. 지금은 전체 조회 후 코드에서 거른다.
      page_size: 100,
    });
    return (res as any).results ?? [];
  } catch (e) {
    console.warn("[notion] query 실패 — fallback 사용:", (e as Error).message);
    return null;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/** 보도자료/인사이트 — 게시여부=true만, 발행일 최신순. 미설정/에러 시 null(호출부 fallback). */
export async function getNews(): Promise<NotionNews[] | null> {
  const rows = await queryPublished(NOTION_DS.news);
  if (!rows) return null;
  return rows
    .filter((r) => r.properties?.["게시여부"]?.checkbox === true)
    .map((r): NotionNews => {
      const p: Props = r.properties ?? {};
      return {
        id: r.id,
        title: txt(p["제목"] ?? p["Title"]),
        outlet: txt(p["매체"]),
        date: dateStart(p["발행일"]),
        summary: txt(p["요약"]),
        sourceUrl: urlOf(p["원문URL"]),
        category: sel(p["카테고리"]) || "보도자료",
      };
    })
    .filter((n) => n.title)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

/** Work 활용 사례. */
export async function getWork(): Promise<NotionWork[] | null> {
  const rows = await queryPublished(NOTION_DS.work);
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
  const rows = await queryPublished(NOTION_DS.career);
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
};

/** Notion 미설정이면 false(호출부는 다른 경로로 처리). 성공 시 true. */
export async function createInquiry(input: InquiryInput): Promise<boolean> {
  const c = client();
  if (!c || !NOTION_DS.inquiry) return false;
  try {
    await c.pages.create({
      parent: { type: "data_source_id", data_source_id: NOTION_DS.inquiry },
      properties: {
        // 속성명은 설계 기준(가칭) — 실제 DB 속성명과 대조 후 확정.
        이름: { title: [{ text: { content: input.name } }] },
        회사: { rich_text: [{ text: { content: input.company ?? "" } }] },
        이메일: { email: input.email },
        연락처: { phone_number: input.phone ?? "" },
        유형: input.type ? { select: { name: input.type } } : { select: null },
        메시지: { rich_text: [{ text: { content: input.message.slice(0, 1900) } }] },
        상태: { select: { name: "신규" } },
      },
    });
    return true;
  } catch (e) {
    console.error("[notion] inquiry 생성 실패:", (e as Error).message);
    return false;
  }
}
