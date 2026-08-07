export type EnvMap = Record<string, string | undefined>;

/**
 * 런타임 env 해석 — 시크릿을 어디서 읽을지 결정한다.
 *
 * ⚠️ Cloudflare Workers(OpenNext)에서는 시크릿이 `process.env`가 아니라
 * `getCloudflareContext().env`에 들어온다. process.env로 읽으면 런타임에 전부 undefined가 되어
 * 외부 연동이 조용히 전부 실패한다(= 뉴스가 fallback으로 표시되고, 문의가 DB에 저장 안 되던 원인).
 * - Workers 런타임: ctx.env 사용(process.env 위에 덮어씀)
 * - Node(빌드/`next dev`): process.env(.dev.vars/.env.local) 사용
 */
export async function resolveEnv(): Promise<EnvMap> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = await getCloudflareContext({ async: true });
    const cfEnv = ctx?.env as unknown as EnvMap | undefined;
    if (cfEnv && Object.keys(cfEnv).length > 0) {
      return { ...(process.env as EnvMap), ...cfEnv };
    }
  } catch {
    // 워커 컨텍스트가 아님(빌드/Node) → process.env 사용
  }
  return process.env as EnvMap;
}
