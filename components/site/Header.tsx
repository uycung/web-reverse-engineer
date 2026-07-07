import React from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900/80 bg-[#050604]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-6">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/10">
            <Terminal className="h-4 w-4 text-emerald-200" />
          </div>
          <span className="font-black tracking-normal text-zinc-100">
            CleanRoom<span className="text-zinc-500">.labs</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-400 md:flex">
          <Link href="/#methodology" className="hover:text-zinc-200 transition-colors">Methodology</Link>
          <Link href="/#demos" className="hover:text-zinc-200 transition-colors">Demos</Link>
          <Link href="/#ethics" className="hover:text-zinc-200 transition-colors">Guardrails</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/sample"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs font-bold text-zinc-200 transition hover:border-emerald-300/40 hover:text-emerald-100 active:scale-[0.98]"
          >
            <span>Baseline</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
