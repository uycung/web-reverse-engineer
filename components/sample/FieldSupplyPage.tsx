'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Menu, X, ArrowUpRight, Compass, MapPin } from 'lucide-react';

export default function FieldSupplyPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Links
  const navLinks = [
    { label: 'Gear', href: '#sample-products' },
    { label: 'Field Notes', href: '#sample-lifestyle' },
    { label: 'Materials', href: '#sample-materials' },
    { label: 'Stockists', href: '#stockists' }
  ];

  // Products Data
  const products = [
    {
      id: 'transit-pack',
      title: 'Transit Pack',
      capacity: '22L',
      tag: 'DAILY EDC',
      price: '$180',
      description: 'A low-profile daily pack with weather-resistant canvas, protected laptop storage, and exterior access that works on crowded platforms.',
      imageSrc: '/assets/field-supply/transit-pack.svg',
      specs: ['10oz Waxed Canvas', '15" Padded Laptop Sleeve', 'Dual Side Pockets']
    },
    {
      id: 'field-pouch',
      title: 'Field Pouch',
      capacity: '2.2L',
      tag: 'ORGANIZER',
      price: '$65',
      description: 'A compact organizer for cables, tools, chargers, notebooks, and the small things that usually disappear at the bottom of a bag.',
      imageSrc: '/assets/field-supply/field-pouch.svg',
      specs: ['YKK Weatherproof Zippers', 'Elastic Mesh Divisions', 'Webbing Grab Loops']
    },
    {
      id: 'rolltop',
      title: 'All-Weather Rolltop',
      capacity: '28L',
      tag: 'WEEKEND TRAVEL',
      price: '$220',
      description: 'A weekend-ready carry with sealed seams, expandable storage, and a silhouette that still feels at home in the city.',
      imageSrc: '/assets/field-supply/rolltop.svg',
      specs: ['Recycled Ripstop Shell', 'Anodized Aluminum G-Hook', 'Expandable Collar']
    }
  ];

  // Material Bullets
  const materials = [
    {
      title: 'Waxed organic canvas',
      detail: 'Our 10oz canvas is sourced from organic cotton fields and treated with a proprietary blend of local beeswax for weather-resistance that develops a unique patina over time.'
    },
    {
      title: 'Recycled ripstop lining',
      detail: 'The interior is lined with 210D recycled nylon ripstop in a high-visibility contrast stone gray, making it easy to find dark items in low-light conditions.'
    },
    {
      title: 'Replaceable hardware',
      detail: 'No cheap plastic buckles that snap in the cold. We use custom-tensioned anodized aluminum G-hooks and metal zippers that can be repaired or replaced by any local cobbler.'
    }
  ];

  // Lifestyle Use Cases
  const useCases = [
    {
      num: '01',
      title: 'Morning commute',
      description: 'Navigating platforms and train cars. The low-profile silhouette stays close to your center of gravity, preventing snags in tight spaces, while side-access zippers let you grab keys or cards without removing the pack.'
    },
    {
      num: '02',
      title: 'Studio setup',
      description: 'Unpacking at the workbench. A rigid base panel allows the bag to stand upright beside your desk, converting from a transit pack into a desk-side organizer with clear vertical visibility of your notebooks, drives, and tools.'
    },
    {
      num: '03',
      title: 'Weekend trailhead',
      description: 'Exiting the city perimeter. Expandable rolltop volume accommodates extra insulation layers, food, and water, while breathable mesh back-panels keep commutes comfortable on long forest fire-roads.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1b1a] selection:bg-[#596547]/20 selection:text-[#1c1b1a] flex flex-col font-sans antialiased overflow-x-hidden">
      
      {/* 1. HEADER */}
      <header id="sample-header" className="w-full border-b border-[#e3ded5] bg-[#faf8f5]/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/sample" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded bg-[#596547] flex items-center justify-center text-[#faf8f5] font-semibold text-sm transition-transform group-hover:rotate-6">
              FS
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-[#1c1b1a] hover:opacity-80 transition-opacity">
              Field Supply
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-[#595754]">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="hover:text-[#1c1b1a] hover:underline underline-offset-4 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#sample-products" 
              className="text-xs font-mono uppercase tracking-wider px-5 py-2.5 rounded border border-[#d6d0c2] bg-transparent hover:bg-[#f0ede6] hover:border-[#1c1b1a] text-[#1c1b1a] transition-all duration-200"
            >
              View collection
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#1c1b1a] hover:bg-[#f0ede6] rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-[#e3ded5] bg-[#faf8f5] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-4 text-sm font-mono uppercase tracking-wider text-[#595754]">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#1c1b1a] transition-colors py-2 border-b border-[#e3ded5]/40"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-2">
              <a 
                href="#sample-products" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center text-xs font-mono uppercase tracking-wider w-full py-3 rounded border border-[#1c1b1a] bg-[#1c1b1a] text-[#faf8f5] hover:bg-[#2d2c2a] transition-colors"
              >
                View collection
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 w-full">
        
        {/* 2. HERO SECTION */}
        <section id="sample-hero" className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center border-b border-[#e3ded5]">
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d6d0c2] bg-[#f0ede6]/50 text-xs font-mono text-[#595754]">
              <Compass className="w-3.5 h-3.5 text-[#596547]" />
              <span>Designed in Ontario, Canada</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold tracking-tight leading-[1.08] text-[#1c1b1a]">
              Built for the <br className="hidden sm:inline" />
              <span className="text-[#596547] italic">in-between hours.</span>
            </h1>

            <p className="text-[#595754] text-base sm:text-lg max-w-xl leading-relaxed">
              Field Supply makes quiet, durable gear for commutes, site visits, studio days, and weekends that start before sunrise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#sample-products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-[#1c1b1a] hover:bg-[#2d2c2a] text-[#faf8f5] font-mono text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Shop the field kit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#sample-materials"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded border border-[#d6d0c2] hover:border-[#1c1b1a] hover:bg-[#f0ede6]/30 text-[#1c1b1a] font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <span>Read the material notes</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="w-full max-w-xl aspect-[4/3] relative rounded-lg border border-[#e3ded5] overflow-hidden bg-[#f0ede6] shadow-sm">
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

        {/* 3. PRODUCT HIGHLIGHTS */}
        <section id="sample-products" className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-12 border-b border-[#e3ded5]">
          <div className="max-w-xl space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#b85d3b] font-bold">THE HARDWARE SYSTEM</h2>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1b1a]">Durable Everyday Carry</h3>
            <p className="text-[#595754] text-sm leading-relaxed">
              Every pack is structurally reinforced at wear points, water-proofed with wax or membrane, and designed around modular accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p) => (
              <div 
                key={p.id}
                className="group flex flex-col justify-between p-6 rounded-lg border border-[#e3ded5] bg-[#faf8f5] hover:bg-[#f0ede6]/20 hover:border-[#8e8a82] transition-all duration-300"
              >
                <div className="space-y-6">
                  {/* Aspect Ratio Box for Vector Asset */}
                  <div className="w-full aspect-[4/3] relative bg-[#f0ede6] rounded border border-[#e3ded5] overflow-hidden">
                    <Image 
                      src={p.imageSrc} 
                      alt={p.title} 
                      fill
                      className="object-contain p-4 group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-[#596547]/10 text-[#596547] font-semibold">
                        {p.tag}
                      </span>
                      <span className="font-mono text-xs text-[#595754]">{p.capacity}</span>
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <h4 className="text-lg font-serif font-bold text-[#1c1b1a]">{p.title}</h4>
                      <span className="font-mono text-sm text-[#1c1b1a] font-medium">{p.price}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#595754] leading-relaxed pt-2">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-[#e3ded5]/40 mt-6 space-y-4">
                  <ul className="space-y-1.5">
                    {p.specs.map((spec, i) => (
                      <li key={i} className="text-[11px] font-mono text-[#595754]/80 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#8e8a82]"></span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full py-2.5 rounded bg-[#f0ede6] hover:bg-[#1c1b1a] hover:text-[#faf8f5] text-[#1c1b1a] font-mono text-xs uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-1.5">
                    <span>Select gear</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. MATERIALS SECTION */}
        <section id="sample-materials" className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#e3ded5]">
          <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#b85d3b] font-bold">MATERIAL INTEGRITY</h2>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1b1a]">Materials chosen for years, not seasons.</h3>
              <p className="text-[#595754] text-sm sm:text-base leading-relaxed">
                Waxed canvas, recycled nylon, aluminum hardware, and repairable construction give each piece a longer working life without turning it into technical cosplay.
              </p>
            </div>

            <div className="space-y-6">
              {materials.map((m, idx) => (
                <div key={idx} className="space-y-1.5 pl-4 border-l-2 border-[#596547]/30 focus-within:border-[#596547] transition-colors">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#1c1b1a] font-bold flex items-center gap-2">
                    <span className="text-[#596547]">0{idx + 1} {"//"}</span>
                    <span>{m.title}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#595754] leading-relaxed">
                    {m.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2">
            <div className="w-full max-w-xl aspect-[4/3] relative rounded-lg border border-[#e3ded5] overflow-hidden bg-[#faf8f5] p-2">
              <Image 
                src="/assets/field-supply/material-swatches.svg" 
                alt="Field Supply Material Swatches Composition" 
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        </section>

        {/* 5. LIFESTYLE / EDITORIAL SECTION */}
        <section id="sample-lifestyle" className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-12 border-b border-[#e3ded5]">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#b85d3b] font-bold">DESIGN PHILOSOPHY</h2>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1b1a]">One kit, many contexts.</h3>
            <p className="text-[#595754] text-sm sm:text-base leading-relaxed">
              The same bag should work beside a laptop, a camera body, a rain shell, or a half-finished notebook. We design around transitions instead of categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((uc) => (
              <div 
                key={uc.num}
                className="p-8 rounded-lg border border-[#e3ded5] bg-[#f0ede6]/40 hover:bg-[#faf8f5] hover:shadow-sm transition-all duration-300 space-y-4"
              >
                <div className="font-mono text-xs text-[#596547] font-bold tracking-widest">
                  CASE STUDY {uc.num}
                </div>
                <h4 className="text-lg font-serif font-bold text-[#1c1b1a]">{uc.title}</h4>
                <p className="text-xs sm:text-sm text-[#595754] leading-relaxed">
                  {uc.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. TESTIMONIAL OR QUOTE */}
        <section id="sample-quote" className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center bg-[#f0ede6]/30 border-b border-[#e3ded5]">
          <div className="max-w-3xl space-y-8">
            <span className="text-[#596547] text-4xl font-serif">“</span>
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#1c1b1a] leading-normal px-4">
              It feels designed by someone who actually carries too much stuff, but still cares how the bag looks in a room.
            </blockquote>
            <div className="space-y-1">
              <cite className="not-italic font-mono text-xs uppercase tracking-wider text-[#1c1b1a] font-bold">
                Mara Chen
              </cite>
              <div className="text-[10px] font-mono text-[#595754] uppercase tracking-widest">
                Location Scout, Toronto
              </div>
            </div>
          </div>
        </section>

        {/* 7. CTA FOOTER */}
        <section id="sample-cta" className="max-w-7xl mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center space-y-8">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#b85d3b] font-bold">ACQUIRE GEAR</h2>
            <h3 className="text-3xl sm:text-4xl font-serif font-semibold text-[#1c1b1a]">
              Start with the kit that does the most.
            </h3>
            <p className="text-[#595754] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              The Field Kit bundles our daily pack, pouch, and weather cover in one quiet, repairable carry system.
            </p>
          </div>

          <div>
            <button className="px-8 py-4 rounded bg-[#1c1b1a] hover:bg-[#2d2c2a] text-[#faf8f5] font-mono text-xs uppercase tracking-wider transition-colors duration-200 flex items-center gap-2.5 shadow-md">
              <span>Build your kit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Additional Stockist Section for Realism & Anchor Link */}
        <section id="stockists" className="w-full bg-[#f0ede6] border-t border-[#e3ded5] py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1c1b1a]">Active Stockists</h4>
              <p className="text-xs text-[#595754] leading-relaxed">Available at selected quiet spaces and utility suppliers across the continent.</p>
            </div>
            <div className="space-y-1.5">
              <div className="font-serif text-xs font-bold text-[#1c1b1a] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#596547]" />
                <span>The Common Room</span>
              </div>
              <div className="text-[10px] font-mono text-[#595754] pl-4.5">TORONTO • ONTARIO</div>
            </div>
            <div className="space-y-1.5">
              <div className="font-serif text-xs font-bold text-[#1c1b1a] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#596547]" />
                <span>Pacific Foundry</span>
              </div>
              <div className="text-[10px] font-mono text-[#595754] pl-4.5">PORTLAND • OREGON</div>
            </div>
            <div className="space-y-1.5">
              <div className="font-serif text-xs font-bold text-[#1c1b1a] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#596547]" />
                <span>Studio Baseline Shop</span>
              </div>
              <div className="text-[10px] font-mono text-[#595754] pl-4.5">VANCOUVER • BC</div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer block specifically designed for the Field Supply layout */}
      <footer className="w-full border-t border-[#e3ded5] bg-[#faf8f5] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#1c1b1a]">&copy; 2026 FIELD SUPPLY CO.</span>
            <span className="text-[#8e8a82] font-mono text-xs">•</span>
            <span className="font-mono text-[10px] text-[#595754] uppercase tracking-wider">ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-wider text-[#595754]">
            <a href="#sample-header" className="hover:text-[#1c1b1a] hover:underline underline-offset-4">Back to Top</a>
            <span>•</span>
            <Link href="/" className="hover:text-[#1c1b1a] hover:underline underline-offset-4 flex items-center gap-1">
              <span>Return to Labs</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
