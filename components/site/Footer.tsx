import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900/80 bg-[#050604] px-5 py-12 sm:px-6">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 text-xs text-zinc-500 md:flex-row md:items-center">
        <div className="flex max-w-lg flex-col gap-2">
          <p className="font-semibold text-zinc-300">&copy; 2026 CleanRoom Labs.</p>
          <p>Technical deconstruction portfolio for ethical, documented clean-room engineering workflows.</p>
        </div>

        <div className="flex flex-wrap gap-6">
          <Link href="/#demos" className="hover:text-zinc-300 transition-colors">Demos</Link>
          <Link href="/#methodology" className="hover:text-zinc-300 transition-colors">Methodology</Link>
          <Link href="/#ethics" className="hover:text-zinc-300 transition-colors">Guardrails</Link>
          <Link href="/sample" className="hover:text-zinc-300 transition-colors">Baseline</Link>
        </div>
      </div>
    </footer>
  );
}
