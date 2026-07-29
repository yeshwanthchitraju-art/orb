'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';
import { Users, Bot, Zap, BookOpen, Database, Grid3X3, Globe, Cloud, Lock, Activity, Shield, Plug } from 'lucide-react';

const tiers = [
  {
    id: 'users',
    label: 'Your Teams',
    nodes: [{ icon: Users, label: 'Employees & Managers', color: '#374151' }],
    accent: '#e5e7eb',
  },
  {
    id: 'ai',
    label: 'AI Intelligence Layer',
    nodes: [{ icon: Bot, label: 'AI Employees', color: '#2563eb', featured: true }],
    accent: '#bfdbfe',
  },
  {
    id: 'engine',
    label: 'Core Platform',
    nodes: [
      { icon: Zap, label: 'Workflow Engine', color: '#2563eb' },
      { icon: BookOpen, label: 'Knowledge Base', color: '#0d9488' },
    ],
    accent: '#dbeafe',
  },
  {
    id: 'integrations',
    label: 'Enterprise Integrations',
    nodes: [
      { icon: Database, label: 'SAP', color: '#6b7280' },
      { icon: Database, label: 'Oracle', color: '#6b7280' },
      { icon: Grid3X3, label: 'Microsoft 365', color: '#6b7280' },
      { icon: Globe, label: 'Google Workspace', color: '#6b7280' },
      { icon: Cloud, label: 'Salesforce', color: '#6b7280' },
    ],
    accent: '#f3f4f6',
  },
];

const capabilities = [
  { label: 'Multi-tenant isolation', icon: Lock },
  { label: 'Real-time event sync', icon: Zap },
  { label: 'Event-driven architecture', icon: Activity },
  { label: '99.99% uptime SLA', icon: Shield },
];

export default function Architecture() {
  return (
    <section id="platform" className="relative py-28 bg-neutral-50 overflow-hidden">
      <div className="absolute inset-0 dot-bg-light opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle
          eyebrow="Platform Architecture"
          headline="Built for enterprise scale."
          subheadline="A unified intelligence layer that connects your people, processes, and systems."
          className="mb-20"
        />

        <div className="max-w-3xl mx-auto">
          {tiers.map((tier, tierIdx) => (
            <div key={tier.id} className="relative">
              {/* Connector */}
              {tierIdx < tiers.length - 1 && (
                <div className="relative z-10 flex justify-center my-0">
                  <div className="w-px h-8 bg-gradient-to-b from-neutral-200 to-neutral-200" />
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: tierIdx * 0.1 }}
                className="relative z-10"
              >
                <p className="text-center text-[10px] text-neutral-400 uppercase tracking-widest font-medium mb-2.5">
                  {tier.label}
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {tier.nodes.map((node) => {
                    const NodeIcon = node.icon;
                    const featured = (node as any).featured;
                    return (
                      <div
                        key={node.label}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all ${
                          featured
                            ? 'bg-brand-600 text-white shadow-blue'
                            : 'bg-white border border-neutral-200 shadow-soft hover:shadow-soft-md hover:border-neutral-300'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            featured ? 'bg-white/15' : ''
                          }`}
                          style={!featured ? { backgroundColor: node.color + '12' } : {}}
                        >
                          <NodeIcon
                            size={13}
                            style={{ color: featured ? '#fff' : node.color }}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${featured ? 'text-white' : 'text-neutral-700'}`}
                        >
                          {node.label}
                        </span>
                        {featured && (
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Capability pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mt-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {capabilities.map(cap => {
            const CapIcon = cap.icon;
            return (
              <div
                key={cap.label}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full shadow-soft text-sm text-neutral-600"
              >
                <CapIcon size={13} className="text-brand-500" />
                {cap.label}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
