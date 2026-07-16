#!/usr/bin/env node

const rawBaseUrl = process.argv[2] ?? process.env.RELEASE_BASE_URL;
if (!rawBaseUrl) {
  console.error("Usage: node scripts/verify-release.mjs https://example.com");
  process.exit(2);
}

const baseUrl = new URL(rawBaseUrl);
if (!['https:', 'http:'].includes(baseUrl.protocol)) {
  console.error("Release URL must use HTTP or HTTPS");
  process.exit(2);
}

const checks = [
  { path: '/', contentType: 'text/html', contains: '<title>' },
  { path: '/en', contentType: 'text/html', contains: '<html' },
  { path: '/contact', contentType: 'text/html', contains: '문의' },
  { path: '/sitemap.xml', contentType: 'application/xml', contains: '<urlset' },
];

let failed = false;
for (const check of checks) {
  const url = new URL(check.path, baseUrl);
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'cache-control': 'no-cache', 'user-agent': 'EX-Release-Verification/1.0' },
    });
    const contentType = response.headers.get('content-type') ?? '';
    const body = await response.text();
    const ok = response.status === 200 && contentType.includes(check.contentType) && body.includes(check.contains);
    console.log(`${ok ? 'PASS' : 'FAIL'} ${check.path} status=${response.status} type=${contentType}`);
    failed ||= !ok;
  } catch (error) {
    console.error(`FAIL ${check.path} ${error instanceof Error ? error.message : String(error)}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('Production smoke verification passed.');
