'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { departmentsContent } from '@/lib/content/departments';
import SectionTitle from '@/components/shared/SectionTitle';
import { TrendingUp, Users, BarChart3, Code2, Scale, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Users, BarChart3, Code2, Scale, MessageSquare,
};

const deptBg: Record<string, string> = {
  finance: '#eff6ff',
  hr: '#f0fdfa',
  sales: '#eff6ff',
  engineering: '#f0fdfa',
  legal: '#eff6ff',
  support: '#f0fdfa',
};

const deptBorder: Record<string, string> = {
  finance: '#bfdbfe',
  hr: '#99f6e4',
  sales: '#bfdbfe',
  engineering: '#99f6e4',
  legal: '#bfdbfe',
  support: '#99f6e4',
};

export default function VirtualOffice() {
  const [active, setActive] = useState('finance');
  const dept = departmentsContent.departments.find(d => d.id === active)!;
  const Icon = iconMap[dept.icon];

  return (
    <section id="departments" className="relative py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 section-top-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle
          eyebrow="Virtual Enterprise"
          headline={departmentsContent.headline}
          subheadline={departmentsContent.subheadline}
          className="mb-16"
        />

        <div className="grid lg:grid-cols-[300px_1fr] gap-6 items-start">
          {/* Sidebar selector */}
          <div className="flex flex-col gap-1">
            {departmentsContent.departments.map(d => {
              const DIcon = iconMap[d.icon];
              const isActive = active === d.id;

              return (
                <motion.button
                  key={d.id}
                  onClick={() => setActive(d.id)}
                  className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-soft-md'
                      : 'bg-transparent text-neutral-600 hover:bg-neutral-50'
                  }`}
                  whileHover={{ x: isActive ? 0 : 2 }}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-white/10' : 'bg-neutral-100'
                    }`}
                  >
                    <DIcon
                      size={14}
                      style={{ color: isActive ? '#fff' : d.color }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-neutral-700'}`}>
                    {d.name}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-4 h-4 rounded-full bg-white/15 flex items-center justify-center">
                      <ArrowRight size={9} className="text-white" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="card-elevated rounded-2xl p-7 overflow-hidden relative"
            >
              {/* Background swatch */}
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"
                style={{ backgroundColor: deptBg[active], opacity: 0.6 }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: deptBg[active], border: `1px solid ${deptBorder[active]}` }}
                    >
                      <Icon size={20} style={{ color: dept.color }} />
                    </div>
                    <div>
                      <h3 className="text-neutral-900 font-semibold text-lg">{dept.name}</h3>
                      <p className="text-xs font-mono" style={{ color: dept.color }}>{dept.employee}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-neutral-900">{dept.metric.value}</div>
                    <div className="text-xs text-neutral-400">{dept.metric.label}</div>
                  </div>
                </div>

                <p className="text-neutral-500 text-sm leading-relaxed mb-5">{dept.description}</p>

                {/* Tasks */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {dept.tasks.map(task => (
                    <div key={task} className="flex items-center gap-2 py-2 px-3 bg-neutral-50 rounded-xl border border-neutral-100">
                      <CheckCircle2 size={12} style={{ color: dept.color, flexShrink: 0 }} />
                      <span className="text-xs text-neutral-600">{task}</span>
                    </div>
                  ))}
                </div>

                {/* Activity bars */}
                <div>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium mb-2.5">Real-time activity</p>
                  <div className="flex items-end gap-1 h-10">
                    {Array.from({ length: 20 }).map((_, i) => {
                      const h = 20 + Math.sin(i * 0.9 + active.length) * 35 + Math.sin(i * 1.7) * 15;
                      return (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-sm"
                          style={{ backgroundColor: dept.color, opacity: 0.3 + (i % 3) * 0.15 }}
                          animate={{ height: [`${h * 0.35}%`, `${h}%`, `${h * 0.55}%`] }}
                          transition={{
                            duration: 1.2 + (i % 4) * 0.3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.08,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
