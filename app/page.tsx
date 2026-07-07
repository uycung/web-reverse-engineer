import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  Layers,
  Search,
  Settings,
  ShieldAlert,
} from 'lucide-react';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { getImplementedDemos } from '@/lib/demo-index';

const steps = [
  {
    icon: <Search className="h-5 w-5" />,
    title: 'Inspect',
    description:
      'Capture runtime metadata, viewport evidence, resource maps, and canvas or WebGL signals before drawing conclusions.',
  },
  {
    icon: <Eye className="h-5 w-5" />,
    title: 'Deconstruct',
    description:
      'Separate static styling from motion systems, scroll orchestration, blend modes, masks, and procedural render loops.',
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: 'Abstract',
    description:
      'Turn observations into implementation-neutral principles: rhythm, density, velocity, contrast, and interaction rules.',
  },
  {
    icon: <Settings className="h-5 w-5" />,
    title: 'Rebuild',
    description:
      'Write original React and browser API code tuned to the local product, assets, palette, and accessibility constraints.',
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: 'Differentiate',
    description:
      'Document what changed: brand, layout, copy, timing, color, and technical mechanics stay intentionally distinct.',
  },
];

export default function HomePage() {
  const routes = getImplementedDemos();
  const activeDemoCount = routes.length;

  return (
    <div className="min-h-screen bg-[#050604] text-zinc-100 selection:bg-emerald-300/25 selection:text-emerald-50">
      <Header />

      <main className="w-full overflow-x-hidden">
        <section className="relative mx-auto max-w-[1400px] px-5 pb-24 pt-14 sm:px-6 md:pb-32 md:pt-20">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-emerald-500/12 blur-3xl" />
            <div className="absolute right-[-16rem] top-32 h-[420px] w-[420px] rounded-full bg-lime-300/10 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(360px,0.96fr)]">
            <div className="max-w-4xl">
              <p className="mb-5 inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                Clean-room reconstruction lab
              </p>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-normal text-zinc-50 sm:text-6xl lg:text-6xl 2xl:text-7xl">
                Decode the web without inheriting its source.
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
                A working portfolio for auditing modern frontends, extracting design mechanics, and rebuilding distinct demos with evidence.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#demos"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-100 px-6 py-3 text-sm font-bold text-zinc-950 transition hover:bg-white active:scale-[0.98]"
                >
                  Explore demos
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/sample"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-950/70 px-6 py-3 text-sm font-bold text-zinc-100 transition hover:border-emerald-300/50 hover:text-emerald-100 active:scale-[0.98]"
                >
                  Open baseline
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-emerald-300/10 blur-2xl" />
              <div className="overflow-hidden rounded-[1.5rem] border border-zinc-800 bg-zinc-950/90 shadow-2xl shadow-black/40">
                <div className="grid gap-4 p-4 sm:p-5">
                  <div className="overflow-hidden rounded-[1.1rem] border border-zinc-800 bg-[#080907]">
                    <Image
                      src="/assets/field-supply/hero-composition.svg"
                      alt="Field Supply baseline product composition"
                      width={960}
                      height={600}
                      priority
                      className="aspect-[16/10] h-full w-full object-cover opacity-90"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-4">
                      <p className="text-3xl font-black text-zinc-50">{activeDemoCount}</p>
                      <p className="mt-1 text-xs leading-5 text-zinc-500">
                        active demo {activeDemoCount === 1 ? 'route' : 'routes'}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
                      <p className="text-3xl font-black text-zinc-50">0</p>
                      <p className="mt-1 text-xs leading-5 text-zinc-500">baseline edits</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-100">Evidence-led workflow</p>
                        <p className="mt-1 text-xs leading-5 text-zinc-500">Audit, abstract, rebuild, then document.</p>
                      </div>
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-900 bg-zinc-950/55">
          <div className="mx-auto grid max-w-[1400px] gap-px px-5 sm:px-6 md:grid-cols-3">
            {[
              ['Route contract', 'Experiments ship under separate app routes.'],
              ['Evidence first', 'Normal screenshots and manifests support each demo.'],
              ['Original code', 'Mechanics are rebuilt from scratch, not copied.'],
            ].map(([title, body]) => (
              <div key={title} className="py-7 md:border-l md:border-zinc-900 md:px-8 md:first:border-l-0">
                <p className="text-sm font-bold text-zinc-100">{title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="demos" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-6 md:py-40">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black leading-tight tracking-normal text-zinc-50 sm:text-5xl">
              Isolated builds with a visible audit trail.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
              The homepage scans implemented demo routes in this checkout, so removed demos disappear and new demo pages are listed automatically.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="group relative flex min-h-[560px] flex-col overflow-hidden rounded-[1.5rem] border border-zinc-800 bg-zinc-950 transition duration-500 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-zinc-900 active:scale-[0.99]"
              >
                <div className="overflow-hidden border-b border-zinc-800 bg-[#080907]">
                  <Image
                    src={route.image}
                    alt=""
                    width={960}
                    height={540}
                    className="aspect-[16/9] w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-10 p-6 sm:p-8">
                  <div>
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">
                        {route.label}
                      </span>
                      <span className="font-mono text-xs text-zinc-500">{route.status}</span>
                      <span className="font-mono text-xs text-zinc-600">{route.docsStatus}</span>
                    </div>
                    <h3 className="max-w-2xl text-3xl font-black leading-tight tracking-normal text-zinc-50 sm:text-4xl">
                      {route.title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                      {route.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-mono text-xs text-zinc-500">{route.stack}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-200">
                      Open route
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="methodology" className="bg-zinc-950/65 py-28 md:py-40">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-4xl font-black leading-tight tracking-normal text-zinc-50 sm:text-5xl">
                The workflow is designed to slow down the first guess.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">
                Good reconstruction work starts with observation, then turns those observations into original, documented implementation choices.
              </p>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="group grid gap-5 rounded-[1.25rem] border border-zinc-800 bg-[#080907] p-5 transition hover:border-emerald-300/30 hover:bg-zinc-900/80 sm:grid-cols-[3rem_1fr] sm:p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200 transition group-hover:scale-105">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-zinc-50">{step.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ethics" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-6 md:py-40">
          <div className="overflow-hidden rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/[0.07]">
            <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-emerald-200">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h2 className="text-3xl font-black leading-tight tracking-normal text-zinc-50 sm:text-4xl">
                  Clean-room rules are part of the interface.
                </h2>
              </div>

              <div className="space-y-6 text-sm leading-7 text-zinc-300 sm:text-base">
                <p>
                  This workspace studies public runtime behavior, then ships brand-different implementations with original code, altered mechanics, and explicit documentation.
                </p>
                <p>
                  The neutral sample remains unchanged, reference assets are not packaged, and every demo is isolated so comparison and review stay straightforward.
                </p>
                <Link
                  href="/#demos"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-100 px-6 py-3 text-sm font-bold text-zinc-950 transition hover:bg-white active:scale-[0.98]"
                >
                  Review the builds
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
