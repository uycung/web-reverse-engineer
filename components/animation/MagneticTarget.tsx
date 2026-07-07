'use client';

import React, { ReactNode, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

type MagneticTargetProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  rotate?: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function MagneticTarget({
  children,
  className = '',
  strength = 14,
  rotate = 2,
}: MagneticTargetProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 22, mass: 0.45 });
  const y = useSpring(rawY, { stiffness: 220, damping: 22, mass: 0.45 });
  const rotateZ = useTransform(x, [-strength, strength], [-rotate, rotate]);

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType !== 'mouse') return;

    const rect = targetRef.current?.getBoundingClientRect();
    if (!rect) return;

    const distanceX = event.clientX - (rect.left + rect.width / 2);
    const distanceY = event.clientY - (rect.top + rect.height / 2);
    const normalizedX = distanceX / (rect.width / 2 || 1);
    const normalizedY = distanceY / (rect.height / 2 || 1);

    rawX.set(clamp(normalizedX, -1, 1) * strength);
    rawY.set(clamp(normalizedY, -1, 1) * strength);
  };

  return (
    <motion.div
      ref={targetRef}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={shouldReduceMotion ? undefined : { x, y, rotateZ }}
    >
      {children}
    </motion.div>
  );
}
