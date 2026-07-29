'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const rotRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const employees = [
      { label: 'Finance AI', abbr: 'FIN', orbitRx: 155, orbitRy: 48, speed: 0.007, angle: 0, color: '#2563eb' },
      { label: 'HR AI', abbr: 'HR', orbitRx: 195, orbitRy: 62, speed: 0.005, angle: Math.PI * 0.65, color: '#0d9488' },
      { label: 'Sales AI', abbr: 'SLS', orbitRx: 220, orbitRy: 72, speed: 0.006, angle: Math.PI * 1.3, color: '#2563eb' },
      { label: 'Dev AI', abbr: 'DEV', orbitRx: 170, orbitRy: 54, speed: 0.008, angle: Math.PI * 1.9, color: '#0ea5e9' },
    ];

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const r = Math.min(W, H) * 0.27;

      rotRef.current += 0.1;

      // Soft shadow under globe
      const shadow = ctx.createRadialGradient(cx, cy + r * 0.9, 0, cx, cy + r * 0.9, r * 0.7);
      shadow.addColorStop(0, 'rgba(37,99,235,0.08)');
      shadow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.ellipse(cx, cy + r * 0.85, r * 0.65, r * 0.18, 0, 0, Math.PI * 2);
      ctx.fillStyle = shadow;
      ctx.fill();

      // Orbit rings (back half, draw before globe)
      ctx.save();
      ctx.setLineDash([3, 6]);
      ctx.lineWidth = 0.8;
      for (const e of employees) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, e.orbitRx, e.orbitRy, 0, Math.PI, Math.PI * 2);
        ctx.strokeStyle = e.color + '28';
        ctx.stroke();
      }
      ctx.restore();

      // Globe body
      const bodyGrad = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, 0, cx, cy, r);
      bodyGrad.addColorStop(0, '#f0f6ff');
      bodyGrad.addColorStop(0.5, '#e8f2ff');
      bodyGrad.addColorStop(1, '#d4e8ff');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Globe border
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(37,99,235,0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Latitude lines
      for (let lat = -70; lat <= 70; lat += 20) {
        const latR = (lat * Math.PI) / 180;
        const rr = r * Math.cos(latR);
        const yy = cy + r * Math.sin(latR);
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(cx, yy, rr, rr * 0.28, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(37,99,235,0.06)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.restore();
      }

      // Longitude lines
      for (let lng = 0; lng < 180; lng += 22) {
        const lngR = ((lng + rotRef.current) * Math.PI) / 180;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * Math.abs(Math.cos(lngR)), r, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(37,99,235,${Math.abs(Math.cos(lngR)) * 0.1})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Node dots on globe
      const nodes = [
        [cx + r * 0.12, cy - r * 0.15],
        [cx - r * 0.28, cy - r * 0.08],
        [cx + r * 0.32, cy + r * 0.18],
        [cx - r * 0.12, cy + r * 0.28],
        [cx + r * 0.02, cy - r * 0.35],
      ];
      for (const [nx, ny] of nodes) {
        ctx.beginPath();
        ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#2563eb';
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
        // Pulse ring
        ctx.beginPath();
        ctx.arc(nx, ny, 6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(37,99,235,0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Highlight on globe
      const shine = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r);
      shine.addColorStop(0, 'rgba(255,255,255,0.5)');
      shine.addColorStop(0.4, 'rgba(255,255,255,0.15)');
      shine.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = shine;
      ctx.fill();

      // Front orbit rings
      ctx.save();
      ctx.setLineDash([3, 6]);
      ctx.lineWidth = 0.8;
      for (const e of employees) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, e.orbitRx, e.orbitRy, 0, 0, Math.PI);
        ctx.strokeStyle = e.color + '40';
        ctx.stroke();
      }
      ctx.restore();

      // Employee avatars
      for (const e of employees) {
        e.angle += e.speed;
        const ex = cx + e.orbitRx * Math.cos(e.angle);
        const ey = cy + e.orbitRy * Math.sin(e.angle);
        const depth = Math.sin(e.angle);
        const alpha = Math.max(0.25, (depth + 1.5) / 2.5);

        ctx.save();
        ctx.globalAlpha = alpha;

        // Shadow
        const glow = ctx.createRadialGradient(ex, ey, 0, ex, ey, 24);
        glow.addColorStop(0, e.color + '30');
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(ex, ey, 24, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Circle
        ctx.beginPath();
        ctx.arc(ex, ey, 17, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ex, ey, 17, 0, Math.PI * 2);
        ctx.strokeStyle = e.color + '50';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = `600 8.5px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = e.color;
        ctx.fillText(e.abbr, ex, ey);

        ctx.restore();
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </motion.div>
  );
}
