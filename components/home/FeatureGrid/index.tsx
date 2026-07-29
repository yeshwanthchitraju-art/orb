'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';
import { Zap, BookOpen, Plug, ShieldCheck, ChartBar as BarChart3, Clock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Workflow Engine',
    description: 'Design multi-step automations with branching logic, approvals, and real-time triggers.',
    color: '#2563eb',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Base',
    description: 'AI Employees learn your policies, docs, and historical data instantly.',
    color: '#0d9488',
    span: '',
  },
  {
    icon: Plug,
    title: '200+ Integrations',
    description: 'Connect SAP, Oracle, Salesforce, and more out of the box.',
    color: '#2563eb',
    span: '',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    description: 'SOC 2, ISO 27001, GDPR, and HIPAA compliant by default.',
    color: '#0d9488',
    span: '',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track every task, approval, and outcome across all departments.',
    color: '#2563eb',
    span: 'lg:col-span-2',
  },
  {
    icon: Clock,
    title: '24/7 Operation',
    description: 'AI Employees never sleep, never take breaks, and never miss a deadline.',
    color: '#0d9488',
    span: '',
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 dot-bg-light opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle
          eyebrow="Platform Capabilities"
          headline={['Everything you need to', 'deploy AI at scale.']}
          subheadline="A complete platform that handles the full lifecycle of AI Employees — from deployment to monitoring."
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative group bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-soft-md hover:border-neutral-300 transition-all overflow-hidden ${feature.span}`}
              >
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-[0.06] pointer-events-none transition-opacity group-hover:opacity-[0.12]"
                  style={{ backgroundColor: feature.color }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                    style={{ backgroundColor: feature.color + '12', border: `1px solid ${feature.color}22` }}
                  >
                    <Icon size={18} style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-neutral-900 font-semibold text-base mb-1.5">{feature.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
