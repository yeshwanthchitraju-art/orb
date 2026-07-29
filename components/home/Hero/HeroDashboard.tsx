'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Clock, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

const feed = [
  { text: 'Invoice #2847 approved', dept: 'Finance', time: 'just now', ok: true },
  { text: 'J. Park onboarding complete', dept: 'HR', time: '2m', ok: true },
  { text: 'Contract NDA reviewed', dept: 'Legal', time: '8m', ok: true },
  { text: 'Q3 report generated', dept: 'Finance', time: '15m', ok: true },
  { text: 'Lead qualified — Apex Corp', dept: 'Sales', time: '22m', ok: true },
];

export default function HeroDashboard() {
  const [visible, setVisible] = useState(2);
  const [pct, setPct] = useState(91);

  useEffect(() => {
    const t1 = setInterval(() => setVisible(v => Math.min(v + 1, feed.length)), 1800);
    const t2 = setInterval(() => setPct(v => (v >= 98 ? 91 : v + 1)), 2200);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <div className="w-full max-w-[320px]">
      {/* Main card */}
      <motion.div
        className="card-elevated rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Header bar */}
        <div className="bg-neutral-950 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[9px] font-medium tracking-widest uppercase mb-0.5">Orbiant</p>
            <p className="text-white text-xs font-medium">AI Command Center</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-400 text-[9px] font-mono uppercase tracking-wider">Live</span>
          </div>
        </div>

        {/* Metrics row */}
        <div className="px-4 pt-4 pb-3 border-b border-neutral-100">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Automation', value: `${pct}%`, color: '#2563eb' },
              { label: 'Active AIs', value: '47', color: '#0d9488' },
              { label: 'Saved today', value: '14h', color: '#2563eb' },
            ].map(m => (
              <div key={m.label} className="bg-neutral-50 rounded-xl p-2.5 text-center border border-neutral-100">
                <div className="text-base font-bold" style={{ color: m.color }}>{m.value}</div>
                <div className="text-[9px] text-neutral-400 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="px-4 py-3">
          <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-medium mb-2.5">Recent activity</p>
          <div className="space-y-1.5">
            {feed.slice(0, visible).map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2.5 py-1"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle2 size={12} className="text-teal-500 flex-shrink-0" />
                <span className="text-[11px] text-neutral-700 flex-1 truncate">{item.text}</span>
                <span className="text-[9px] text-neutral-400 flex-shrink-0">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating cards */}
      <motion.div
        className="absolute -top-10 -left-20 card-glass rounded-xl px-3 py-2.5 flex items-center gap-2.5"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.6 }}
        style={{ animation: 'float 5s ease-in-out infinite' }}
      >
        <div className="w-7 h-7 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center">
          <TrendingUp size={12} className="text-brand-600" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-neutral-900">92% faster</p>
          <p className="text-[9px] text-neutral-400">than manual work</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-8 -right-8 card-glass rounded-xl px-3 py-2.5 flex items-center gap-2.5"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.8 }}
        style={{ animation: 'float-alt 7s ease-in-out infinite' }}
      >
        <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
          <Zap size={12} className="text-teal-600" fill="currentColor" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-neutral-900">Invoice approved</p>
          <p className="text-[9px] text-neutral-400">$24,500 · Aria AI</p>
        </div>
      </motion.div>
    </div>
  );
}
