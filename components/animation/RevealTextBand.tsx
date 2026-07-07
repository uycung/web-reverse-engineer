'use client';

import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealLineProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
  revealOnMount?: boolean;
};

type MarqueeBandProps = {
  items: string[];
  className?: string;
  reverse?: boolean;
  duration?: number;
};

export function RevealLine({
  children,
  className = '',
  innerClassName = '',
  delay = 0,
  revealOnMount = false,
}: RevealLineProps) {
  const shouldReduceMotion = useReducedMotion();
  const initial = { y: '112%', opacity: 0.4 };
  const visible = { y: '0%', opacity: 1 };

  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className={`block ${innerClassName}`}
        initial={initial}
        animate={revealOnMount ? visible : undefined}
        whileInView={revealOnMount ? undefined : visible}
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.72,
          delay: shouldReduceMotion ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function MarqueeBand({
  items,
  className = '',
  reverse = false,
  duration = 18,
}: MarqueeBandProps) {
  const shouldReduceMotion = useReducedMotion();
  const content = [...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex min-w-max items-center"
        animate={shouldReduceMotion ? undefined : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 1].map((group) => (
          <div key={group} className="inline-flex items-center">
            {content.map((item, index) => (
              <span
                key={`${group}-${item}-${index}`}
                className="mx-5 inline-flex items-center gap-5 font-serif text-[clamp(3.5rem,13vw,10rem)] font-black uppercase leading-none tracking-[0em]"
              >
                {item}
                <span className="h-5 w-5 rounded-full bg-current opacity-70" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
