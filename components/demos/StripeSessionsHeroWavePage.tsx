'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Menu, X, ArrowUpRight, Compass, MapPin } from 'lucide-react';
import StripeSessionsHeroWave from '@/components/animation/StripeSessionsHeroWave';

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

export default function StripeSessionsHeroWavePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#faf8f5] font-sans text-[#1c1b1a] antialiased selection:bg-[#596547]/20 selection:text-[#1c1b1a]">
      <header
        id="sample-header"
        className="sticky top-0 z-50 w-full border-b border-[#e3ded5] bg-[#faf8f5]/90 backdrop-blur-md transition-all duration-300"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/sample" className="group flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#596547] text-sm font-semibold text-[#faf8f5] transition-transform group-hover:rotate-6">
              FS
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-[#1c1b1a] transition-opacity hover:opacity-80">
              Field Supply
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-mono uppercase tracking-wider text-[#595754] md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-all duration-200 hover:text-[#1c1b1a] hover:underline underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/sample"
              className="rounded border border-[#d6d0c2] bg-transparent px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-[#1c1b1a] transition-all duration-200 hover:border-[#1c1b1a] hover:bg-[#f0ede6]"
            >
              Compare baseline
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="rounded-md p-2 text-[#1c1b1a] transition-colors hover:bg-[#f0ede6] md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="space-y-4 border-b border-[#e3ded5] bg-[#faf8f5] px-6 py-6 duration-200 animate-in fade-in slide-in-from-top-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm font-mono uppercase tracking-wider text-[#595754]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="border-b border-[#e3ded5]/40 py-2 transition-colors hover:text-[#1c1b1a]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="w-full flex-1">
        <section
          id="sample-hero"
          className="relative z-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 overflow-hidden border-b border-[#e3ded5] px-6 py-12 lg:grid-cols-12 lg:gap-8 md:py-24"
        >
          <StripeSessionsHeroWave />

          <div className="space-y-8 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d6d0c2] bg-[#faf8f5]/80 px-3 py-1 text-xs font-mono text-[#595754] backdrop-blur-sm">
              <Compass className="h-3.5 w-3.5 text-[#596547]" />
              <span>Designed in Ontario, Canada</span>
            </div>

            <h1 className="text-4xl font-serif font-semibold leading-[1.08] tracking-tight text-[#1c1b1a] sm:text-5xl lg:text-6xl">
              Built for the <br className="hidden sm:inline" />
              <span className="italic text-[#596547]">in-between hours.</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-[#595754] sm:text-lg">
              Field Supply makes quiet, durable gear for commutes, site visits, studio days, and weekends that start before sunrise.
            </p>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <a
                href="#sample-products"
                className="inline-flex items-center justify-center gap-2 rounded bg-[#1c1b1a] px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-[#faf8f5] shadow-sm transition-colors hover:bg-[#2d2c2a]"
              >
                <span>Shop the field kit</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#sample-materials"
                className="inline-flex items-center justify-center gap-2 rounded border border-[#d6d0c2] bg-[#faf8f5]/70 px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-[#1c1b1a] backdrop-blur-sm transition-colors hover:border-[#1c1b1a] hover:bg-[#f0ede6]/70"
              >
                <span>Read the material notes</span>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center lg:col-span-6">
            <div className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-lg border border-[#e3ded5] bg-[#faf8f5] shadow-[0_24px_80px_rgba(15,76,129,0.14)]">
              <Image
                src="/assets/field-supply/hero-composition.svg"
                alt="Field Supply EDC Flat-lay Composition"
                fill
                priority
                className="object-contain p-4"
              />
            </div>
          </div>
        </section>

        <section id="sample-products" className="mx-auto max-w-7xl space-y-12 border-b border-[#e3ded5] px-6 py-16 md:py-24">
          <div className="max-w-xl space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b85d3b]">THE HARDWARE SYSTEM</h2>
            <h3 className="text-2xl font-serif font-bold text-[#1c1b1a] sm:text-3xl">Durable Everyday Carry</h3>
            <p className="text-sm leading-relaxed text-[#595754]">
              Every pack is structurally reinforced at wear points, water-proofed with wax or membrane, and designed around modular accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="group flex flex-col justify-between rounded-lg border border-[#e3ded5] bg-[#faf8f5] p-6 transition-all duration-300 hover:border-[#8e8a82] hover:bg-[#f0ede6]/20"
              >
                <div className="space-y-6">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-[#e3ded5] bg-[#f0ede6]">
                    <Image
                      src={p.imageSrc}
                      alt={p.title}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-[#596547]/10 px-2 py-0.5 text-[10px] font-mono font-semibold tracking-widest text-[#596547]">
                        {p.tag}
                      </span>
                      <span className="font-mono text-xs text-[#595754]">{p.capacity}</span>
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <h4 className="font-serif text-lg font-bold text-[#1c1b1a]">{p.title}</h4>
                      <span className="font-mono text-sm font-medium text-[#1c1b1a]">{p.price}</span>
                    </div>

                    <p className="pt-2 text-xs leading-relaxed text-[#595754] sm:text-sm">{p.description}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 border-t border-[#e3ded5]/40 pt-8">
                  <ul className="space-y-1.5">
                    {p.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px] font-mono text-[#595754]/80">
                        <span className="h-1 w-1 rounded-full bg-[#8e8a82]" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="flex w-full items-center justify-center gap-1.5 rounded bg-[#f0ede6] py-2.5 font-mono text-xs uppercase tracking-wider text-[#1c1b1a] transition-colors duration-200 hover:bg-[#1c1b1a] hover:text-[#faf8f5]">
                    <span>Select gear</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="sample-materials"
          className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 border-b border-[#e3ded5] px-6 py-16 lg:grid-cols-12 md:py-24"
        >
          <div className="order-2 space-y-8 lg:order-1 lg:col-span-6">
            <div className="space-y-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b85d3b]">MATERIAL INTEGRITY</h2>
              <h3 className="text-2xl font-serif font-bold text-[#1c1b1a] sm:text-3xl">Materials chosen for years, not seasons.</h3>
              <p className="text-sm leading-relaxed text-[#595754] sm:text-base">
                Waxed canvas, recycled nylon, aluminum hardware, and repairable construction give each piece a longer working life without turning it into technical cosplay.
              </p>
            </div>

            <div className="space-y-6">
              {materials.map((m, idx) => (
                <div key={idx} className="space-y-1.5 border-l-2 border-[#596547]/30 pl-4 transition-colors focus-within:border-[#596547]">
                  <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#1c1b1a]">
                    <span className="text-[#596547]">0{idx + 1} {'//'}</span>
                    <span>{m.title}</span>
                  </h4>
                  <p className="text-xs leading-relaxed text-[#595754] sm:text-sm">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 flex items-center justify-center lg:order-2 lg:col-span-6">
            <div className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-lg border border-[#e3ded5] bg-[#faf8f5] p-2">
              <Image
                src="/assets/field-supply/material-swatches.svg"
                alt="Field Supply Material Swatches Composition"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        </section>

        <section id="sample-lifestyle" className="mx-auto max-w-7xl space-y-12 border-b border-[#e3ded5] px-6 py-16 md:py-24">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b85d3b]">DESIGN PHILOSOPHY</h2>
            <h3 className="text-2xl font-serif font-bold text-[#1c1b1a] sm:text-3xl">One kit, many contexts.</h3>
            <p className="text-sm leading-relaxed text-[#595754] sm:text-base">
              The same bag should work beside a laptop, a camera body, a rain shell, or a half-finished notebook. We design around transitions instead of categories.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {useCases.map((uc) => (
              <div
                key={uc.num}
                className="space-y-4 rounded-lg border border-[#e3ded5] bg-[#f0ede6]/40 p-8 transition-all duration-300 hover:bg-[#faf8f5] hover:shadow-sm"
              >
                <div className="font-mono text-xs font-bold tracking-widest text-[#596547]">CASE STUDY {uc.num}</div>
                <h4 className="font-serif text-lg font-bold text-[#1c1b1a]">{uc.title}</h4>
                <p className="text-xs leading-relaxed text-[#595754] sm:text-sm">{uc.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="sample-quote"
          className="mx-auto flex max-w-7xl flex-col items-center border-b border-[#e3ded5] bg-[#f0ede6]/30 px-6 py-20 text-center md:py-32"
        >
          <div className="max-w-3xl space-y-8">
            <span className="font-serif text-4xl text-[#596547]">&ldquo;</span>
            <blockquote className="px-4 font-serif text-xl italic leading-normal text-[#1c1b1a] sm:text-2xl md:text-3xl">
              It feels designed by someone who actually carries too much stuff, but still cares how the bag looks in a room.
            </blockquote>
            <div className="space-y-1">
              <cite className="font-mono text-xs font-bold uppercase tracking-wider text-[#1c1b1a] not-italic">Mara Chen</cite>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#595754]">Location Scout, Toronto</div>
            </div>
          </div>
        </section>

        <section id="sample-cta" className="mx-auto flex max-w-7xl flex-col items-center space-y-8 px-6 py-20 text-center md:py-28">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b85d3b]">ACQUIRE GEAR</h2>
            <h3 className="text-3xl font-serif font-semibold text-[#1c1b1a] sm:text-4xl">Start with the kit that does the most.</h3>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#595754] sm:text-base">
              The Field Kit bundles our daily pack, pouch, and weather cover in one quiet, repairable carry system.
            </p>
          </div>

          <div>
            <button className="flex items-center gap-2.5 rounded bg-[#1c1b1a] px-8 py-4 font-mono text-xs uppercase tracking-wider text-[#faf8f5] shadow-md transition-colors duration-200 hover:bg-[#2d2c2a]">
              <span>Build your kit</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section id="stockists" className="w-full border-t border-[#e3ded5] bg-[#f0ede6] py-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-4">
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1c1b1a]">Active Stockists</h4>
              <p className="text-xs leading-relaxed text-[#595754]">Available at selected quiet spaces and utility suppliers across the continent.</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1 font-serif text-xs font-bold text-[#1c1b1a]">
                <MapPin className="h-3.5 w-3.5 text-[#596547]" />
                <span>The Common Room</span>
              </div>
              <div className="pl-4.5 font-mono text-[10px] text-[#595754]">TORONTO • ONTARIO</div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1 font-serif text-xs font-bold text-[#1c1b1a]">
                <MapPin className="h-3.5 w-3.5 text-[#596547]" />
                <span>Pacific Foundry</span>
              </div>
              <div className="pl-4.5 font-mono text-[10px] text-[#595754]">PORTLAND • OREGON</div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1 font-serif text-xs font-bold text-[#1c1b1a]">
                <MapPin className="h-3.5 w-3.5 text-[#596547]" />
                <span>Studio Baseline Shop</span>
              </div>
              <div className="pl-4.5 font-mono text-[10px] text-[#595754]">VANCOUVER • BC</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-[#e3ded5] bg-[#faf8f5] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#1c1b1a]">&copy; 2026 FIELD SUPPLY CO.</span>
            <span className="font-mono text-xs text-[#8e8a82]">•</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#595754]">ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-wider text-[#595754]">
            <a href="#sample-header" className="hover:text-[#1c1b1a] hover:underline underline-offset-4">Back to Top</a>
            <span>•</span>
            <Link href="/" className="flex items-center gap-1 hover:text-[#1c1b1a] hover:underline underline-offset-4">
              <span>Return to Labs</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
