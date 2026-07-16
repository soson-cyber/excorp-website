import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

test("production releases are manual, fail closed, and approval-gated", async () => {
  const workflow = await source("../.github/workflows/production-release.yml");
  assert.match(workflow, /workflow_dispatch:/);
  assert.doesNotMatch(workflow, /\n\s+push:/);
  assert.doesNotMatch(workflow, /\n\s+pull_request:/);
  assert.match(workflow, /permissions:\s*\n\s+contents: read/);
  assert.match(workflow, /environment:\s*\n\s+name: production/);
  assert.match(workflow, /PRODUCTION_RELEASE_ENABLED/);
  assert.match(workflow, /needs:\s*verify/);
});

test("the verified artifact, not a rebuild, is deployed and then smoke-tested", async () => {
  const workflow = await source("../.github/workflows/production-release.yml");
  assert.match(workflow, /actions\/upload-artifact@[0-9a-f]{40}/);
  assert.match(workflow, /include-hidden-files:\s*true/);
  assert.match(workflow, /actions\/download-artifact@[0-9a-f]{40}/);
  assert.match(workflow, /npx --no-install opennextjs-cloudflare deploy/);
  assert.doesNotMatch(workflow, /npm run cf:deploy/);
  assert.match(workflow, /node \.release-control\/cf-purge\.mjs/);
  assert.match(workflow, /node \.release-control\/verify-release\.mjs/);
});

test("release governance policy runs on pull requests", async () => {
  const ci = await source("../.github/workflows/release-governance-ci.yml");
  assert.match(ci, /pull_request:/);
  assert.match(ci, /permissions:\s*\n\s*contents:\s*read/);
  assert.match(ci, /node --test scripts\/release-governance\.test\.mjs/);
  assert.doesNotMatch(ci, /uses:\s*actions\/[^@\s]+@v\d/);
});

test("repository ownership and dependency updates remain reviewable", async () => {
  const [owners, dependabot] = await Promise.all([
    source("../.github/CODEOWNERS"),
    source("../.github/dependabot.yml"),
  ]);
  assert.match(owners, /^\*\s+@soson-cyber/m);
  assert.match(owners, /^\/\.github\/\s+@soson-cyber/m);
  assert.match(dependabot, /package-ecosystem:\s*"npm"/);
  assert.match(dependabot, /package-ecosystem:\s*"github-actions"/);
  assert.match(dependabot, /interval:\s*"weekly"/);
  assert.match(dependabot, /open-pull-requests-limit:\s*5/);
});

test("release selection is pinned to a full commit on main and documents rollback", async () => {
  const [workflow, runbook] = await Promise.all([
    source("../.github/workflows/production-release.yml"),
    source("../docs/release-runbook.md"),
  ]);
  assert.match(workflow, /commit_sha:/);
  assert.match(workflow, /\^\[0-9a-f\]\{40\}\$/);
  assert.match(workflow, /merge-base --is-ancestor/);
  assert.match(runbook, /branch protection/i);
  assert.match(runbook, /required reviewer/i);
  assert.match(runbook, /rollback/i);
  assert.match(runbook, /운영 배포 금지/);
});
