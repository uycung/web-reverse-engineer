'use client';

import { useEffect, useRef } from 'react';

type Band = {
  anchorX: number;
  anchorY: number;
  width: number;
  height: number;
  rotate: number;
  speed: number;
  phase: number;
  colors: [string, string, string];
};

type Panel = {
  anchorX: number;
  anchorY: number;
  width: number;
  height: number;
  rotate: number;
  speed: number;
  alpha: number;
};

const bands: Band[] = [
  {
    anchorX: 0.12,
    anchorY: 0.16,
    width: 0.72,
    height: 0.3,
    rotate: -0.42,
    speed: 0.42,
    phase: 0,
    colors: ['rgba(214, 151, 35, 0)', 'rgba(214, 151, 35, 0.62)', 'rgba(147, 76, 201, 0)'],
  },
  {
    anchorX: 0.58,
    anchorY: 0.2,
    width: 0.54,
    height: 0.2,
    rotate: 0.58,
    speed: 0.34,
    phase: 2.1,
    colors: ['rgba(87, 102, 62, 0)', 'rgba(87, 102, 62, 0.44)', 'rgba(214, 151, 35, 0)'],
  },
  {
    anchorX: 0.18,
    anchorY: 0.78,
    width: 0.8,
    height: 0.22,
    rotate: 0.28,
    speed: 0.28,
    phase: 4.6,
    colors: ['rgba(147, 76, 201, 0)', 'rgba(147, 76, 201, 0.38)', 'rgba(214, 151, 35, 0)'],
  },
];

const panels: Panel[] = [
  { anchorX: 0.62, anchorY: 0.23, width: 0.24, height: 0.24, rotate: -0.18, speed: 0.18, alpha: 0.5 },
  { anchorX: 0.76, anchorY: 0.48, width: 0.16, height: 0.2, rotate: 0.22, speed: 0.22, alpha: 0.35 },
  { anchorX: 0.23, anchorY: 0.55, width: 0.18, height: 0.15, rotate: -0.28, speed: 0.16, alpha: 0.28 },
  { anchorX: 0.52, anchorY: 0.82, width: 0.2, height: 0.14, rotate: 0.16, speed: 0.24, alpha: 0.3 },
];

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function JoinClydeBackgroundField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let scrollY = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = 160;
    noiseCanvas.height = 160;
    const noiseCtx = noiseCanvas.getContext('2d');
    if (noiseCtx) {
      const imageData = noiseCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const value = 24 + Math.floor(Math.random() * 34);
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 18;
      }
      noiseCtx.putImageData(imageData, 0, 0);
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawBand = (band: Band, time: number, index: number) => {
      const driftX = Math.sin(time * band.speed + band.phase) * width * 0.06 + mouseX * 0.018;
      const driftY =
        Math.cos(time * (band.speed * 0.74) + band.phase) * height * 0.045 -
        (scrollY % height) * 0.035 +
        mouseY * 0.015;
      const x = width * band.anchorX + driftX;
      const y = height * band.anchorY + driftY;
      const bandWidth = Math.max(width, height) * band.width;
      const bandHeight = Math.max(width, height) * band.height;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(band.rotate + Math.sin(time * 0.14 + index) * 0.08);
      ctx.scale(1, 0.72 + Math.sin(time * 0.26 + band.phase) * 0.08);
      ctx.filter = 'blur(34px)';
      ctx.globalCompositeOperation = 'screen';

      const gradient = ctx.createLinearGradient(-bandWidth / 2, 0, bandWidth / 2, 0);
      gradient.addColorStop(0, band.colors[0]);
      gradient.addColorStop(0.5, band.colors[1]);
      gradient.addColorStop(1, band.colors[2]);

      ctx.fillStyle = gradient;
      roundedRectPath(ctx, -bandWidth / 2, -bandHeight / 2, bandWidth, bandHeight, bandHeight / 2);
      ctx.fill();
      ctx.restore();
    };

    const drawPanel = (panel: Panel, time: number, index: number) => {
      const panelWidth = Math.max(160, width * panel.width);
      const panelHeight = Math.max(120, height * panel.height);
      const x =
        width * panel.anchorX +
        Math.sin(time * panel.speed + index) * width * 0.035 +
        mouseX * 0.012;
      const y =
        height * panel.anchorY +
        Math.cos(time * (panel.speed * 0.8) + index * 1.4) * height * 0.03 -
        scrollY * 0.018 +
        mouseY * 0.01;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(panel.rotate + Math.sin(time * 0.18 + index) * 0.04);
      ctx.globalCompositeOperation = 'screen';
      ctx.shadowColor = `rgba(214, 151, 35, ${panel.alpha})`;
      ctx.shadowBlur = 36;
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(255, 226, 168, ${0.16 + panel.alpha * 0.12})`;
      ctx.fillStyle = `rgba(255, 236, 187, ${0.025 + panel.alpha * 0.025})`;
      roundedRectPath(ctx, -panelWidth / 2, -panelHeight / 2, panelWidth, panelHeight, 26);
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(255, 236, 187, 0.08)';
      for (let i = 1; i < 4; i += 1) {
        const inset = i * 18;
        roundedRectPath(
          ctx,
          -panelWidth / 2 + inset,
          -panelHeight / 2 + inset,
          panelWidth - inset * 2,
          panelHeight - inset * 2,
          18,
        );
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawGrid = (time: number) => {
      ctx.save();
      ctx.globalAlpha = 0.09;
      ctx.strokeStyle = 'rgba(255, 238, 202, 0.22)';
      ctx.lineWidth = 1;
      const spacing = 84;
      const offset = reducedMotion ? 0 : (time * 10) % spacing;
      for (let x = -spacing + offset; x < width + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + scrollY * 0.02, height);
        ctx.stroke();
      }
      for (let y = -spacing; y < height + spacing; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y + offset * 0.35);
        ctx.lineTo(width, y + offset * 0.35);
        ctx.stroke();
      }
      ctx.restore();
    };

    const render = () => {
      const time = reducedMotion ? 0.9 : performance.now() * 0.00034;
      ctx.clearRect(0, 0, width, height);

      const base = ctx.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, '#080604');
      base.addColorStop(0.48, '#0d0907');
      base.addColorStop(1, '#11130c');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      drawGrid(time);
      bands.forEach((band, index) => drawBand(band, time, index));
      panels.forEach((panel, index) => drawPanel(panel, time, index));

      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      const shade = ctx.createLinearGradient(0, 0, 0, height);
      shade.addColorStop(0, 'rgba(0, 0, 0, 0.02)');
      shade.addColorStop(0.54, 'rgba(0, 0, 0, 0.28)');
      shade.addColorStop(1, 'rgba(0, 0, 0, 0.56)');
      ctx.fillStyle = shade;
      ctx.fillRect(0, 0, width, height);

      const pattern = ctx.createPattern(noiseCanvas, 'repeat');
      if (pattern) {
        ctx.globalAlpha = 0.44;
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.restore();

      if (!reducedMotion) {
        frame = requestAnimationFrame(render);
      }
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX += (event.clientX - width / 2 - mouseX) * 0.12;
      mouseY += (event.clientY - height / 2 - mouseY) * 0.12;
    };

    resize();
    render();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full bg-[#080604] pointer-events-none"
    />
  );
}
