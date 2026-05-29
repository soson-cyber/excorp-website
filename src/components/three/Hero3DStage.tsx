"use client";

import dynamic from "next/dynamic";

/*
  Client boundary for the WebGL hero scene. `next/dynamic` with `{ ssr: false }`
  is only allowed inside a Client Component (Next 16), so the dynamic import
  lives here and the (server) Home renders <Hero3DStage /> directly.
  Lightweight fallback = a pale box while the chunk loads.
*/
const Hero3D = dynamic(() => import("@/components/three/Hero3D"), {
  ssr: false,
  loading: () => <div className="h-full w-full rounded-3xl bg-[#F2F4F7]" />,
});

export default function Hero3DStage() {
  return <Hero3D />;
}
