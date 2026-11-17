import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CITIES, KSA } from '../data/content.js';
import { px, py, inPoly } from './SaudiMap.jsx';
import { reducedMotion } from '../lib/format.js';

/* 3D hero: Saudi Arabia as a glowing point field with light waves from Dammam,
   beams on project cities and arcs from the head office. */
export default function HeroGL({ ar }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return undefined;
    let renderer;
    try {
      THREE.ColorManagement.enabled = false;
      renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
      renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    } catch (e) {
      return undefined; // WebGL unavailable: the gradient background still shows
    }
    const RM = reducedMotion();
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
    cam.position.set(0, -9, 15);
    cam.lookAt(0, 0, 0);
    const grp = new THREE.Group();
    scene.add(grp);

    const PP = KSA.map(([a, b]) => [px(a), py(b)]);
    const pts = [];
    for (let y = 2; y < 330; y += 4.2)
      for (let x = 2; x < 450; x += 4.2) {
        const o = (Math.round(y / 4.2) % 2) * 2.1;
        if (inPoly(x + o, y, PP)) pts.push((x + o - 225) / 20, -(y - 165) / 20, 0);
      }
    const n = pts.length / 3;
    const pos = new Float32Array(pts);
    const col = new Float32Array(n * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const c2 = document.createElement('canvas');
    c2.width = c2.height = 64;
    const x2 = c2.getContext('2d');
    const g = x2.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,.8)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    x2.fillStyle = g;
    x2.fillRect(0, 0, 64, 64);
    const dotTex = new THREE.CanvasTexture(c2);

    const mat = new THREE.PointsMaterial({ size: 0.13, map: dotTex, vertexColors: true, transparent: true, depthWrite: false, opacity: 0, blending: THREE.AdditiveBlending });
    grp.add(new THREE.Points(geo, mat));

    const toV = (c) => new THREE.Vector3((px(c[2]) - 225) / 20, -(py(c[3]) - 165) / 20, 0);
    const hqV = toV(CITIES[0]);
    const beams = [], arcs = [], glows = [];
    CITIES.forEach((c, i) => {
      const v = toV(c);
      const h = c[5] ? 3.2 : 1.2 + c[4].length * 0.35;
      const bm = new THREE.LineBasicMaterial({ color: c[5] ? 0xffffff : 0xf2cf86, transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
      const ln = new THREE.Line(new THREE.BufferGeometry().setFromPoints([v, v.clone().setZ(h)]), bm);
      ln.scale.z = 0.001;
      grp.add(ln);
      beams.push(ln);
      const sg = new THREE.Points(
        new THREE.BufferGeometry().setFromPoints([v.clone().setZ(0.02)]),
        new THREE.PointsMaterial({ size: c[5] ? 1.1 : 0.75, map: dotTex, color: c[5] ? 0xffffff : 0xd4a657, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending })
      );
      grp.add(sg);
      glows.push(sg);
      if (!c[5]) {
        const mid = hqV.clone().lerp(v, 0.5);
        mid.z = hqV.distanceTo(v) * 0.28;
        const ag = new THREE.BufferGeometry().setFromPoints(new THREE.QuadraticBezierCurve3(hqV, mid, v).getPoints(60));
        ag.setDrawRange(0, 0);
        grp.add(new THREE.Line(ag, new THREE.LineBasicMaterial({ color: 0xd4a657, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending })));
        arcs.push({ ag, d: i * 0.12 });
      }
    });
    grp.rotation.x = -0.55;

    const cBase = new THREE.Color(0x2b3f86), cHi = new THREE.Color(0xd4a657), tmp = new THREE.Color();
    let mx = 0, my = 0, tx = 0, ty = 0, raf = 0, vis = true, run = true, intro = 0;
    const t0 = performance.now();

    function size() {
      const r = cv.getBoundingClientRect();
      if (!r.width || !r.height) return;
      renderer.setSize(r.width, r.height, false);
      cam.aspect = r.width / r.height;
      cam.updateProjectionMatrix();
      const wide = r.width > 900;
      grp.position.set(wide ? (ar ? -4.6 : 4.6) : 0, wide ? 0.3 : 1.2, 0);
      grp.scale.setScalar(wide ? 0.9 : 0.72);
    }
    size();
    const onMove = (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('resize', size);

    function frame(now) {
      raf = 0;
      if (!run || !vis) return;
      const tm = (now - t0) / 1000;
      intro = Math.min(1, intro + (RM ? 1 : 0.012));
      const e = 1 - Math.pow(1 - intro, 3);
      mat.opacity = 0.95 * e;
      for (let i = 0; i < n; i++) {
        const x = pos[i * 3], y = pos[i * 3 + 1];
        const dx = x - hqV.x, dy = y - hqV.y, d = Math.sqrt(dx * dx + dy * dy);
        const w = RM ? 0 : Math.sin(d * 1.4 - tm * 1.6);
        pos[i * 3 + 2] = (w > 0.6 ? (w - 0.6) * 0.35 : 0) + (1 - e) * Math.sin(i) * 3;
        const k = Math.max(0, w - 0.55) / 0.45;
        tmp.copy(cBase).lerp(cHi, k * 0.9);
        col[i * 3] = tmp.r; col[i * 3 + 1] = tmp.g; col[i * 3 + 2] = tmp.b;
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
      beams.forEach((b, i) => { const p = Math.min(1, Math.max(0, (intro - 0.3 - i * 0.04) * 2.2)); b.scale.z = Math.max(0.001, p); b.material.opacity = p * 0.9; });
      glows.forEach((gl, i) => { const p = Math.min(1, Math.max(0, (intro - 0.25 - i * 0.04) * 2.2)); gl.material.opacity = p * (0.65 + 0.35 * Math.sin(tm * 2.4 + i)); });
      arcs.forEach((a) => { const p = Math.min(1, Math.max(0, (intro - 0.5 - a.d * 0.5) * 2.5)); a.ag.setDrawRange(0, Math.floor(61 * p)); });
      tx += (mx - tx) * 0.04;
      ty += (my - ty) * 0.04;
      grp.rotation.z = tx * 0.25 + Math.sin(tm * 0.15) * 0.04;
      grp.rotation.x = -0.55 + ty * 0.18;
      renderer.render(scene, cam);
      raf = requestAnimationFrame(frame);
    }
    const io = new IntersectionObserver((es) => {
      vis = es[0].isIntersecting;
      if (vis && run && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(cv);
    raf = requestAnimationFrame(frame);

    return () => {
      run = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', size);
      scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
      dotTex.dispose();
      renderer.dispose();
    };
  }, [ar]);

  return <canvas id="gl" ref={ref} aria-hidden="true" />;
}
