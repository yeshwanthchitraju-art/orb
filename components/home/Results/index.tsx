'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { resultsContent } from '@/lib/content/results';
import SectionTitle from '@/components/shared/SectionTitle';

function CountUp({ target, suffix, duration = 1.8 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    function tick() {
      const progress = Math.min((Date.now() - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Results() {
  return (
    <section className="relative py-28 bg-neutral-950 text-white overflow-hidden">
      {/* Subtle radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)' }}
      />
      {/* Grid */}
      <div className="absolute inset-0 grid-bg-light pointer-events-none opacity-30" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-medium bg-white/10 border border-white/15 text-white/70 mb-4">
            <span className="w-1 h-1 rounded-full bg-teal-400 block" />
            {resultsContent.eyebrow}
          </span>
          <h2 className="heading-xl text-white mb-3">{resultsContent.headline}</h2>
        </div>

        {/* Big stat numbers */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-20">
          {resultsContent.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-1.5" style={{ letterSpacing: '-0.04em' }}>
                <CountUp target={stat.value} suffix={stat.suffix} duration={1.6 + i * 0.2} />
              </div>
              <div className="text-sm font-medium text-white/70 mb-1">{stat.label}</div>
              <div className="text-xs text-white/35">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Case studies */}
        <div className="grid md:grid-cols-3 gap-5">
          {resultsContent.caseStudies.map((study, i) => (
            <motion.div
              key={study.company}
              className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/[0.14] transition-all group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold bg-white/10 text-white/70">
                  {study.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{study.company}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">{study.industry}</div>
                </div>
              </div>
              <div className="mb-3">
                <div
                  className="text-4xl font-bold mb-0.5"
                  style={{ color: i % 2 === 0 ? '#60a5fa' : '#2dd4bf' }}
                >
                  {study.result}
                </div>
                <div className="text-sm text-white/60">{study.metric}</div>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">{study.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
