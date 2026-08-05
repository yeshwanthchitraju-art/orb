'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { label: 'Platform', href: '#platform' },
  { label: 'Departments', href: '#departments' },
  { label: 'Enterprise', href: '#security' },
  { label: 'Pricing', href: '#' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 60], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.95)']);
  const shadow = useTransform(scrollY, [0, 60], ['0 0 0 rgba(0,0,0,0)', '0 1px 0 rgba(0,0,0,0.07)']);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundColor: bg,
            boxShadow: shadow,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
         
            <span className="text-neutral-900 font-semibold tracking-tight text-[15px]">Orbiant</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-200 rounded-full hover:bg-neutral-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="#"
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors px-3 py-1.5"
            >
              Sign in
            </a>
            <a
              href="#demo"
              className="text-sm font-medium bg-neutral-900 text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Book a Demo
            </a>
          </div>

          {/* Mobile */}
          <button
            className="md:hidden text-neutral-500 hover:text-neutral-900 transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden bg-white pt-[60px]"
        initial={false}
        animate={mobileOpen ? { opacity: 1, pointerEvents: 'auto' as const } : { opacity: 0, pointerEvents: 'none' as const }}
        transition={{ duration: 0.25 }}
      >
        <div className="border-t border-neutral-100 p-6 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="px-4 py-3 text-base text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </motion.a>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <a href="#" className="px-4 py-3 text-center text-neutral-600 border border-neutral-200 rounded-xl text-sm">
              Sign in
            </a>
            <a href="#demo" className="px-4 py-3 text-center bg-neutral-900 text-white rounded-xl text-sm font-medium">
              Book a Demo
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
