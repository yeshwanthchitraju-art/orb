'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  arrow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', arrow = false, className, children, onClick, ...props }, ref) => {
    const base =
      'relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-full cursor-pointer select-none';

    const variants = {
      primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-blue',
      secondary: 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm',
      outline: 'border border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-300 shadow-soft',
      ghost: 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100',
    };

    const sizes = {
      sm: 'px-4 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3.5 text-[15px]',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        onClick={onClick}
        {...(props as any)}
      >
        {children}
        {arrow && (
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.15 }}
          >
            <ArrowRight size={13} strokeWidth={2.5} />
          </motion.span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
