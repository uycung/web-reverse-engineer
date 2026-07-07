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
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1b1a] selection:bg-[#596547]/20 selection:text-[#1c1b1a]">
      <Header />

      <main className="w-full overflow-x-hidden">
        <section className="relative mx-auto max-w-[1400px] px-5 pb-24 pt-14 sm:px-6 md:pb-32 md:pt-20">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-[#596547]/10 blur-3xl" />
            <div className="absolute right-[-16rem] top-32 h-[420px] w-[420px] rounded-full bg-[#b85d3b]/10 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#596547]/40 to-transparent" />
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(360px,0.96fr)]">
            <div className="max-w-4xl">
              <p className="mb-5 inline-flex rounded-full border border-[#596547]/25 bg-[#596547]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#596547]">
                Clean-room engineering portfolio
              </p>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-normal text-[#1c1b1a] sm:text-6xl lg:text-6xl 2xl:text-7xl">
                Study the interface. Rebuild it clean.
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-[#595754] sm:text-lg">
                Every page here started as a study of a site worth learning from — its canvas
                loops, scroll choreography, pointer math — and ended as an original build that
                keeps the principle and leaves the source behind.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#demos"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1c1b1a] px-6 py-3 text-sm font-bold text-[#faf8f5] transition hover:bg-[#2d2c2a] active:scale-[0.98]"
                >
                  Explore demos
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/sample"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d6d0c2] bg-white/70 px-6 py-3 text-sm font-bold text-[#1c1b1a] transition hover:border-[#596547]/50 hover:text-[#596547] active:scale-[0.98]"
                >
                  Open baseline
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[#596547]/10 blur-2xl" />
              <div className="overflow-hidden rounded-[1.5rem] border border-[#e3ded5] bg-white/85 shadow-2xl shadow-[#1c1b1a]/10">
                <div className="grid gap-4 p-4 sm:p-5">
                  <div className="overflow-hidden rounded-[1.1rem] border border-[#e3ded5] bg-[#f0ede6]">
                    <Image
                      src="/assets/field-supply/hero-composition.svg"
                      alt="Field Supply baseline product composition"
                      width={960}
                      height={600}
                      priority
                      className="aspect-[16/10] h-full w-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-[#596547]/25 bg-[#596547]/[0.08] p-4">
                      <p className="text-3xl font-black text-[#1c1b1a]">{activeDemoCount}</p>
                      <p className="mt-1 text-xs leading-5 text-[#595754]">
                        reference-inspired demo {activeDemoCount === 1 ? 'route' : 'routes'}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#e3ded5] bg-[#f0ede6]/60 p-4">
                      <p className="text-3xl font-black text-[#1c1b1a]">0</p>
                      <p className="mt-1 text-xs leading-5 text-[#595754]">
                        edits to the locked baseline — by design
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#e3ded5] bg-[#f0ede6]/40 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[#1c1b1a]">Evidence-led workflow</p>
                        <p className="mt-1 text-xs leading-5 text-[#595754]">Audit, abstract, rebuild, then document.</p>
                      </div>
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#596547]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#e3ded5] bg-[#f0ede6]/55">
          <div className="mx-auto grid max-w-[1400px] gap-px px-5 sm:px-6 md:grid-cols-3">
            {[
              ['Route contract', 'Experiments ship under separate app routes.'],
              ['Evidence first', 'Normal screenshots and manifests support each demo.'],
              ['Original code', 'Every mechanism is rewritten from scratch in this codebase.'],
            ].map(([title, body]) => (
              <div key={title} className="py-7 md:border-l md:border-[#e3ded5] md:px-8 md:first:border-l-0">
                <p className="text-sm font-bold text-[#1c1b1a]">{title}</p>
                <p className="mt-2 text-sm leading-6 text-[#595754]">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="demos" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-6 md:py-40">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black leading-tight tracking-normal text-[#1c1b1a] sm:text-5xl">
              Every experiment, one untouched baseline.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#595754]">
              Each experiment restyles the same Field Supply page and ships on its own route, so
              you can flip between a demo and the baseline to see exactly what the transfer
              changed — and what it deliberately left alone.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="group relative flex min-h-[560px] flex-col overflow-hidden rounded-[1.5rem] border border-[#e3ded5] bg-white transition duration-500 hover:-translate-y-1 hover:border-[#596547]/40 hover:shadow-xl hover:shadow-[#1c1b1a]/5 active:scale-[0.99]"
              >
                <div className="overflow-hidden border-b border-[#e3ded5] bg-[#f0ede6]">
                  <Image
                    src={route.image}
                    alt={`Screenshot of the ${route.title} demo page`}
                    width={960}
                    height={600}
                    className="aspect-[16/9] w-full object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-10 p-6 sm:p-8">
                  <div>
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-[#596547]/25 bg-[#596547]/10 px-3 py-1 text-xs font-bold text-[#596547]">
                        {route.label}
                      </span>
                      <span className="font-mono text-xs text-[#8e8a82]">{route.status}</span>
                      <span className="font-mono text-xs text-[#8e8a82]">{route.docsStatus}</span>
                    </div>
                    <h3 className="max-w-2xl text-3xl font-black leading-tight tracking-normal text-[#1c1b1a] sm:text-4xl">
                      {route.title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-[#595754] sm:text-base">
                      {route.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-mono text-xs text-[#8e8a82]">{route.stack}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#596547]">
                      Open route
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="methodology" className="bg-[#f0ede6]/65 py-28 md:py-40">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-4xl font-black leading-tight tracking-normal text-[#1c1b1a] sm:text-5xl">
                Look first. Build second.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#595754]">
                It is tempting to eyeball a reference and start typing. This workflow makes
                observation the first deliverable: measure the running page, write down the
                principles behind what it does, then write original code that answers to those
                notes.
              </p>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="group grid gap-5 rounded-[1.25rem] border border-[#e3ded5] bg-white p-5 transition hover:border-[#596547]/40 hover:shadow-lg hover:shadow-[#1c1b1a]/5 sm:grid-cols-[3rem_1fr] sm:p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#596547]/25 bg-[#596547]/10 text-[#596547] transition group-hover:scale-105">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#1c1b1a]">{step.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-[#595754]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ethics" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-6 md:py-40">
          <div className="overflow-hidden rounded-[1.5rem] border border-[#596547]/25 bg-[#596547]/[0.08]">
            <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1c1b1a] text-[#faf8f5]">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h2 className="text-3xl font-black leading-tight tracking-normal text-[#1c1b1a] sm:text-4xl">
                  Clean-room rules are part of the interface.
                </h2>
              </div>

              <div className="space-y-6 text-sm leading-7 text-[#595754] sm:text-base">
                <p>
                  This workspace studies public runtime behavior, then ships brand-different
                  implementations with original code, altered mechanics, and explicit
                  documentation.
                </p>
                <p>
                  The neutral sample remains unchanged, reference assets are not packaged, and
                  every demo is isolated so comparison and review stay straightforward.
                </p>
                <Link
                  href="/#demos"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1c1b1a] px-6 py-3 text-sm font-bold text-[#faf8f5] transition hover:bg-[#2d2c2a] active:scale-[0.98]"
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
