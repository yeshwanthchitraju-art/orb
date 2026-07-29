'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  eyebrow?: string;
  headline: string | string[];
  subheadline?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  headline,
  subheadline,
  align = 'center',
  className,
}: SectionTitleProps) {
  const lines = Array.isArray(headline) ? headline : [headline];

  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge-blue inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide">
            <span className="w-1 h-1 rounded-full bg-brand-500 block" />
            {eyebrow}
          </span>
        </motion.div>
      )}

      <motion.h2
        className="heading-xl text-neutral-900"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </motion.h2>

      {subheadline && (
        <motion.p
          className={cn(
            'body-lg text-neutral-500 max-w-2xl',
            align === 'center' && 'text-center'
          )}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subheadline}
        </motion.p>
      )}
    </div>
  );
}
