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
import { motion } from 'framer-motion';
import MagneticTarget from '@/components/animation/MagneticTarget';
import PointerEyes from '@/components/animation/PointerEyes';
import { MarqueeBand, RevealLine } from '@/components/animation/RevealTextBand';

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

const statRows = [
  ['22L', 'daily carry capacity with low-profile exterior access'],
  ['10oz', 'waxed organic canvas with weather-minded finish'],
  ['3', 'core pieces for commutes, studio days, and trailheads'],
];

export default function FieldSupplyOchiInteractionsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f3f0e8] font-sans text-[#1c1b1a] antialiased selection:bg-[#d5f05f]/45 selection:text-[#1c1b1a]">
      <header
        id="sample-header"
        className="sticky top-0 z-50 w-full border-b border-[#1c1b1a]/10 bg-[#f3f0e8]/88 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/sample" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#596547] text-sm font-semibold text-[#f7f2e7] transition-transform group-hover:rotate-6">
              FS
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-[#1c1b1a]">
              Field Supply
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-mono uppercase tracking-wider text-[#4f5049] md:flex">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="group relative overflow-hidden py-1">
                <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-[120%]">
                  {link.label}
                </span>
                <span className="absolute left-0 top-1 block translate-y-[120%] transition-transform duration-500 ease-out group-hover:translate-y-0">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          <MagneticTarget className="hidden md:block" strength={10} rotate={1.2}>
            <Link
              href="/sample"
              className="inline-flex rounded-full border border-[#1c1b1a]/20 bg-[#f7f2e7] px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-[#1c1b1a] shadow-sm transition-colors hover:bg-[#d5f05f]"
            >
              Compare baseline
            </Link>
          </MagneticTarget>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="rounded-md p-2 text-[#1c1b1a] transition-colors hover:bg-[#e8e1d1] md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="space-y-4 border-b border-[#1c1b1a]/10 bg-[#f3f0e8] px-6 py-6 duration-200 animate-in fade-in slide-in-from-top-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm font-mono uppercase tracking-wider text-[#4f5049]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="border-b border-[#1c1b1a]/10 py-2 transition-colors hover:text-[#1c1b1a]"
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
          className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl grid-cols-1 items-center gap-12 overflow-hidden border-b border-[#1c1b1a]/10 px-6 py-12 lg:grid-cols-12 lg:gap-10 md:py-20"
        >
          <div className="pointer-events-none absolute right-[-14%] top-[-18%] h-[28rem] w-[28rem] rounded-full border border-[#596547]/10 bg-[#d5f05f]/24 blur-3xl" />
          <div className="space-y-8 lg:col-span-7">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-[#1c1b1a]/14 bg-[#f7f2e7]/78 px-3 py-1 text-xs font-mono text-[#4f5049] shadow-sm backdrop-blur-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Compass className="h-3.5 w-3.5 text-[#596547]" />
              <span>Designed in Ontario, Canada</span>
            </motion.div>

            <h1 className="max-w-5xl font-serif text-[clamp(3.1rem,7.6vw,6.1rem)] font-black uppercase leading-[0.92] tracking-[0em] text-[#1c1b1a]">
              <RevealLine innerClassName="whitespace-nowrap" revealOnMount>Built for</RevealLine>
              <RevealLine innerClassName="whitespace-nowrap" delay={0.08} revealOnMount>
                <span className="text-[#596547]">in-between</span>
              </RevealLine>
              <RevealLine innerClassName="whitespace-nowrap" delay={0.16} revealOnMount>hours.</RevealLine>
            </h1>

            <div className="grid gap-6 border-t border-[#1c1b1a]/14 pt-6 md:grid-cols-12">
              <p className="max-w-xl text-base leading-relaxed text-[#4f5049] md:col-span-6 sm:text-lg">
                Field Supply makes quiet, durable gear for commutes, site visits, studio days, and weekends that start before sunrise.
              </p>
              <div className="flex flex-col gap-4 md:col-span-6 sm:flex-row md:justify-end">
                <MagneticTarget strength={13} rotate={1.4}>
                  <a
                    href="#sample-products"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1c1b1a] px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-[#f7f2e7] shadow-sm transition-colors hover:bg-[#596547]"
                  >
                    <span>Shop the field kit</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </MagneticTarget>
                <MagneticTarget strength={9} rotate={1}>
                  <a
                    href="#sample-materials"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1c1b1a]/18 bg-[#f7f2e7]/80 px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-[#1c1b1a] backdrop-blur-sm transition-colors hover:bg-[#d5f05f]"
                  >
                    Read material notes
                  </a>
                </MagneticTarget>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <MagneticTarget strength={18} rotate={2.2}>
              <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-lg border border-[#1c1b1a]/12 bg-[#f7f2e7] p-4 shadow-[0_34px_110px_rgba(28,27,26,0.14)]">
                <div className="absolute inset-x-0 top-0 h-14 bg-[#d5f05f]" />
                <Image
                  src="/assets/field-supply/hero-composition.svg"
                  alt="Field Supply EDC flat-lay composition"
                  fill
                  priority
                  className="object-contain p-6"
                />
                <PointerEyes className="absolute bottom-5 left-1/2 w-[62%] -translate-x-1/2" />
              </div>
            </MagneticTarget>
          </div>
        </section>

        <section className="border-b border-[#1c1b1a]/10 bg-[#596547] py-8 text-[#f7f2e7]">
          <MarqueeBand
            items={['commute ready', 'weather sealed', 'repairable hardware']}
            duration={19}
          />
        </section>

        <section className="border-b border-[#1c1b1a]/10 bg-[#d5f05f]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 text-[#1c1b1a] md:grid-cols-3">
            {statRows.map(([value, label]) => (
              <motion.div
                key={label}
                className="flex items-baseline gap-4 py-2"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-serif text-5xl font-black leading-none">{value}</span>
                <p className="max-w-xs text-sm leading-relaxed">{label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="sample-products" className="mx-auto max-w-7xl space-y-12 border-b border-[#1c1b1a]/10 px-6 py-16 md:py-24">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b85d3b]">The hardware system</h2>
            <h3 className="font-serif text-4xl font-black uppercase leading-[0.9] text-[#1c1b1a] sm:text-5xl">
              <RevealLine>Durable</RevealLine>
              <RevealLine delay={0.08}>everyday carry</RevealLine>
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-[#4f5049]">
              Every pack is structurally reinforced at wear points, water-proofed with wax or membrane, and designed around modular accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {products.map((product, index) => (
              <MagneticTarget key={product.id} strength={index === 1 ? 18 : 14} rotate={1.6}>
                <article className="group flex h-full flex-col justify-between rounded-lg border border-[#1c1b1a]/12 bg-[#f7f2e7] p-6 shadow-sm transition-colors duration-300 hover:border-[#596547]/55 hover:bg-[#fbf7ea]">
                  <div className="space-y-6">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-[#1c1b1a]/10 bg-[#e8e1d1]">
                      <Image
                        src={product.imageSrc}
                        alt={product.title}
                        fill
                        className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-[#596547]/12 px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-widest text-[#596547]">
                          {product.tag}
                        </span>
                        <span className="font-mono text-xs text-[#4f5049]">{product.capacity}</span>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <h4 className="font-serif text-xl font-black text-[#1c1b1a]">{product.title}</h4>
                        <span className="font-mono text-sm font-medium text-[#1c1b1a]">{product.price}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-[#4f5049]">{product.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 border-t border-[#1c1b1a]/10 pt-7">
                    <ul className="space-y-1.5">
                      {product.specs.map((spec) => (
                        <li key={spec} className="flex items-center gap-1.5 text-[11px] font-mono text-[#4f5049]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#596547]" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#e8e1d1] py-2.5 font-mono text-xs uppercase tracking-wider text-[#1c1b1a] transition-colors duration-200 hover:bg-[#1c1b1a] hover:text-[#f7f2e7]">
                      <span>Select gear</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              </MagneticTarget>
            ))}
          </div>
        </section>

        <section id="sample-materials" className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 border-b border-[#1c1b1a]/10 px-6 py-16 lg:grid-cols-12 md:py-24">
          <div className="order-2 space-y-8 lg:order-1 lg:col-span-6">
            <div className="space-y-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b85d3b]">Material integrity</h2>
              <h3 className="font-serif text-4xl font-black uppercase leading-[0.95] text-[#1c1b1a] sm:text-5xl">
                <RevealLine>Chosen for years,</RevealLine>
                <RevealLine delay={0.08}>not seasons.</RevealLine>
              </h3>
              <p className="text-sm leading-relaxed text-[#4f5049] sm:text-base">
                Waxed canvas, recycled nylon, aluminum hardware, and repairable construction give each piece a longer working life without turning it into technical cosplay.
              </p>
            </div>

            <div className="space-y-5">
              {materials.map((material, index) => (
                <MagneticTarget key={material.title} strength={8} rotate={0.8}>
                  <div className="space-y-1.5 border-l-2 border-[#596547]/35 bg-[#f7f2e7]/60 py-3 pl-4 transition-colors hover:border-[#596547]">
                    <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#1c1b1a]">
                      <span className="text-[#596547]">0{index + 1} {'//'}</span>
                      <span>{material.title}</span>
                    </h4>
                    <p className="text-sm leading-relaxed text-[#4f5049]">{material.detail}</p>
                  </div>
                </MagneticTarget>
              ))}
            </div>
          </div>

          <div className="order-1 flex items-center justify-center lg:order-2 lg:col-span-6">
            <MagneticTarget strength={16} rotate={2}>
              <div className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-lg border border-[#1c1b1a]/12 bg-[#f7f2e7] p-2 shadow-[0_28px_90px_rgba(28,27,26,0.12)]">
                <Image
                  src="/assets/field-supply/material-swatches.svg"
                  alt="Field Supply material swatches composition"
                  fill
                  className="object-contain p-5"
                />
                <div className="absolute right-4 top-4 rounded-full bg-[#d5f05f] px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-[#1c1b1a]">
                  pointer pull
                </div>
              </div>
            </MagneticTarget>
          </div>
        </section>

        <section className="border-b border-[#1c1b1a]/10 bg-[#1c1b1a] py-7 text-[#d5f05f]">
          <MarqueeBand
            items={['field notes', 'many contexts', 'quiet utility']}
            duration={22}
            reverse
          />
        </section>

        <section id="sample-lifestyle" className="mx-auto max-w-7xl space-y-12 border-b border-[#1c1b1a]/10 px-6 py-16 md:py-24">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b85d3b]">Design philosophy</h2>
            <h3 className="font-serif text-4xl font-black uppercase leading-[0.95] text-[#1c1b1a] sm:text-5xl">
              <RevealLine>One kit,</RevealLine>
              <RevealLine delay={0.08}>many contexts.</RevealLine>
            </h3>
            <p className="text-sm leading-relaxed text-[#4f5049] sm:text-base">
              The same bag should work beside a laptop, a camera body, a rain shell, or a half-finished notebook. We design around transitions instead of categories.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {useCases.map((useCase) => (
              <MagneticTarget key={useCase.num} strength={10} rotate={1.1}>
                <article className="h-full space-y-4 rounded-lg border border-[#1c1b1a]/12 bg-[#e8e1d1]/72 p-8 transition-colors duration-300 hover:bg-[#f7f2e7]">
                  <div className="font-mono text-xs font-bold tracking-widest text-[#596547]">
                    CASE STUDY {useCase.num}
                  </div>
                  <h4 className="font-serif text-xl font-black text-[#1c1b1a]">{useCase.title}</h4>
                  <p className="text-sm leading-relaxed text-[#4f5049]">{useCase.description}</p>
                </article>
              </MagneticTarget>
            ))}
          </div>
        </section>

        <section id="sample-quote" className="border-b border-[#1c1b1a]/10 bg-[#f7f2e7] px-6 py-20 text-center md:py-28">
          <div className="mx-auto max-w-4xl space-y-8">
            <PointerEyes className="mx-auto w-64" />
            <blockquote className="px-4 font-serif text-2xl font-black uppercase leading-[0.95] text-[#1c1b1a] sm:text-4xl md:text-6xl">
              <RevealLine>It feels designed by someone who actually carries too much stuff,</RevealLine>
              <RevealLine delay={0.08}>but still cares how the bag looks in a room.</RevealLine>
            </blockquote>
            <div className="space-y-1">
              <cite className="not-italic font-mono text-xs font-bold uppercase tracking-wider text-[#1c1b1a]">
                Mara Chen
              </cite>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#4f5049]">
                Location Scout, Toronto
              </div>
            </div>
          </div>
        </section>

        <section id="sample-cta" className="mx-auto flex max-w-7xl flex-col items-center space-y-8 px-6 py-20 text-center md:py-28">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b85d3b]">Acquire gear</h2>
            <h3 className="font-serif text-4xl font-black uppercase leading-[0.9] text-[#1c1b1a] sm:text-6xl">
              <RevealLine>Start with the kit</RevealLine>
              <RevealLine delay={0.08}>that does the most.</RevealLine>
            </h3>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#4f5049] sm:text-base">
              The Field Kit bundles our daily pack, pouch, and weather cover in one quiet, repairable carry system.
            </p>
          </div>

          <MagneticTarget strength={18} rotate={2}>
            <button className="flex items-center gap-2.5 rounded-full bg-[#1c1b1a] px-8 py-4 font-mono text-xs uppercase tracking-wider text-[#f7f2e7] shadow-md transition-colors duration-200 hover:bg-[#596547]">
              <span>Build your kit</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </MagneticTarget>
        </section>

        <section id="stockists" className="w-full border-t border-[#1c1b1a]/10 bg-[#e8e1d1] py-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-4">
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1c1b1a]">Active stockists</h4>
              <p className="text-xs leading-relaxed text-[#4f5049]">Available at selected quiet spaces and utility suppliers across the continent.</p>
            </div>
            {[
              ['The Common Room', 'TORONTO - ONTARIO'],
              ['Pacific Foundry', 'PORTLAND - OREGON'],
              ['Studio Baseline Shop', 'VANCOUVER - BC'],
            ].map(([name, location]) => (
              <div key={name} className="space-y-1.5">
                <div className="flex items-center gap-1 font-serif text-xs font-bold text-[#1c1b1a]">
                  <MapPin className="h-3.5 w-3.5 text-[#596547]" />
                  <span>{name}</span>
                </div>
                <div className="pl-4.5 font-mono text-[10px] uppercase tracking-widest text-[#4f5049]">{location}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-[#1c1b1a]/10 bg-[#f3f0e8] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-mono text-xs font-bold text-[#1c1b1a]">&copy; 2026 FIELD SUPPLY CO.</span>
            <span className="text-[#8e8a82]">/</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#4f5049]">Ochi interaction study</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-wider text-[#4f5049]">
            <a href="#sample-header" className="transition-colors hover:text-[#1c1b1a]">Back to top</a>
            <Link href="/" className="flex items-center gap-1 transition-colors hover:text-[#1c1b1a]">
              <span>Return to labs</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
            <span className="inline-flex items-center gap-1">
              <PackageCheck className="h-3 w-3 text-[#596547]" />
              <ShieldCheck className="h-3 w-3 text-[#596547]" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
