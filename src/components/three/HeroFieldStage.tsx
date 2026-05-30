"use client";

import dynamic from "next/dynamic";

/*
  Client boundary for the WebGL hero node-field. `next/dynamic` ssr:false keeps
  three.js out of the initial bundle and off the server (uses window/document).
*/
const HeroField = dynamic(() => import("@/components/three/HeroField"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

export default function HeroFieldStage() {
  return <HeroField />;
}
