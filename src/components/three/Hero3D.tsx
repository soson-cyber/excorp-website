"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/*
  Hero3D — self-contained, minimal Three.js scene (raw three, no R3F).

  Composition (tasteful / technical, not flashy):
   - a slowly auto-rotating WIREFRAME icosahedron (detail 1) via EdgesGeometry
   - a subtle Points cloud at its vertices
   - a larger, counter-rotating faint outer icosahedron for depth

  Behaviour:
   - transparent renderer (alpha:true) so the pale stage shows through
   - DPR capped at 2, ResizeObserver keeps the canvas sized to its parent
   - prefers-reduced-motion → render a single static frame (no rAF loop)
   - full cleanup on unmount

  Decorative only — aria-hidden is applied by the wrapping element.
*/

const ACCENT = 0x5e2ec0;

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setClearColor(0x000000, 0); // fully transparent
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    // ── Core: wireframe icosahedron (edges) ──────────────────────────────
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const coreEdges = new THREE.EdgesGeometry(coreGeo);
    const coreLineMat = new THREE.LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.55,
    });
    const core = new THREE.LineSegments(coreEdges, coreLineMat);
    scene.add(core);

    // ── Vertex points cloud (subtle) ─────────────────────────────────────
    const pointsMat = new THREE.PointsMaterial({
      color: ACCENT,
      size: 0.045,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(coreGeo, pointsMat);
    scene.add(points);

    // ── Outer faint icosahedron (depth, counter-rotates) ─────────────────
    const outerGeo = new THREE.IcosahedronGeometry(2.35, 1);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerLineMat = new THREE.LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.14,
    });
    const outer = new THREE.LineSegments(outerEdges, outerLineMat);
    scene.add(outer);

    // ── Sizing ───────────────────────────────────────────────────────────
    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const renderFrame = () => renderer.render(scene, camera);

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      core.rotation.y += 0.0024;
      core.rotation.x += 0.0011;
      points.rotation.copy(core.rotation);
      outer.rotation.y -= 0.0014;
      outer.rotation.z += 0.0007;
      renderFrame();
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) renderFrame(); // keep the static frame correct on resize
    });
    ro.observe(container);

    if (reduceMotion) {
      renderFrame(); // single static frame, no loop
    } else {
      animate();
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      ro.disconnect();
      coreGeo.dispose();
      coreEdges.dispose();
      coreLineMat.dispose();
      pointsMat.dispose();
      outerGeo.dispose();
      outerEdges.dispose();
      outerLineMat.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
}
