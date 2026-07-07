'use client';

import { useEffect, useRef } from 'react';

type WaveLayer = {
  baseY: number;
  amplitude: number;
  frequency: number;
  phase: number;
  speed: number;
  colors: [string, string, string];
  alpha: number;
};

const layers: WaveLayer[] = [
  {
    baseY: 0.84,
    amplitude: 0.055,
    frequency: 1.1,
    phase: 0,
    speed: 0.85,
    colors: ['rgba(15, 76, 129, 0.88)', 'rgba(23, 158, 166, 0.86)', 'rgba(23, 184, 148, 0.86)'],
    alpha: 0.92,
  },
  {
    baseY: 0.9,
    amplitude: 0.045,
    frequency: 1.5,
    phase: 2.3,
    speed: -0.65,
    colors: ['rgba(11, 51, 84, 0.8)', 'rgba(16, 110, 116, 0.78)', 'rgba(16, 130, 104, 0.78)'],
    alpha: 0.72,
  },
  {
    baseY: 0.96,
    amplitude: 0.03,
    frequency: 1.95,
    phase: 4.6,
    speed: 0.5,
    colors: ['rgba(7, 34, 58, 0.75)', 'rgba(10, 74, 78, 0.72)', 'rgba(10, 92, 74, 0.72)'],
    alpha: 0.6,
  },
];

function waveY(layer: WaveLayer, xFrac: number, height: number, time: number) {
  const angle = xFrac * layer.frequency * Math.PI * 2 + layer.phase + time * layer.speed;
  return height * layer.baseY + Math.sin(angle) * height * layer.amplitude;
}

export default function StripeSessionsHeroWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = canvas?.parentElement;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawLayer = (layer: WaveLayer, time: number) => {
      const step = Math.max(6, Math.floor(width / 140));
      ctx.beginPath();
      ctx.moveTo(0, height + 4);
      for (let x = 0; x <= width; x += step) {
        ctx.lineTo(x, waveY(layer, x / width, height, time));
      }
      ctx.lineTo(width, waveY(layer, 1, height, time));
      ctx.lineTo(width, height + 4);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, layer.colors[0]);
      gradient.addColorStop(0.5, layer.colors[1]);
      gradient.addColorStop(1, layer.colors[2]);

      ctx.save();
      ctx.globalAlpha = layer.alpha;
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    };

    const drawCrestHighlight = (layer: WaveLayer, time: number) => {
      ctx.save();
      ctx.beginPath();
      const step = Math.max(6, Math.floor(width / 140));
      ctx.moveTo(0, waveY(layer, 0, height, time));
      for (let x = 0; x <= width; x += step) {
        ctx.lineTo(x, waveY(layer, x / width, height, time));
      }
      ctx.globalCompositeOperation = 'screen';
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255, 246, 214, 0.35)';
      ctx.filter = 'blur(2px)';
      ctx.stroke();
      ctx.restore();
    };

    const drawTravelingGlow = (time: number) => {
      const crest = layers[0];
      const glowXFrac = 0.5 + Math.sin(time * 0.32) * 0.34;
      const glowX = glowXFrac * width;
      const glowY = waveY(crest, glowXFrac, height, time);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = 'blur(24px)';
      const radius = Math.max(width, height) * 0.14;
      const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, radius);
      glow.addColorStop(0, 'rgba(255, 205, 120, 0.78)');
      glow.addColorStop(1, 'rgba(255, 205, 120, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(glowX, glowY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = (now: number) => {
      const time = reducedMotion ? 8.4 : now * 0.00025;
      ctx.clearRect(0, 0, width, height);

      layers.forEach((layer) => drawLayer(layer, time));
      drawCrestHighlight(layers[0], time);
      drawTravelingGlow(time);

      if (!reducedMotion) {
        frame = requestAnimationFrame(render);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrapper);

    resize();
    frame = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    />
  );
}
