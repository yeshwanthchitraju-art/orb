'use client';

import { motion } from 'framer-motion';
import { trustedContent } from '@/lib/content/trusted';

export default function Trusted() {
  const doubled = [...trustedContent.companies, ...trustedContent.companies];

  return (
    <section className="relative py-14 bg-neutral-50 border-y border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-7">
        <motion.p
          className="text-center text-xs text-neutral-400 uppercase tracking-widest font-medium"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {trustedContent.label}
        </motion.p>
      </div>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #f9fafb, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #f9fafb, transparent)' }}
        />

        <div className="flex animate-marquee gap-12 w-max">
          {doubled.map((company, i) => (
            <div key={`${company.name}-${i}`} className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-7 h-7 rounded-md bg-white border border-neutral-200 flex items-center justify-center shadow-soft">
                <span className="text-[8px] font-bold text-brand-600">{company.abbr}</span>
              </div>
              <span className="text-neutral-400 text-sm font-medium group-hover:text-neutral-600 transition-colors whitespace-nowrap">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
