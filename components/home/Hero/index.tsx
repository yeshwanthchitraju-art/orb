'use client';

import { motion } from 'framer-motion';
import { heroContent } from '@/lib/content/hero';
import HeroChat from './HeroChat';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] max-h-[1000px] flex flex-col overflow-hidden bg-[#fbfbfb]">
      {/* Subtle noise/texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px',
        }}
      />

      {/* Main grid — 3 columns */}
      <div className="relative max-w-9xl m-auto z-10 flex-1 grid grid-cols-[1fr_auto_1fr] pt-[64px] overflow-hidden">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col justify-between px-8 lg:px-12 py-8 lg:py-10">
          {/* Top: headline + subtitle + CTAs */}
          <div className="flex flex-col gap-5 mt-2">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold text-brand-600 uppercase tracking-[0.12em]">
                {/* <span className="w-4 h-px bg-brand-600" /> */}
                {heroContent.eyebrow}
              </span>
            </motion.div>

            {/* Headline — controlled size */}
            <div>
              {['Meet the workforce', 'that never sleeps.'].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h1
                    className="block font-bold text-neutral-900 leading-[1.05]"
                    style={{
                      fontSize: 'clamp(1.9rem, 3.2vw, 3.2rem)',
                      letterSpacing: '-0.03em',
                    }}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.45 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              className="text-neutral-500 leading-relaxed max-w-xs"
              style={{ fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Deploy AI Employees that understand your business and execute work across every department.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-2.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.0 }}
            >
              <a
                href="#platform"
                className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-[13px] font-medium px-5 py-2.5 rounded-full shadow-soft-md transition-all group"
              >
                Explore Platform
                <ArrowRight size={12} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-full border border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50 shadow-soft transition-all"
              >
                Book a Demo
              </a>
            </motion.div>
          </div>

          {/* Bottom: floating info card like the reference */}
          <motion.div
            className="bg-white rounded-2xl p-4 shadow-soft-md border border-neutral-100 max-w-[240px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-white text-[9px] font-bold">+</div>
              <span className="text-sm font-bold text-neutral-900">1,200+</span>
              <span className="text-[10px] text-neutral-400">hours saved/mo</span>
            </div>
            <p className="text-[10px] text-neutral-500 leading-relaxed">
              AI Employees handle approvals, reporting, and customer workflows — automatically.
            </p>
            <div className="mt-2.5 flex items-center gap-1.5">
              <div className="flex -space-x-1">
                {['F', 'H', 'S', 'L'].map((l, i) => (
                  <div key={l} className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[7px] font-bold text-white"
                    style={{ backgroundColor: ['#2563eb', '#0d9488', '#7c3aed', '#ea580c'][i] }}>
                    {l}
                  </div>
                ))}
              </div>
              <span className="text-[9px] text-neutral-400">Departments active</span>
            </div>
          </motion.div>
        </div>

        {/* ── CENTER: Globe ── */}
        <div className="flex items-center justify-center px-4 py-6 relative">
          <motion.div
            className="relative"
            style={{ width: 'min(42vh, 420px)', height: 'min(42vh, 420px)' }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Glow behind globe */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)' }}
            />
            {/* Center visual — chat preview badge */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="bg-white rounded-full px-4 py-2 shadow-soft-md border border-neutral-100 flex items-center gap-2 whitespace-nowrap">
                <div className="flex -space-x-1">
                  {['FIN', 'HR', 'SLS', 'DEV'].map((l, i) => (
                    <div key={l} className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-white text-[6px] font-bold"
                      style={{ backgroundColor: ['#2563eb', '#0d9488', '#7c3aed', '#ea580c'][i] }}>
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-medium text-neutral-600">6 AI Employees deployed</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col px-6 lg:px-8 py-8 lg:py-10 min-h-0 overflow-hidden">
          {/* Top: numbered feature list (like reference) */}
          <motion.div
            className="flex flex-col gap-3 items-end text-right"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
          
          </motion.div>

          {/* Bottom: Live chat */}
          <motion.div
            className="flex-1 mt-4 min-h-0 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <HeroChat />
          </motion.div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <motion.div
        className="relative z-10 border-t border-neutral-200/60 bg-white/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-8 md:gap-16 px-8 py-3">
          {[
            { value: '98%', label: 'Automation rate' },
            { value: '10x', label: 'Faster execution' },
            { value: '70%', label: 'Cost reduction' },
            { value: '24/7', label: 'Always on' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="text-sm font-bold text-neutral-900">{s.value}</span>
              <span className="text-[11px] text-neutral-400 hidden sm:block">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
