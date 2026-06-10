# excorp.io → excorp.kr 랜딩 연결 가이드

excorp.io로 접속해도 현재 사이트(excorp.kr, Cloudflare Workers `excorp-website`)에 랜딩되게 하는 방법.
**권장 방식은 A(301 리다이렉트)** — 두 도메인이 같은 콘텐츠를 따로 서빙하면 검색엔진이 중복 콘텐츠로 취급해 SEO가 분산된다. canonical·sitemap·JSON-LD가 전부 excorp.kr 기준이므로 io는 kr로 모아주는 것이 맞다.

## A안 (권장) — excorp.io를 excorp.kr로 301 리다이렉트

1. **Cloudflare에 excorp.io 추가**: 대시보드 → Add a site → `excorp.io` (Free 플랜 가능) → 안내된 네임서버 2개를 도메인 등록기관(가비아/후이즈 등)에서 변경.
2. **DNS 레코드**: excorp.io zone에 더미 A 레코드 추가 — `A @ 192.0.2.1` (Proxied ☁️ 켜기), `CNAME www excorp.io` (Proxied). ※ Proxied여야 리다이렉트 룰이 동작.
3. **Redirect Rule 생성**: excorp.io zone → Rules → Redirect Rules → Create:
   - When: Hostname equals `excorp.io` OR `www.excorp.io` (Custom filter expression: `(http.host in {"excorp.io" "www.excorp.io"})`)
   - Then: Dynamic redirect, Expression `concat("https://excorp.kr", http.request.uri.path)`, Status `301`, Preserve query string ✔
4. 확인: `curl -sI https://excorp.io/xr-studio` → `301` + `location: https://excorp.kr/xr-studio`.

경로·쿼리까지 보존되므로 명함/광고에 excorp.io 딥링크를 써도 그대로 kr의 같은 페이지로 떨어진다.

## B안 — excorp.io를 워커 커스텀 도메인으로 직접 연결 (같은 사이트를 두 주소로 서빙)

1. A안의 1번처럼 excorp.io zone을 Cloudflare에 추가.
2. Workers & Pages → `excorp-website` → Settings → Domains & Routes → **Add Custom Domain** → `excorp.io`, `www.excorp.io`.
3. 이 경우 SEO 중복을 막기 위해 코드의 canonical(`SITE_URL = https://excorp.kr`)은 그대로 둘 것 — io로 들어와도 검색엔진엔 kr이 대표 주소로 잡힌다.

## 비고

- 코드 변경은 두 안 모두 불필요(`src/lib/site.ts`의 `SITE_URL`은 excorp.kr 유지).
- 메일(MX)을 excorp.io에서 쓰고 있다면 네임서버 이전 시 기존 MX/TXT 레코드를 Cloudflare DNS에 그대로 복사해야 메일이 끊기지 않는다.
- 작업 주체: Cloudflare 계정 권한 보유자(대표). 소요 ~10분 + 네임서버 전파 수 시간.
