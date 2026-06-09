import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

// Cloudflare(OpenNext): 로컬 `next dev`에서도 Cloudflare 바인딩(R2 등)을 쓸 수 있게 초기화.
// 빌드/배포는 `npm run cf:build` / `npm run cf:deploy`(opennextjs-cloudflare) 사용.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
void initOpenNextCloudflareForDev();
