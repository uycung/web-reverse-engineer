'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type PointerEyesProps = {
  className?: string;
};

function resetEyes(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-field-eye]').forEach((eye) => {
    eye.style.transform = 'rotate(0deg)';
  });
  root.querySelectorAll<HTMLElement>('[data-field-pupil]').forEach((pupil) => {
    pupil.style.transform = 'translate3d(0, 0, 0)';
  });
}

export default function PointerEyes({ className = '' }: PointerEyesProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || shouldReduceMotion) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    let frame = 0;

    const updateEyes = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.querySelectorAll<HTMLElement>('[data-field-eye]').forEach((eye) => {
          const rect = eye.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
          const distance = Math.min(
            16,
            Math.hypot(event.clientX - centerX, event.clientY - centerY) / 18,
          );
          const pupil = eye.querySelector<HTMLElement>('[data-field-pupil]');

          eye.style.transform = `rotate(${angle * 0.08}rad)`;
          if (pupil) {
            pupil.style.transform = `translate3d(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px, 0)`;
          }
        });
      });
    };
    const handlePointerLeave = () => resetEyes(root);

    window.addEventListener('pointermove', updateEyes);
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', updateEyes);
      window.removeEventListener('pointerleave', handlePointerLeave);
      resetEyes(root);
    };
  }, [shouldReduceMotion]);

  return (
    <div ref={rootRef} className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <div className="relative mx-auto grid w-full max-w-[360px] grid-cols-2 items-center gap-5">
        {[0, 1].map((index) => (
          <div
            key={index}
            data-field-eye
            className="relative aspect-square rounded-full border border-[#1c1b1a]/15 bg-[#f7f2e7] shadow-[inset_0_0_0_10px_rgba(89,101,71,0.08),0_26px_60px_rgba(28,27,26,0.12)] transition-transform duration-150 ease-out"
          >
            <div className="absolute inset-[18%] rounded-full bg-[#1c1b1a]" />
            <div
              data-field-pupil
              className="absolute left-1/2 top-1/2 flex h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#d5f05f] text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#1c1b1a] transition-transform duration-150 ease-out"
            >
              FS
            </div>
            <div className="absolute left-[18%] top-[17%] h-4 w-4 rounded-full bg-white/80 blur-[1px]" />
          </div>
        ))}

        <div className="absolute -left-3 top-8 h-7 w-7 rotate-12 rounded-sm border border-[#1c1b1a]/20 bg-[#596547]/90 shadow-sm" />
        <div className="absolute -right-4 bottom-7 h-9 w-9 -rotate-12 rounded-sm border border-[#1c1b1a]/15 bg-[#b85d3b]/90 shadow-sm" />
      </div>
    </div>
  );
}
