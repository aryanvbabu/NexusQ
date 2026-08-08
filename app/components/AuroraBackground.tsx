"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  base: number;
  hue: number;
  phase: number;
  layer: number; // 0 far / 1 mid / 2 near
};

type Props = {
  /** Fill the viewport and stay fixed while scrolling */
  fullPage?: boolean;
};

/**
 * Live interactive starfield + soft aurora.
 * Canvas is pointer-events-none; pointer tracking uses window events.
 */
export default function AuroraBackground({ fullPage = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;

    const pointer = { x: 0.5, y: 0.35, tx: 0.5, ty: 0.35, active: false };
    const particles: Particle[] = [];

    // Dense starfield — still capped on mobile for performance
    const particleCount = reduceMotion
      ? 48
      : isMobile
        ? 110
        : 220;

    const resize = () => {
      if (fullPage) {
        width = window.innerWidth;
        height = window.innerHeight;
      } else {
        const parent = canvas.parentElement;
        if (!parent) return;
        width = parent.clientWidth;
        height = parent.clientHeight;
      }

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        for (let i = 0; i < particleCount; i++) {
          const layer = Math.random() < 0.55 ? 0 : Math.random() < 0.7 ? 1 : 2;
          const r =
            layer === 0
              ? 0.35 + Math.random() * 0.7
              : layer === 1
                ? 0.7 + Math.random() * 1.4
                : 1.1 + Math.random() * 2.0;
          const speed = layer === 0 ? 0.12 : layer === 1 ? 0.22 : 0.35;
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed,
            r,
            base: r,
            hue: Math.random() > 0.78 ? 48 : 185 + Math.random() * 35,
            phase: Math.random() * Math.PI * 2,
            layer,
          });
        }
      } else {
        // Keep stars in bounds after resize
        for (const p of particles) {
          p.x = Math.min(width, Math.max(0, p.x));
          p.y = Math.min(height, Math.max(0, p.y));
        }
      }
    };

    const onPointer = (clientX: number, clientY: number, active: boolean) => {
      pointer.tx = clientX / Math.max(1, window.innerWidth);
      pointer.ty = clientY / Math.max(1, window.innerHeight);
      pointer.active = active;
    };

    const onMove = (e: PointerEvent) => onPointer(e.clientX, e.clientY, true);
    const onLeave = () => {
      pointer.active = false;
      pointer.tx = 0.5;
      pointer.ty = 0.35;
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      onPointer(e.touches[0].clientX, e.touches[0].clientY, true);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave);

    let t = 0;

    const draw = () => {
      if (!running) return;
      raf = requestAnimationFrame(draw);
      t += reduceMotion ? 0.004 : 0.012;

      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      const px = pointer.x * width;
      const py = pointer.y * height;

      ctx.clearRect(0, 0, width, height);

      // Soft interactive glow
      const glowR = (pointer.active ? 260 : 180) * (isMobile ? 0.7 : 1);
      const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR);
      glow.addColorStop(
        0,
        pointer.active ? "rgba(34,211,238,0.2)" : "rgba(34,211,238,0.09)"
      );
      glow.addColorStop(0.45, "rgba(56,189,248,0.05)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Drifting aurora washes
      const ax = width * (0.5 + Math.sin(t * 0.32) * 0.2);
      const ay = height * (0.3 + Math.cos(t * 0.26) * 0.12);
      const wash = ctx.createRadialGradient(ax, ay, 0, ax, ay, width * 0.5);
      wash.addColorStop(0, "rgba(16,185,129,0.07)");
      wash.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      const bx = width * (0.25 + Math.cos(t * 0.22) * 0.15);
      const by = height * (0.55 + Math.sin(t * 0.19) * 0.12);
      const wash2 = ctx.createRadialGradient(bx, by, 0, bx, by, width * 0.4);
      wash2.addColorStop(0, "rgba(56,189,248,0.06)");
      wash2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = wash2;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        if (!reduceMotion) {
          if (pointer.active && p.layer > 0) {
            const dx = px - p.x;
            const dy = py - p.y;
            const dist = Math.hypot(dx, dy) || 1;
            const force = Math.min(0.05, 32 / dist) * (p.layer * 0.45);
            p.vx += (dx / dist) * force * 0.07;
            p.vy += (dy / dist) * force * 0.07;
          }

          p.vx += Math.sin(t * (0.8 + p.layer * 0.3) + p.phase) * 0.004;
          p.vy += Math.cos(t * (0.7 + p.layer * 0.25) + p.phase) * 0.004;
          p.vx *= 0.986;
          p.vy *= 0.986;
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -12) p.x = width + 12;
          if (p.x > width + 12) p.x = -12;
          if (p.y < -12) p.y = height + 12;
          if (p.y > height + 12) p.y = -12;
        }

        const twinkle =
          p.base * (0.55 + Math.sin(t * (1.8 + p.layer) + p.phase) * 0.45);
        const near =
          1 -
          Math.min(1, Math.hypot(p.x - px, p.y - py) / (isMobile ? 200 : 280));
        const alpha =
          (p.layer === 0 ? 0.25 : p.layer === 1 ? 0.4 : 0.55) +
          near * (pointer.active ? 0.45 : 0.2);

        ctx.beginPath();
        ctx.fillStyle =
          p.hue > 100
            ? `rgba(186, 230, 253, ${alpha})`
            : `rgba(253, 224, 71, ${alpha * 0.95})`;
        ctx.arc(p.x, p.y, Math.max(0.4, twinkle), 0, Math.PI * 2);
        ctx.fill();

        if (p.layer === 2 && (!isMobile || pointer.active)) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(125, 211, 252, ${alpha * 0.2})`;
          ctx.arc(p.x, p.y, twinkle * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!isMobile && !reduceMotion && pointer.active) {
        ctx.lineWidth = 0.55;
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i];
          if (a.layer === 0) continue;
          const da = Math.hypot(a.x - px, a.y - py);
          if (da > 130) continue;
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j];
            if (b.layer === 0) continue;
            const db = Math.hypot(b.x - px, b.y - py);
            if (db > 130) continue;
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d > 85) continue;
            ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 85) * 0.16})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
    };
  }, [fullPage]);

  return (
    <div
      aria-hidden
      className={
        fullPage
          ? "pointer-events-none fixed inset-0 z-0 overflow-hidden"
          : "pointer-events-none absolute inset-0 overflow-hidden"
      }
    >
      <div className="nq-aurora-ribbon nq-aurora-a" />
      <div className="nq-aurora-ribbon nq-aurora-b" />
      <div className="nq-aurora-ribbon nq-aurora-c" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
