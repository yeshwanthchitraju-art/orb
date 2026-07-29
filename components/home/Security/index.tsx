'use client';

import { motion } from 'framer-motion';
import { securityContent } from '@/lib/content/security';
import SectionTitle from '@/components/shared/SectionTitle';
import { ShieldCheck, Award, Globe, Heart, Lock, Shield, FileText, Key, LogIn, MapPin } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck, Award, Globe, Heart, Lock, Shield, FileText, Key, LogIn, MapPin,
};

export default function Security() {
  return (
    <section id="security" className="relative py-28 bg-white overflow-hidden">
      {/* Radial accent bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(13,148,136,0.06) 0%, transparent 65%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle
          eyebrow={securityContent.eyebrow}
          headline={securityContent.headline}
          subheadline={securityContent.subheadline}
          className="mb-16"
        />

        {/* Certifications */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {securityContent.certifications.map((cert, i) => {
            const CIcon = iconMap[cert.icon];
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-soft rounded-2xl p-5 text-center group hover:shadow-soft-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-3">
                  <CIcon size={16} className="text-teal-600" />
                </div>
                <h4 className="text-neutral-900 font-semibold text-sm mb-1">{cert.name}</h4>
                <p className="text-neutral-400 text-xs leading-relaxed">{cert.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {securityContent.features.map((feature, i) => {
            const FIcon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100 hover:bg-white hover:border-neutral-200 hover:shadow-soft transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0 shadow-soft group-hover:border-brand-200 group-hover:bg-brand-50 transition-colors">
                  <FIcon size={14} className="text-neutral-500 group-hover:text-brand-600 transition-colors" />
                </div>
                <div>
                  <h4 className="text-neutral-800 font-medium text-sm mb-0.5">{feature.label}</h4>
                  <p className="text-neutral-400 text-xs">{feature.sublabel}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
