'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  MapPin,
  Menu,
  PackageCheck,
  ShieldCheck,
  X,
} from 'lucide-react';
import JoinClydeBackgroundField from '@/components/animation/JoinClydeBackgroundField';

const navLinks = [
  { label: 'Gear', href: '#sample-products' },
  { label: 'Field Notes', href: '#sample-lifestyle' },
  { label: 'Materials', href: '#sample-materials' },
  { label: 'Baseline', href: '/sample' },
];

const products = [
  {
    id: 'transit-pack',
    title: 'Transit Pack',
    capacity: '22L',
    tag: 'DAILY EDC',
    price: '$180',
    description:
      'A low-profile daily pack with weather-resistant canvas, protected laptop storage, and exterior access that works on crowded platforms.',
    imageSrc: '/assets/field-supply/transit-pack.svg',
    specs: ['10oz Waxed Canvas', '15" Padded Laptop Sleeve', 'Dual Side Pockets'],
  },
  {
    id: 'field-pouch',
    title: 'Field Pouch',
    capacity: '2.2L',
    tag: 'ORGANIZER',
    price: '$65',
    description:
      'A compact organizer for cables, tools, chargers, notebooks, and the small things that usually disappear at the bottom of a bag.',
    imageSrc: '/assets/field-supply/field-pouch.svg',
    specs: ['YKK Weatherproof Zippers', 'Elastic Mesh Divisions', 'Webbing Grab Loops'],
  },
  {
    id: 'rolltop',
    title: 'All-Weather Rolltop',
    capacity: '28L',
    tag: 'WEEKEND TRAVEL',
    price: '$220',
    description:
      'A weekend-ready carry with sealed seams, expandable storage, and a silhouette that still feels at home in the city.',
    imageSrc: '/assets/field-supply/rolltop.svg',
    specs: ['Recycled Ripstop Shell', 'Anodized Aluminum G-Hook', 'Expandable Collar'],
  },
];

const materials = [
  {
    title: 'Waxed organic canvas',
    detail:
      'Our 10oz canvas is sourced from organic cotton fields and treated with a proprietary blend of local beeswax for weather-resistance that develops a unique patina over time.',
  },
  {
    title: 'Recycled ripstop lining',
    detail:
      'The interior is lined with 210D recycled nylon ripstop in a high-visibility contrast stone gray, making it easy to find dark items in low-light conditions.',
  },
  {
    title: 'Replaceable hardware',
    detail:
      'No cheap plastic buckles that snap in the cold. We use custom-tensioned anodized aluminum G-hooks and metal zippers that can be repaired or replaced by any local cobbler.',
  },
];

const useCases = [
  {
    num: '01',
    title: 'Morning commute',
    description:
      'Navigating platforms and train cars. The low-profile silhouette stays close to your center of gravity, preventing snags in tight spaces, while side-access zippers let you grab keys or cards without removing the pack.',
  },
  {
    num: '02',
    title: 'Studio setup',
    description:
      'Unpacking at the workbench. A rigid base panel allows the bag to stand upright beside your desk, converting from a transit pack into a desk-side organizer with clear vertical visibility of your notebooks, drives, and tools.',
  },
  {
    num: '03',
    title: 'Weekend trailhead',
    description:
      'Exiting the city perimeter. Expandable rolltop volume accommodates extra insulation layers, food, and water, while breathable mesh back-panels keep commutes comfortable on long forest fire-roads.',
  },
];

export default function JoinClydeBackgroundFieldPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#080604] text-[#fff6e8] selection:bg-[#d69723]/30 selection:text-[#fffaf0]">
      <JoinClydeBackgroundField />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header
          id="sample-header"
          className="sticky top-0 z-50 border-b border-[#fff1cf]/12 bg-[#080604]/70 backdrop-blur-xl"
        >
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
            <Link href="/sample" className="group flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-[#d69723] text-sm font-semibold text-[#080604] transition-transform group-hover:rotate-6">
                FS
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-[#fff6e8]">
                Field Supply
              </span>
            </Link>

            <nav className="hidden items-center gap-8 text-xs font-mono uppercase tracking-wider text-[#cdbf9d] md:flex">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="transition-colors hover:text-[#fff6e8]">
                  {link.label}
                </a>
              ))}
            </nav>

            <Link
              href="/sample"
              className="hidden rounded border border-[#fff1cf]/16 bg-[#fff6e8]/6 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-[#fff6e8] backdrop-blur-md transition-colors hover:border-[#d69723]/70 hover:bg-[#d69723]/12 md:inline-flex"
            >
              Compare baseline
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="rounded-md p-2 text-[#fff6e8] transition-colors hover:bg-[#fff6e8]/10 md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="border-t border-[#fff1cf]/12 bg-[#080604]/92 px-6 py-5 backdrop-blur-xl md:hidden">
              <nav className="flex flex-col gap-4 text-sm font-mono uppercase tracking-wider text-[#cdbf9d]">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="border-b border-[#fff1cf]/10 py-2 transition-colors hover:text-[#fff6e8]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </header>

        <main className="flex-1">
          <section
            id="sample-hero"
            className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-14 md:min-h-[calc(100vh-5rem)] md:py-20 lg:grid-cols-12 lg:gap-10"
          >
            <div className="space-y-8 lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d69723]/28 bg-[#d69723]/10 px-3 py-1 text-xs font-mono text-[#f4d48f] shadow-sm backdrop-blur-md">
                <Compass className="h-3.5 w-3.5" />
                <span>Designed in Ontario, Canada</span>
              </div>

              <div className="space-y-6">
                <h1 className="max-w-3xl text-4xl font-serif font-semibold leading-[1.04] tracking-tight text-[#fff6e8] sm:text-5xl lg:text-7xl">
                  Built for the <span className="italic text-[#f0bf55]">in-between hours.</span>
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-[#d9cdb4] sm:text-lg">
                  Field Supply makes quiet, durable gear for commutes, site visits, studio days, and weekends that start before sunrise.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-1 sm:flex-row">
                <a
                  href="#sample-products"
                  className="inline-flex items-center justify-center gap-2 rounded bg-[#f0bf55] px-6 py-3.5 text-xs font-mono uppercase tracking-wider text-[#080604] shadow-sm transition-colors hover:bg-[#ffd978]"
                >
                  <span>Shop the field kit</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="#sample-materials"
                  className="inline-flex items-center justify-center gap-2 rounded border border-[#fff1cf]/18 bg-[#fff6e8]/6 px-6 py-3.5 text-xs font-mono uppercase tracking-wider text-[#fff6e8] backdrop-blur-md transition-colors hover:border-[#fff1cf]/45 hover:bg-[#fff6e8]/10"
                >
                  Read the material notes
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-lg border border-[#fff1cf]/16 bg-[#fff6e8]/7 p-3 shadow-[0_32px_120px_rgba(214,151,35,0.18)] backdrop-blur-md">
                <Image
                  src="/assets/field-supply/hero-composition.svg"
                  alt="Field Supply EDC flat-lay composition"
                  fill
                  priority
                  className="object-contain p-4 opacity-95"
                />
              </div>
            </div>
          </section>

          <section className="border-y border-[#fff1cf]/10 bg-[#fff6e8]/5 backdrop-blur-sm">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 md:grid-cols-3">
              {[
                ['22L', 'daily carry capacity with low-profile exterior access'],
                ['10oz', 'waxed organic canvas with weather-minded finish'],
                ['3', 'core pieces for commutes, studio days, and trailheads'],
              ].map(([value, label]) => (
                <div key={label} className="flex items-baseline gap-4 py-2">
                  <span className="font-serif text-4xl text-[#f0bf55]">{value}</span>
                  <p className="max-w-xs text-sm leading-relaxed text-[#cdbf9d]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="sample-products" className="mx-auto max-w-7xl space-y-12 px-6 py-16 md:py-24">
            <div className="max-w-xl space-y-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#f0bf55]">
                The hardware system
              </h2>
              <h3 className="text-2xl font-serif font-bold text-[#fff6e8] sm:text-3xl">
                Durable everyday carry.
              </h3>
              <p className="text-sm leading-relaxed text-[#cdbf9d]">
                Every pack is structurally reinforced at wear points, weather-proofed with wax or membrane, and designed around modular accessibility.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="group flex flex-col justify-between rounded-lg border border-[#fff1cf]/14 bg-[#fff6e8]/8 p-6 shadow-sm backdrop-blur-lg transition-all duration-300 hover:border-[#d69723]/42 hover:bg-[#fff6e8]/12"
                >
                  <div className="space-y-6">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-[#fff1cf]/12 bg-[#fff6e8]/8">
                      <Image
                        src={product.imageSrc}
                        alt={product.title}
                        fill
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-[#596547]/35 px-2 py-0.5 text-[10px] font-mono font-semibold tracking-widest text-[#dfe8c6]">
                          {product.tag}
                        </span>
                        <span className="font-mono text-xs text-[#cdbf9d]">{product.capacity}</span>
                      </div>

                      <div className="flex items-baseline justify-between gap-4">
                        <h4 className="font-serif text-lg font-bold text-[#fff6e8]">{product.title}</h4>
                        <span className="font-mono text-sm font-medium text-[#f0bf55]">
                          {product.price}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed text-[#cdbf9d]">{product.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 border-t border-[#fff1cf]/10 pt-6">
                    <ul className="space-y-1.5">
                      {product.specs.map((spec) => (
                        <li key={spec} className="flex items-center gap-2 text-[11px] font-mono text-[#cdbf9d]">
                          <PackageCheck className="h-3.5 w-3.5 text-[#f0bf55]" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-1.5 rounded bg-[#fff6e8]/9 py-2.5 text-xs font-mono uppercase tracking-wider text-[#fff6e8] backdrop-blur-sm transition-colors hover:bg-[#f0bf55] hover:text-[#080604]"
                    >
                      <span>Select gear</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="sample-materials"
            className="border-y border-[#fff1cf]/10 bg-[#fff6e8]/5 backdrop-blur-sm"
          >
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-12">
              <div className="space-y-8 lg:col-span-5">
                <div className="space-y-4">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#f0bf55]">
                    Material integrity
                  </h2>
                  <h3 className="text-2xl font-serif font-bold text-[#fff6e8] sm:text-3xl">
                    Materials chosen for years, not seasons.
                  </h3>
                  <p className="text-sm leading-relaxed text-[#cdbf9d] sm:text-base">
                    Waxed canvas, recycled nylon, aluminum hardware, and repairable construction give each piece a longer working life without turning it into technical cosplay.
                  </p>
                </div>

                <div className="space-y-6">
                  {materials.map((material, index) => (
                    <div key={material.title} className="space-y-1.5 border-l-2 border-[#f0bf55]/28 pl-4">
                      <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#fff6e8]">
                        <span className="text-[#f0bf55]">0{index + 1} {'//'}</span>
                        <span>{material.title}</span>
                      </h4>
                      <p className="text-sm leading-relaxed text-[#cdbf9d]">{material.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#fff1cf]/14 bg-[#fff6e8]/8 p-3 shadow-sm backdrop-blur-lg">
                  <Image
                    src="/assets/field-supply/material-swatches.svg"
                    alt="Field Supply material swatches"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="sample-lifestyle" className="mx-auto max-w-7xl space-y-12 px-6 py-16 md:py-24">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#f0bf55]">
                Design philosophy
              </h2>
              <h3 className="text-2xl font-serif font-bold text-[#fff6e8] sm:text-3xl">
                One kit, many contexts.
              </h3>
              <p className="text-sm leading-relaxed text-[#cdbf9d] sm:text-base">
                The same bag should work beside a laptop, a camera body, a rain shell, or a half-finished notebook. We design around transitions instead of categories.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {useCases.map((useCase) => (
                <article
                  key={useCase.num}
                  className="rounded-lg border border-[#fff1cf]/13 bg-[#fff6e8]/7 p-8 backdrop-blur-lg transition-colors hover:bg-[#fff6e8]/10"
                >
                  <div className="font-mono text-xs font-bold tracking-widest text-[#f0bf55]">
                    CASE STUDY {useCase.num}
                  </div>
                  <h4 className="mt-4 font-serif text-lg font-bold text-[#fff6e8]">{useCase.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-[#cdbf9d]">{useCase.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            id="sample-quote"
            className="border-y border-[#fff1cf]/10 bg-[#fff6e8]/5 px-6 py-20 text-center backdrop-blur-sm md:py-28"
          >
            <div className="mx-auto max-w-3xl space-y-8">
              <ShieldCheck className="mx-auto h-9 w-9 text-[#f0bf55]" />
              <blockquote className="px-4 font-serif text-xl italic leading-normal text-[#fff6e8] sm:text-2xl md:text-3xl">
                It feels designed by someone who actually carries too much stuff, but still cares how the bag looks in a room.
              </blockquote>
              <div className="space-y-1">
                <cite className="font-mono text-xs font-bold uppercase tracking-wider text-[#fff6e8] not-italic">
                  Mara Chen
                </cite>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#cdbf9d]">
                  Location Scout, Toronto
                </div>
              </div>
            </div>
          </section>

          <section id="sample-cta" className="mx-auto flex max-w-7xl flex-col items-center space-y-8 px-6 py-20 text-center md:py-28">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#f0bf55]">
                Acquire gear
              </h2>
              <h3 className="text-3xl font-serif font-semibold text-[#fff6e8] sm:text-4xl">
                Start with the kit that does the most.
              </h3>
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#cdbf9d] sm:text-base">
                The Field Kit bundles our daily pack, pouch, and weather cover in one quiet, repairable carry system.
              </p>
            </div>

            <button
              type="button"
              className="flex items-center gap-2.5 rounded bg-[#f0bf55] px-8 py-4 text-xs font-mono uppercase tracking-wider text-[#080604] shadow-md transition-colors hover:bg-[#ffd978]"
            >
              <span>Build your kit</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>

          <section id="stockists" className="w-full border-t border-[#fff1cf]/10 bg-[#fff6e8]/6 py-12 backdrop-blur-sm">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-4">
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#fff6e8]">
                  Active stockists
                </h4>
                <p className="text-xs leading-relaxed text-[#cdbf9d]">
                  Available at selected quiet spaces and utility suppliers across the continent.
                </p>
              </div>
              {[
                ['The Common Room', 'TORONTO / ONTARIO'],
                ['Pacific Foundry', 'PORTLAND / OREGON'],
                ['Studio Baseline Shop', 'VANCOUVER / BC'],
              ].map(([name, location]) => (
                <div key={name} className="space-y-1.5">
                  <div className="flex items-center gap-1 font-serif text-xs font-bold text-[#fff6e8]">
                    <MapPin className="h-3.5 w-3.5 text-[#f0bf55]" />
                    <span>{name}</span>
                  </div>
                  <div className="pl-4 text-[10px] font-mono uppercase tracking-wider text-[#cdbf9d]">
                    {location}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="w-full border-t border-[#fff1cf]/10 bg-[#080604]/78 py-10 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#fff6e8]">&copy; 2026 FIELD SUPPLY CO.</span>
              <span className="font-mono text-xs text-[#86785f]">/</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#cdbf9d]">
                All rights reserved
              </span>
            </div>

            <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-wider text-[#cdbf9d]">
              <a href="#sample-header" className="hover:text-[#fff6e8]">
                Back to top
              </a>
              <Link href="/" className="flex items-center gap-1 hover:text-[#fff6e8]">
                <span>Return to labs</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
