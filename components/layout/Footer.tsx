'use client';

import { Zap, Twitter, Linkedin, Github } from 'lucide-react';

const footerLinks = {
  Platform: ['AI Employees', 'Workflow Engine', 'Integrations', 'Architecture', 'Security'],
  Company: ['About', 'Careers', 'Blog', 'Press', 'Partners'],
  Resources: ['Documentation', 'API Reference', 'Status', 'Changelog'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'DPA'],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center">
                <Zap size={15} className="text-white" fill="white" />
              </div>
              <span className="text-white font-semibold text-lg">Orbiant</span>
            </a>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-[220px] mb-6">
              The intelligent enterprise platform powering the next generation of AI Employees.
            </p>
            <div className="flex items-center gap-2.5">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white/40 text-[10px] font-semibold tracking-widest uppercase mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-neutral-400 text-sm hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-neutral-500 text-xs">
            © 2026 Orbiant Technologies, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs text-neutral-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
