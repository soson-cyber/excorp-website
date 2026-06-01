# EX Corporation — 페이지 콘텐츠 (Markdown)

각 라우트의 **실제 페이지 콘텐츠**(사람이 읽는 카피)를 라우트별 마크다운으로 정리한 폴더입니다.
코드/클래스명은 제외하고 카피·섹션 구조·표·CTA·FAQ만 충실히 옮겼습니다. (콘텐츠 검수 · 카피 편집 · Sanity CMS 모델링 · 인계용)

> 소스: `src/app/**/page.tsx` + `src/components/**` inline 카피 + `src/lib/site.ts`·`work.ts`.
> 정직성 규칙 유지 — 파트너 제품 = "연결·조율 / 리셀러·총판", Work = "활용 시나리오"(검증 안 된 기대 수치).

## 전역
| 파일 | 내용 |
|------|------|
| [`_global.md`](./_global.md) | 슬로건·미션, GNB, Footer, 거점(locations), 연락처, 파트너 — 전 페이지 공유 |

## Home
| 라우트 | 파일 | 내용 |
|--------|------|------|
| `/` | [`home.md`](./home.md) | 히어로 + §01~05 + EXLINK 구축사례 + 파트너 + Numbers + FAQ + CTA |

## Solution
| 라우트 | 파일 | 내용 |
|--------|------|------|
| `/solution` | [`solution.md`](./solution.md) | 솔루션 허브(양손 전략·두 경로·역량·수치) |
| `/solution/xr-solution` | [`solution-xr-solution.md`](./solution-xr-solution.md) | EXLINK 상세(8섹션·아키텍처·턴키 스펙·도입 단계) |
| `/solution/virtual-production` | [`solution-virtual-production.md`](./solution-virtual-production.md) | VP 방법론(기법·EX 강점·프로세스) |

## Product
| 라우트 | 파일 | 내용 |
|--------|------|------|
| `/product` | [`product.md`](./product.md) | 제품 인덱스(라인업 3종·비교표·인증) |
| `/product/aximmetry` | [`product-aximmetry.md`](./product-aximmetry.md) | Aximmetry(공식 리셀러) — 에디션·기능·사양·FAQ |
| `/product/moverse` | [`product-moverse.md`](./product-moverse.md) | Moverse AI(한국 총판) — 시스템·사양·FAQ |
| `/product/retracker` | [`product-retracker.md`](./product-retracker.md) | RETracker(한국 총판) — 라인업·사양·FAQ |

## XR Studio
| 라우트 | 파일 | 내용 |
|--------|------|------|
| `/xr-studio` | [`xr-studio.md`](./xr-studio.md) | 하남 스튜디오 — 콘텐츠 메뉴(9 SKU)·옵션·시설·예약 |

## Work
| 라우트 | 파일 | 내용 |
|--------|------|------|
| `/work` | [`work.md`](./work.md) | 활용 시나리오 갤러리(카테고리·6 케이스) |
| `/work/[slug]` | [`work-detail.md`](./work-detail.md) | 케이스 상세 템플릿 + 6 케이스 전체 |

## Company
| 라우트 | 파일 | 내용 |
|--------|------|------|
| `/about` | [`about.md`](./about.md) | 비전·미션·Why EX·특허·연혁·거점 |
| `/news` | [`news.md`](./news.md) | 보도자료·인사이트 목록 |
| `/news/[slug]` | [`news-articles.md`](./news-articles.md) | 인사이트 기사 2건 전문 |
| `/careers` | [`careers.md`](./careers.md) | 가치·일하는 방식·포지션·지원 절차 |

## Contact · Support
| 라우트 | 파일 | 내용 |
|--------|------|------|
| `/contact` | [`contact.md`](./contact.md) | 문의 유형·폼 필드·연락처·거점 |
| `/support` | [`support.md`](./support.md) | Quick Access·FAQ·기술지원·자료실 |

## Legal (준비 중)
| 라우트 | 파일 | 내용 |
|--------|------|------|
| `/privacy` | [`privacy.md`](./privacy.md) | 개인정보처리방침 — *현재 "준비 중" 안내만* |
| `/terms` | [`terms.md`](./terms.md) | 이용약관 — *현재 "준비 중" 안내만* |

---

### 참고 (콘텐츠 점검 메모)
- **노출 이메일 불일치**: `contact`·`support`엔 `ax.excorp@gmail.com`(= `site.contact.email`)가, `privacy`/`terms` 안내문엔 `soson@excorp.kr`이 표기됨 — 공개용 대표 이메일 통일 검토 필요.
- **법무 문서 미작성**: `/privacy`·`/terms`는 본문 없이 "준비 중"만 렌더 → 법무 검토 후 게시 예정.
- **Work·Numbers 수치**: 검증된 실적이 아닌 활용 시나리오·기대 효과(정직성 규칙).
