'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const trust = ['No credit card required', '14-day free trial', 'SOC2 certified', 'Deploy in weeks'];

export default function CTA() {
  return (
    <section id="demo" className="relative py-32 bg-white overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 65%)',
        }}
      />
      <div className="absolute inset-0 dot-bg-light opacity-60 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          className="flex justify-center mb-7"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge-blue inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-medium">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-500" />
            </span>
            Ready to deploy
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="heading-xl text-neutral-900 mb-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Ready to build your{' '}
          <span className="text-gradient-blue">AI workforce?</span>
        </motion.h2>

        <motion.p
          className="body-lg text-neutral-500 max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          Deploy AI Employees in weeks, not years. Join the enterprises already operating at the speed of AI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-[15px] font-medium px-8 py-3.5 rounded-full shadow-blue hover:shadow-blue-lg transition-all group"
          >
            Start Free Trial
            <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[15px] font-medium px-8 py-3.5 rounded-full border border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50 shadow-soft transition-all"
          >
            Schedule a Demo
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          className="flex items-center justify-center flex-wrap gap-5 text-neutral-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {trust.map(item => (
            <div key={item} className="flex items-center gap-1.5 text-xs">
              <CheckCircle2 size={13} className="text-teal-500" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
