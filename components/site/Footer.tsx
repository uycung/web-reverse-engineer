import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#e3ded5] bg-[#f0ede6]/55 px-5 py-12 sm:px-6">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 text-xs text-[#595754] md:flex-row md:items-center">
        <div className="flex max-w-lg flex-col gap-2">
          <p className="font-semibold text-[#1c1b1a]">&copy; 2026 CleanRoom Labs.</p>
          <p>Studying great interfaces in the open — and rebuilding them as original work.</p>
        </div>

        <div className="flex flex-wrap gap-6">
          <Link href="/#demos" className="hover:text-[#1c1b1a] transition-colors">Demos</Link>
          <Link href="/#methodology" className="hover:text-[#1c1b1a] transition-colors">Methodology</Link>
          <Link href="/#ethics" className="hover:text-[#1c1b1a] transition-colors">Guardrails</Link>
          <Link href="/sample" className="hover:text-[#1c1b1a] transition-colors">Baseline</Link>
        </div>
      </div>
    </footer>
  );
}
