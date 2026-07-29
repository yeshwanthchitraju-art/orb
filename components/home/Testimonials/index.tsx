'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { testimonialsContent } from '@/lib/content/testimonials';
import SectionTitle from '@/components/shared/SectionTitle';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const items = testimonialsContent.items;

  return (
    <section className="relative py-28 bg-neutral-50 overflow-hidden">
      <div className="absolute inset-0 dot-bg-light opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle
          eyebrow={testimonialsContent.eyebrow}
          headline={testimonialsContent.headline}
          className="mb-14"
        />

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white rounded-3xl border border-neutral-200 shadow-soft-lg p-8 md:p-12 relative overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-teal-400 rounded-t-3xl" />

              {/* Large quote mark */}
              <div className="text-8xl font-serif text-neutral-100 leading-none mb-4 select-none -mt-2">"</div>

              <blockquote className="text-neutral-700 text-lg md:text-xl leading-relaxed font-light mb-8 -mt-6">
                {items[active].quote}
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 border border-brand-200 flex items-center justify-center text-sm font-bold text-brand-700">
                    {items[active].avatar}
                  </div>
                  <div>
                    <div className="text-neutral-900 font-semibold">{items[active].author}</div>
                    <div className="text-neutral-500 text-sm">{items[active].title}</div>
                  </div>
                </div>
                <span className="badge-blue hidden sm:block px-3 py-1.5 rounded-full text-[11px] font-medium">
                  {items[active].company}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="flex items-center justify-between mt-7">
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-brand-600' : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActive(i => (i === 0 ? items.length - 1 : i - 1))}
                className="w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-soft flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 transition-colors"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => setActive(i => (i === items.length - 1 ? 0 : i + 1))}
                className="w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-soft flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 transition-colors"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
