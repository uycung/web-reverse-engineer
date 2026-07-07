import React from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e3ded5] bg-[#faf8f5]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-6">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#596547]/25 bg-[#596547]/10">
            <Terminal className="h-4 w-4 text-[#596547]" />
          </div>
          <span className="font-black tracking-normal text-[#1c1b1a]">CleanRoom Labs</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[#595754] md:flex">
          <Link href="/#methodology" className="hover:text-[#1c1b1a] transition-colors">Methodology</Link>
          <Link href="/#demos" className="hover:text-[#1c1b1a] transition-colors">Demos</Link>
          <Link href="/#ethics" className="hover:text-[#1c1b1a] transition-colors">Guardrails</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/sample"
            className="inline-flex items-center gap-2 rounded-full border border-[#d6d0c2] bg-white/70 px-4 py-2 text-xs font-bold text-[#1c1b1a] transition hover:border-[#596547]/50 hover:text-[#596547] active:scale-[0.98]"
          >
            <span>Baseline</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
