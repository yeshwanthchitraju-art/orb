'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const storyItems = [
  'Every business has work.',
  'Approvals.',
  'Invoices.',
  'Emails.',
  'Customers.',
  'Projects.',
  'Reports.',
  'Meetings.',
  'Documentation.',
  'AI Employees handle them all.',
];

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      const idx = Math.floor(v * storyItems.length);
      setActiveIndex(Math.min(idx, storyItems.length - 1));
    });
    return unsub;
  }, [scrollYProgress]);

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#ffffff', '#f0f6ff', '#f7f9ff']
  );

  return (
    <section ref={containerRef} style={{ height: `${storyItems.length * 70}vh` }} className="relative">
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {/* Subtle dot grid */}
        <div className="absolute inset-0 dot-bg-light opacity-60 pointer-events-none" />

        {/* Progress dots */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-1.5">
          {storyItems.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full"
              animate={{
                width: i === activeIndex ? '20px' : '5px',
                backgroundColor: i <= activeIndex ? '#2563eb' : '#e5e7eb',
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <div className="relative text-center px-6 max-w-4xl">
          <div className="relative h-44 flex items-center justify-center">
            {storyItems.map((item, i) => {
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;

              return (
                <motion.div
                  key={item}
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    opacity: isActive ? 1 : isPast ? 0 : 0,
                    y: isActive ? 0 : isPast ? -32 : 24,
                    scale: isActive ? 1 : 0.94,
                    filter: isActive ? 'blur(0px)' : 'blur(6px)',
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <h2
                    className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight text-center ${
                      i === storyItems.length - 1
                        ? 'text-gradient-blue'
                        : 'text-neutral-900'
                    }`}
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    {item}
                  </h2>
                </motion.div>
              );
            })}
          </div>

          {/* Step counter */}
          <motion.p
            className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium mt-12"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {activeIndex + 1} of {storyItems.length}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
