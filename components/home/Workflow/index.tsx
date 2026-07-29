'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { workflowContent } from '@/lib/content/workflow';
import SectionTitle from '@/components/shared/SectionTitle';
import { Mail, Brain, ShieldCheck, CheckSquare, Database, Bell, Sparkles } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Mail, Brain, ShieldCheck, CheckSquare, Database, Bell, Sparkles,
};

export default function Workflow() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setActive(p => (p + 1) % workflowContent.steps.length), 2000);
    return () => clearInterval(t);
  }, [playing]);

  const step = workflowContent.steps[active];
  const Icon = iconMap[step.icon];

  return (
    <section id="platform" className="relative py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 section-top-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle
          eyebrow={workflowContent.eyebrow}
          headline={workflowContent.headline}
          subheadline={workflowContent.subheadline}
          className="mb-16"
        />

        <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-center">
          {/* Steps list */}
          <div className="space-y-1.5">
            {workflowContent.steps.map((s, i) => {
              const SIcon = iconMap[s.icon];
              const isActive = i === active;
              const isPast = i < active;

              return (
                <div key={s.id} className="relative">
                  {/* Connector */}
                  {i < workflowContent.steps.length - 1 && (
                    <div className="absolute left-[18px] top-[52px] w-0.5 h-5 overflow-hidden bg-neutral-100">
                      <motion.div
                        className="absolute inset-0 origin-top"
                        style={{ backgroundColor: isPast ? '#2563eb' : '#e5e7eb' }}
                        animate={{ scaleY: isPast ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )}

                  <motion.button
                    className={`w-full flex items-start gap-4 p-3 rounded-xl transition-all ${
                      isActive ? 'bg-brand-50 border border-brand-100' : 'hover:bg-neutral-50'
                    }`}
                    onClick={() => { setActive(i); setPlaying(false); }}
                    animate={{ x: isActive ? 2 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                        isActive
                          ? 'bg-brand-600 shadow-blue'
                          : isPast
                          ? 'bg-brand-100'
                          : 'bg-neutral-100'
                      }`}
                    >
                      <SIcon
                        size={14}
                        style={{
                          color: isActive ? '#fff' : isPast ? '#2563eb' : '#9ca3af',
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${isActive ? 'text-brand-700' : isPast ? 'text-neutral-700' : 'text-neutral-400'}`}>
                          {s.label}
                        </span>
                        <span className="text-[10px] text-neutral-300 font-mono">{`0${i + 1}`}</span>
                      </div>
                      <span className={`text-xs ${isActive ? 'text-brand-600' : 'text-neutral-400'}`}>{s.description}</span>

                      {isActive && (
                        <motion.div
                          className="flex items-center gap-1.5 mt-1.5"
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="w-1 h-1 rounded-full bg-brand-500" />
                          <span className="text-[10px] text-brand-600 font-mono">{s.detail}</span>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </div>

          {/* Detail card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="card-elevated rounded-2xl p-7 relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse, ${step.color}10 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-13 h-13 w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: step.color + '12', border: `1px solid ${step.color}25` }}
                >
                  <Icon size={22} style={{ color: step.color }} />
                </div>

                <h3 className="text-neutral-900 font-semibold text-xl mb-2">{step.label}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-5">{step.description}</p>

                <div
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono"
                  style={{ backgroundColor: step.color + '0C', border: `1px solid ${step.color}20`, color: step.color }}
                >
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: step.color }} />
                  {step.detail}
                </div>

                {/* Progress */}
                <div className="mt-6 h-1 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: step.color }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.0, ease: 'linear' }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-neutral-400">Step {active + 1} / {workflowContent.steps.length}</span>
                  <button
                    className="text-[10px] text-brand-600 hover:underline"
                    onClick={() => setPlaying(p => !p)}
                  >
                    {playing ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
