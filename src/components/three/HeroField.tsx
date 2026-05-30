"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/*
  HeroField — pointer-reactive node network for the DARK full-bleed hero.
  Additive glow on a near-black stage (the look this effect is designed for):
  nodes glow brighter near the pointer, links light up purple→mint. Camera
  parallaxes toward the pointer. Tuned values hardcoded.
  Guards: fewer nodes on touch/small screens; reduced-motion = one static frame.
  Decorative (aria-hidden); pointer events pass through from the overlay.
*/
export default function HeroField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const N = coarse || window.innerWidth < 768 ? 80 : 140;

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07070c, 0.045);
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    // soft round alpha texture (color comes from vertexColors)
    const dc = document.createElement("canvas");
    dc.width = dc.height = 64;
    const g = dc.getContext("2d")!;
    const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rg.addColorStop(0, "rgba(255,255,255,1)");
    rg.addColorStop(0.35, "rgba(255,255,255,0.85)");
    rg.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = rg;
    g.fillRect(0, 0, 64, 64);
    const dotTex = new THREE.CanvasTexture(dc);

    const FIELD = { x: 9, y: 5.2, z: 6 };
    const base = new Float32Array(N * 3);
    const phase = new Float32Array(N);
    const amp = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      base[i * 3] = (Math.random() * 2 - 1) * FIELD.x;
      base[i * 3 + 1] = (Math.random() * 2 - 1) * FIELD.y;
      base[i * 3 + 2] = (Math.random() * 2 - 1) * FIELD.z;
      phase[i] = Math.random() * Math.PI * 2;
      amp[i] = 0.1 + Math.random() * 0.18;
    }

    const pPos = new Float32Array(N * 3);
    const pCol = new Float32Array(N * 3);
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", new THREE.Float32BufferAttribute(pPos, 3));
    pointGeo.setAttribute("color", new THREE.Float32BufferAttribute(pCol, 3));
    const pointMat = new THREE.PointsMaterial({
      size: 0.16,
      map: dotTex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(pointGeo, pointMat));

    const MAX_SEG = 3200;
    const lPos = new Float32Array(MAX_SEG * 6);
    const lCol = new Float32Array(MAX_SEG * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(lPos, 3));
    lineGeo.setAttribute("color", new THREE.Float32BufferAttribute(lCol, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    const cBase = new THREE.Color(0x6f5bff);
    const cHot = new THREE.Color(0x6ff0ff);
    const cLine = new THREE.Color(0x5b4fd0);
    const tmp = new THREE.Color();
    const cursor = new THREE.Vector3();

    const ptr = { x: 0, y: 0, tx: 0, ty: 0, active: false };
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      ptr.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ptr.ty = -(((e.clientY - r.top) / r.height) * 2 - 1);
      ptr.active = true;
    };
    const onLeave = () => {
      ptr.active = false;
    };
    mount.addEventListener("pointermove", onMove);
    mount.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(() => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    ro.observe(mount);

    const clock = new THREE.Clock();
    let t = 0;
    let raf = 0;
    const influR = 3.6;
    const linkD = 2.4;
    const linkD2 = linkD * linkD;

    const ref = { seg: 0 };
    const push = (
      ax: number, ay: number, az: number,
      bx: number, by: number, bz: number,
      r: number, gg: number, b: number,
    ) => {
      if (ref.seg >= MAX_SEG) return;
      const o = ref.seg * 6;
      lPos[o] = ax; lPos[o + 1] = ay; lPos[o + 2] = az;
      lPos[o + 3] = bx; lPos[o + 4] = by; lPos[o + 5] = bz;
      lCol[o] = r; lCol[o + 1] = gg; lCol[o + 2] = b;
      lCol[o + 3] = r; lCol[o + 4] = gg; lCol[o + 5] = b;
      ref.seg++;
    };

    function frame() {
      const dt = Math.min(clock.getDelta(), 0.05);
      const mo = reduced ? 0 : 1;
      if (!reduced) t += dt;
      if (!ptr.active && !reduced) {
        ptr.tx = Math.cos(t * 0.25) * 0.55;
        ptr.ty = Math.sin(t * 0.32) * 0.4;
      }
      const ease = reduced ? 1 : 0.08;
      ptr.x += (ptr.tx - ptr.x) * ease;
      ptr.y += (ptr.ty - ptr.y) * ease;
      cursor.set(ptr.x * FIELD.x * 0.6, ptr.y * FIELD.y * 0.7, 0);

      for (let i = 0; i < N; i++) {
        const ix = i * 3;
        const x = base[ix] + Math.sin(t * 0.6 + phase[i]) * amp[i] * mo;
        const y = base[ix + 1] + Math.cos(t * 0.5 + phase[i]) * amp[i] * mo;
        const z = base[ix + 2];
        pPos[ix] = x; pPos[ix + 1] = y; pPos[ix + 2] = z;
        const dx = x - cursor.x, dy = y - cursor.y, dz = z - cursor.z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        let infl = 1 - d / influR;
        if (infl < 0) infl = 0;
        infl = infl * infl;
        const ic = Math.min(infl, 1);
        tmp.copy(cBase).lerp(cHot, ic);
        const glow = 0.55 + ic * 0.9;
        pCol[ix] = tmp.r * glow; pCol[ix + 1] = tmp.g * glow; pCol[ix + 2] = tmp.b * glow;
      }
      pointGeo.attributes.position.needsUpdate = true;
      pointGeo.attributes.color.needsUpdate = true;

      ref.seg = 0;
      for (let i = 0; i < N; i++) {
        const ix = i * 3, xi = pPos[ix], yi = pPos[ix + 1], zi = pPos[ix + 2];
        const cdx = xi - cursor.x, cdy = yi - cursor.y, cdz = zi - cursor.z;
        const cd = Math.sqrt(cdx * cdx + cdy * cdy + cdz * cdz);
        if (cd < influR) {
          const k = 1 - cd / influR;
          if (k > 0.04) {
            tmp.copy(cBase).lerp(cHot, Math.min(k, 1));
            const b = 0.8 + k;
            push(xi, yi, zi, cursor.x, cursor.y, cursor.z, tmp.r * b, tmp.g * b, tmp.b * b);
          }
        }
        for (let j = i + 1; j < N; j++) {
          const jx = j * 3;
          const dx = xi - pPos[jx], dy = yi - pPos[jx + 1], dz = zi - pPos[jx + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < linkD2) {
            const f = 1 - Math.sqrt(d2) / linkD;
            const b = f * 0.5;
            push(xi, yi, zi, pPos[jx], pPos[jx + 1], pPos[jx + 2], cLine.r * b, cLine.g * b, cLine.b * b);
          }
          if (ref.seg >= MAX_SEG) break;
        }
        if (ref.seg >= MAX_SEG) break;
      }
      lineGeo.setDrawRange(0, ref.seg * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      const px = ptr.x * 1.6, py = ptr.y * 1.0;
      camera.position.x += (px - camera.position.x) * (reduced ? 1 : 0.06);
      camera.position.y += (py - camera.position.y) * (reduced ? 1 : 0.06);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      if (!reduced) raf = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mount.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerleave", onLeave);
      pointGeo.dispose();
      lineGeo.dispose();
      pointMat.dispose();
      lineMat.dispose();
      dotTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="absolute inset-0" />;
}
