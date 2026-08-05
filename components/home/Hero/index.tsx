'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import HeroAgentChat from './HeroAgentChat';
import { heroContent } from '@/lib/content/hero';

const stats = [
  { value: '98%', label: 'Automation' },
  { value: '10x', label: 'Faster' },
  { value: '24/7', label: 'Always on' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-50">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg-light opacity-60" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pt-28 lg:pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* ── LEFT: Copy ── */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <span className="label-mono text-brand-600">{heroContent.eyebrow}</span>
            </motion.div>

            <h1 className="heading-xl text-neutral-900 mb-5">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  Meet the workforce
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-gradient-blue"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  that never sleeps.
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="body-lg text-neutral-500 max-w-md mb-8"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Deploy AI Employees that understand your business and execute work across every department — autonomously.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3 mb-10"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <a
                href="#platform"
                className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-soft-md transition-all group"
              >
                Explore Platform
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-full border border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50 transition-all"
              >
                <Play size={13} className="text-brand-600" />
                Book a Demo
              </a>
            </motion.div>

            {/* Stats inline */}
            <motion.div
              className="flex items-center gap-6 lg:gap-8"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {stats.map((s, i) => (
                <div key={i} className={i > 0 ? 'pl-6 lg:pl-8 border-l border-neutral-200' : ''}>
                  <div className="text-xl lg:text-2xl font-bold text-neutral-900">{s.value}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Video + Chat ── */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col xl:flex-row gap-5 lg:gap-6 items-stretch">
            {/* Video */}
            <motion.div
              className="relative flex-1 min-w-0 xl:max-w-[45%]"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-soft-xl border border-neutral-200/60 aspect-[9/16] xl:aspect-auto xl:h-full bg-neutral-100">
                <video
                  src="/video1.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="card-glass rounded-2xl px-4 py-2.5 flex items-center gap-2.5">
                    <div className="flex -space-x-1.5">
                      {['#2563eb', '#0d9488', '#7c3aed', '#ea580c'].map((c, i) => (
                        <div key={i} className="w-5 h-5 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-neutral-800">6 AI Employees deployed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Chat */}
            <motion.div
              className="flex-1 min-w-0 xl:max-w-[55%]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <HeroAgentChat />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
