---
name: ex-frontend-implementation
description: EX 웹사이트(Next.js 16 App Router · React 19 · TypeScript strict · Tailwind v4 다크 product-led)의 페이지·컴포넌트를 구현·수정할 때 반드시 사용. 다크 토큰·키트 CSS·반응형 줄바꿈·이미지·모션 규칙을 담는다. "컴포넌트 만들어", "페이지 수정", "섹션 추가", "스타일 바꿔", "반응형 고쳐" 등 프론트 구현 요청 시 트리거.
---

# EX 프론트엔드 구현 규칙

excorp-website의 코드를 만들거나 고칠 때 따르는 규칙이다. 단일 기준은 `DESIGN.md`(§0~§9)와 `src/app/globals.css @theme`다.

## 토큰·키트 (하드코딩 금지)
시맨틱 토큰만 쓴다. 주요 다크 토큰: bg `#0E0626` · surface `#14112C` · card `#161232` · footer `#0F1129` · fg `#FFFFFF` · muted `#C3C6D6` · faint `#9094A9` · lav `#C4B5FD` · violet `#8B5CF6` · mint `#45F1E0` · pink `#D206EE` · primary `#5E2EC0`.

키트 클래스 재사용: `.section`(+`--ink/--surface/--white` 톤 교차, `--glow`) · `.container-ex` · `.h2` · `.lead` · `.card`(더블 베젤) · `.btn`(`--onDark`/`--accent`=퍼플, `--pink`, `--glow`=글래스 엣지링, `--ghostDark`) · `.arrowlink`(+`--accent`) · `.twocol`(+`--media`).

## 반응형 줄바꿈 (이 프로젝트의 확정 규칙)
전역 `word-break: keep-all`이 한글 어절 단위 줄바꿈을 보장한다. 그 위에서:
- **본문/리드:** 수동 `<br/>` 쓰지 않는다. `.lead{text-wrap:pretty}`, `.hero-lead{text-wrap:balance}`에 맡긴다.
- **제목의 의도된 줄바꿈:** 데스크톱 한정 — 일반 2줄은 `<br className="hidden sm:block" />`, twocol 좁은 컬럼 제목은 `<br className="hidden lg:block" />`.
- **공백 보존 필수:** `<br/>`를 숨기면 JSX가 주변 공백을 제거해 단어가 붙는다. 반드시 `<br>` **앞에 `{" "}`**를 넣는다.
  ```jsx
  솔루션부터 스튜디오까지,{" "}
  <br className="hidden sm:block" />
  하나의 흐름으로
  ```

## React 19 / TS strict
- 이펙트 본문에서 동기 `setState` 금지(`react-hooks/set-state-in-effect`). 지연이 필요하면 `requestAnimationFrame(() => setX(...))` + cleanup `cancelAnimationFrame`.
- props·상태에 명시적 타입. `any` 지양.
- 헤더 투명↔불투명은 `[data-hero-sentinel]` IntersectionObserver(`rootMargin: "-84px 0px 0px 0px"`)로 제어한다. 새 히어로 페이지엔 sentinel을 둔다.

## 이미지
- `next/image` 사용. **파일명은 소문자**(`.JPG` 대문자 확장자는 Vercel/Linux에서 404 → 배포 깨짐). `public/`에 두고 `sizes`·필요 시 `priority` 지정. `next.config.ts`는 avif/webp 포맷.

## 모션
- `prefers-reduced-motion` 정적 경로를 항상 마련(파티클·오로라·gradient drift·console 자동순환 등). `Reveal` 컴포넌트는 `<html>`의 `[data-anim]` 게이팅을 따른다.

## 정직성·보존
- 카피·라벨 임의 변경 금지(content-brand-writer 영역). 레이아웃·클래스명·다크 토큰을 보존하고 기능 컴포넌트 동작을 깨지 않는다.
- 법무 페이지(/privacy, /terms) 본문은 손대지 않는다.

## 컴포넌트·상태·폴더 구조 관례
- **배치:** 컴포넌트는 도메인별 폴더에 둔다 — `src/components/{home,about,layout,page,motion,ui,work}`. 페이지는 `src/app/**/page.tsx`(App Router). 사이트 데이터·내비는 `src/lib/site.ts`.
- **Server vs Client:** 기본은 Server Component. 상호작용·브라우저 API·`useState`/`useEffect`가 필요할 때만 파일 상단 `"use client"`. 클라이언트 경계는 가능한 잎(leaf)으로 좁힌다(상위 레이아웃을 통째로 client로 만들지 않는다).
- **상태:** 전역 상태 라이브러리 없이 로컬 `useState` + props로 충분한 정적 마케팅 사이트다. 새 의존성(상태관리·UI킷) 도입은 임의로 하지 말고 제안 후 진행.
- **재사용:** 반복 UI는 `ui/`·`motion/`의 기존 컴포넌트(`Reveal`·`CountUp`·`SectionLabel`·`FeatureCard` 등)를 먼저 찾아 재사용. 새 패턴이 2회 이상 반복되면 컴포넌트로 추출.
- **모션 컴포넌트**(`Reveal` 등)는 `<html>`의 `[data-anim]` 게이팅과 `prefers-reduced-motion`을 이미 따른다 — 직접 모션을 넣기 전 이들을 우선 활용.

## 마무리
구현 후 변경 파일·요지를 정리해 qa-verifier에 검증을 넘긴다(데스크톱+모바일). 자세한 페이지/컴포넌트 인벤토리는 `HANDOFF.md` 참조.
