'use client';

import { motion } from 'framer-motion';
import { heroContent } from '@/lib/content/hero';
import HeroAgentChat from './HeroAgentChat';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#f5f5f5]">
      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px',
        }}
      />

      {/* 3-column grid */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-[420px_1fr_480px] gap-0 pt-[72px] min-h-screen">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col justify-center px-8 lg:px-12 py-10 lg:py-16">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-5"
          >
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-[0.15em]">
              {heroContent.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-6">
            {['Meet the workforce', 'that never sleeps.'].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  className="block font-bold text-neutral-900 leading-[1.05]"
                  style={{
                    fontSize: 'clamp(2.2rem, 3.8vw, 3.8rem)',
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
            className="text-neutral-500 leading-relaxed max-w-[320px] mb-8"
            style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Deploy AI Employees that understand your business and execute work across every department.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.0 }}
          >
            <a
              href="#platform"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-[13px] font-semibold px-6 py-3 rounded-full shadow-soft-md transition-all group"
            >
              Explore Platform
              <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 text-[13px] font-medium px-6 py-3 rounded-full border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 shadow-soft transition-all"
            >
              Book a Demo
            </a>
          </motion.div>

          {/* Info card */}
          <motion.div
            className="bg-white rounded-2xl p-5 shadow-soft-md border border-neutral-100 max-w-[280px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-white text-[9px] font-bold">+</div>
              <span className="text-sm font-bold text-neutral-900">1,200+</span>
              <span className="text-[10px] text-neutral-400">hours saved/mo</span>
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed mb-3">
              AI Employees handle approvals, reporting, and customer workflows — automatically.
            </p>
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1">
                {[
                  { l: 'F', bg: '#2563eb' },
                  { l: 'H', bg: '#7c3aed' },
                  { l: 'S', bg: '#0d9488' },
                  { l: 'L', bg: '#ea580c' },
                ].map(({ l, bg }) => (
                  <div
                    key={l}
                    className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[7px] font-bold text-white"
                    style={{ backgroundColor: bg }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <span className="text-[9px] text-neutral-400">Departments active</span>
            </div>
          </motion.div>
        </div>

        {/* ── CENTER COLUMN — Video ── */}
        <motion.div
          className="relative flex items-center justify-center px-4 py-10 lg:py-16 overflow-hidden"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Soft background blob */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(37,99,235,0.04) 0%, transparent 70%)',
            }}
          />
          <div className="relative w-full max-w-[420px]">
            <div className="relative rounded-3xl overflow-hidden shadow-soft-xl border border-neutral-200/60">
              <video
                src="/video1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full object-cover"
                style={{ maxHeight: '580px' }}
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center gap-3 shadow-soft-md border border-white/80">
                  <div className="flex -space-x-1.5">
                    {['#2563eb', '#0d9488', '#7c3aed', '#ea580c', '#f59e0b'].map((c, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <span className="text-[12px] font-semibold text-neutral-800">6 AI Employees deployed</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN — Tabbed Agent Chat ── */}
        <motion.div
          className="flex flex-col px-4 lg:px-6 py-10 lg:py-8 min-h-0"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <HeroAgentChat />
        </motion.div>
      </div>

      {/* Bottom stats bar */}
      <motion.div
        className="relative z-10 border-t border-neutral-200/70 bg-white/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-8 md:gap-16 px-8 py-3.5">
          {[
            { value: '98%', label: 'Automation rate' },
            { value: '10x', label: 'Faster execution' },
            { value: '70%', label: 'Cost reduction' },
            { value: '24/7', label: 'Always on' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm font-bold text-neutral-900">{s.value}</span>
              <span className="text-[11px] text-neutral-400 hidden sm:block">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
