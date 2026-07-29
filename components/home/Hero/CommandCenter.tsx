'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CheckCircle2, Clock, TrendingUp, Activity, Bot, Zap } from 'lucide-react';

const ACTIVITIES = [
  { id: 1, dept: 'Finance', text: 'Invoice #2847 approved — $24,500', icon: '💳', time: '0s', color: '#2563eb' },
  { id: 2, dept: 'HR', text: 'James Park onboarding complete', icon: '👤', time: '2m', color: '#0d9488' },
  { id: 3, dept: 'Sales', text: 'Apex Corp proposal sent', icon: '📋', time: '5m', color: '#2563eb' },
  { id: 4, dept: 'Legal', text: 'NDA reviewed — 3 flags', icon: '📄', time: '8m', color: '#7c3aed' },
  { id: 5, dept: 'Support', text: '156 tickets auto-resolved', icon: '✉️', time: '12m', color: '#0d9488' },
  { id: 6, dept: 'Finance', text: 'Q3 report generated', icon: '📊', time: '18m', color: '#2563eb' },
];

const DEPT_BARS = [
  { name: 'Finance', pct: 94, color: '#2563eb' },
  { name: 'HR', pct: 78, color: '#0d9488' },
  { name: 'Sales', pct: 86, color: '#7c3aed' },
  { name: 'Engineering', pct: 71, color: '#ea580c' },
];

export default function CommandCenter() {
  const [feed, setFeed] = useState(ACTIVITIES.slice(0, 3));
  const [metrics, setMetrics] = useState({ tasks: 1241, saved: 14, active: 47 });
  const [tick, setTick] = useState(0);

  // Cycle a new activity every 2.5s
  useEffect(() => {
    const t = setInterval(() => {
      setTick(n => n + 1);
      setFeed(prev => {
        const next = [...prev];
        const newItem = ACTIVITIES[(ACTIVITIES.indexOf(prev[0]) + 3) % ACTIVITIES.length];
        next.unshift({ ...newItem, time: 'just now' });
        return next.slice(0, 4);
      });
      setMetrics(m => ({ ...m, tasks: m.tasks + Math.floor(Math.random() * 3) + 1 }));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-2 min-h-0 overflow-hidden">
      {/* Header */}
      <div className="bg-neutral-950 rounded-2xl p-3.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
            <Bot size={13} className="text-white" />
          </div>
          <div>
            <p className="text-white text-[11px] font-semibold leading-tight">AI Command Center</p>
            <p className="text-white/40 text-[9px] font-mono">ORBIANT ENTERPRISE</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-teal-400"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-teal-400 text-[9px] font-mono font-medium">LIVE</span>
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-2 flex-shrink-0">
        {[
          { label: 'Tasks done', value: metrics.tasks.toLocaleString(), trend: '+12%', color: '#2563eb' },
          { label: 'Hours saved', value: `${metrics.saved}h`, trend: 'today', color: '#0d9488' },
          { label: 'AI active', value: `${metrics.active}`, trend: 'agents', color: '#7c3aed' },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            className="bg-white rounded-xl p-2.5 border border-neutral-100 shadow-soft"
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
          >
            <div className="text-[15px] font-bold text-neutral-900 leading-tight" style={{ color: m.color }}>
              {m.value}
            </div>
            <div className="text-[9px] text-neutral-400 mt-0.5 leading-tight">{m.label}</div>
            <div className="text-[8px] font-medium mt-0.5" style={{ color: m.color }}>{m.trend}</div>
          </motion.div>
        ))}
      </div>

      {/* Department activity bars */}
      <div className="bg-white rounded-xl p-3 border border-neutral-100 shadow-soft flex-shrink-0">
        <p className="text-[9px] text-neutral-400 uppercase tracking-wider font-medium mb-2.5">Department Load</p>
        <div className="space-y-2">
          {DEPT_BARS.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2">
              <span className="text-[9px] text-neutral-500 w-16 flex-shrink-0">{d.name}</span>
              <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: d.color }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${d.pct}%` }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
              <span className="text-[9px] font-medium w-6 text-right" style={{ color: d.color }}>{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live activity feed */}
      <div className="bg-white rounded-xl border border-neutral-100 shadow-soft flex-1 overflow-hidden">
        <div className="px-3 py-2.5 border-b border-neutral-50 flex items-center justify-between">
          <p className="text-[9px] text-neutral-400 uppercase tracking-wider font-medium">Live Activity</p>
          <div className="flex items-center gap-1">
            <motion.div
              className="w-1 h-1 rounded-full bg-teal-500"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-[8px] text-teal-500 font-medium">streaming</span>
          </div>
        </div>
        <div className="p-2 space-y-1 overflow-hidden">
          <AnimatePresence initial={false}>
            {feed.map((item, i) => (
              <motion.div
                key={`${item.id}-${tick}-${i}`}
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <span className="text-[11px] flex-shrink-0">{item.icon}</span>
                <span className="text-[10px] text-neutral-700 flex-1 truncate">{item.text}</span>
                <span className="text-[9px] text-neutral-300 flex-shrink-0 font-mono">{item.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Mini sparkline chart */}
      <div className="bg-white rounded-xl p-3 border border-neutral-100 shadow-soft flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[9px] text-neutral-400 uppercase tracking-wider font-medium">Automation Rate</p>
          <span className="text-[10px] font-bold text-brand-600">98.4%</span>
        </div>
        <div className="flex items-end gap-0.5 h-8">
          {[60, 72, 65, 80, 75, 88, 82, 91, 87, 95, 92, 98].map((v, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-brand-100"
              style={{ minHeight: '4px' }}
              initial={{ height: '4px' }}
              animate={{ height: `${(v / 100) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                className="w-full h-full rounded-sm"
                style={{ backgroundColor: `rgba(37,99,235,${0.3 + (v / 100) * 0.7})` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
