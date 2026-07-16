import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("./cf-purge.mjs", import.meta.url));

test("exits cleanly when cache purge credentials are unavailable", () => {
  const env = {
    ...process.env,
    CLOUDFLARE_ENV_FILE: join(tmpdir(), `excorp-missing-${randomUUID()}.env`),
  };
  delete env.CLOUDFLARE_ZONE_ID;
  delete env.CLOUDFLARE_CACHE_TOKEN;

  const result = spawnSync(process.execPath, [script], { encoding: "utf8", env });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /퍼지 생략/);
});
