'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { departmentsContent } from '@/lib/content/departments';
import { TrendingUp, Users, BarChart3, Code2, Scale, MessageSquare, Bot, Send } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Users, BarChart3, Code2, Scale, MessageSquare,
};

const conversations: Record<string, Array<{ role: 'user' | 'ai'; text: string; delay: number }>> = {
  finance: [
    { role: 'user', text: '47 invoices need approval before end of quarter.', delay: 0 },
    { role: 'ai', text: 'Reviewed all 47. 43 match POs and are within budget — approved automatically. 4 exceed the $50K threshold and are routed to you for sign-off.', delay: 700 },
    { role: 'user', text: 'Generate the Q3 cash flow report.', delay: 1500 },
    { role: 'ai', text: 'Q3 Cash Flow Report ready. Net cash: +$2.4M. AR improved 18%, AP cycle optimized 3 days. PDF and Excel delivered to your inbox.', delay: 2400 },
  ],
  hr: [
    { role: 'user', text: '3 new hires start Monday. Set up onboarding.', delay: 0 },
    { role: 'ai', text: 'Done. Equipment provisioned, accounts activated, 30-60-90 day plans drafted. Welcome emails scheduled for Monday 8AM local time.', delay: 700 },
    { role: 'user', text: 'Sarah submitted a leave request for next week.', delay: 1500 },
    { role: 'ai', text: "Sarah's leave approved — 12 days remaining. Team coverage confirmed, calendar blocked, Sarah notified. Zero conflicts with current sprints.", delay: 2400 },
  ],
  sales: [
    { role: 'user', text: 'Meeting with Apex Corp tomorrow. Brief me.', delay: 0 },
    { role: 'ai', text: 'Apex Corp: 850 employees, Series C. Pain point: manual AR processes. Decision maker: Marcus Webb (CTO). Last contact: 14 days ago. Lead angle: ROI on automation.', delay: 700 },
    { role: 'user', text: 'Draft a $120K proposal for them.', delay: 1500 },
    { role: 'ai', text: 'Proposal drafted. 3 ROI scenarios, 12-week implementation timeline, Apex-specific case study included. Awaiting your review before sending.', delay: 2400 },
  ],
  engineering: [
    { role: 'user', text: 'P1 incident — API latency spike on production.', delay: 0 },
    { role: 'ai', text: 'Root cause: DB connection pool exhausted. Auto-scaling triggered. Latency recovering: 340ms → 48ms. Incident report and post-mortem template ready.', delay: 700 },
    { role: 'user', text: 'Review the PR before this afternoon\'s deploy.', delay: 1500 },
    { role: 'ai', text: 'PR reviewed. 2 performance issues and 1 SQL injection risk flagged (line 47). Tests pass. Suggesting 3 improvements. Ready to approve after fixes.', delay: 2400 },
  ],
  legal: [
    { role: 'user', text: 'Review TechPartners NDA before Friday.', delay: 0 },
    { role: 'ai', text: '3 clauses flagged: IP ownership (4.2), termination notice (8), jurisdiction (12). Redlines prepared. Recommend legal counsel review clause 4.2 before signing.', delay: 700 },
    { role: 'user', text: 'Generate a standard MSA for a new SaaS client.', delay: 1500 },
    { role: 'ai', text: 'MSA generated from your template library. SLA terms, GDPR-compliant DPA, and liability cap included. Ready for client review.', delay: 2400 },
  ],
  support: [
    { role: 'user', text: '200 tickets in queue, only 3 agents on shift.', delay: 0 },
    { role: 'ai', text: 'Handling Tier 1 now. 156 resolved automatically (resets, billing, how-to). 44 complex issues routed with full context summaries. Queue cleared.', delay: 700 },
    { role: 'user', text: 'Acme Corp escalating about a billing dispute.', delay: 1500 },
    { role: 'ai', text: 'Found duplicate charge of $480 in March. Refund initiated, apology email with $100 credit sent. Executive summary ready for your call.', delay: 2400 },
  ],
};

export default function AIEmployees() {
  const [activeDept, setActiveDept] = useState('finance');
  const [visible, setVisible] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dept = departmentsContent.departments.find(d => d.id === activeDept)!;
  const conv = conversations[activeDept] || [];

  useEffect(() => {
    setVisible(0);
    const timers = conv.map((_, i) =>
      setTimeout(() => setVisible(i + 1), conv[i].delay + 300)
    );
    return () => timers.forEach(clearTimeout);
  }, [activeDept]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [visible]);

  return (
    <section className="relative py-28 bg-neutral-50 overflow-hidden">
      <div className="absolute inset-0 dot-bg-light opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle
          eyebrow="AI Employee Experience"
          headline={['See AI Employees', 'in action.']}
          subheadline="Live conversations showing how AI Employees handle real workflows across every department."
          className="mb-14"
        />

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Department tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {departmentsContent.departments.map(d => {
              const DIcon = iconMap[d.icon];
              const isActive = activeDept === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDept(d.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left whitespace-nowrap lg:whitespace-normal transition-all flex-shrink-0 ${
                    isActive
                      ? 'bg-white shadow-soft-md border border-neutral-200 text-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-700 hover:bg-white/60'
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: isActive ? d.color + '15' : '#f3f4f6' }}
                  >
                    <DIcon size={13} style={{ color: isActive ? d.color : '#9ca3af' }} />
                  </div>
                  <span className="text-sm font-medium">{d.name}</span>
                </button>
              );
            })}
          </div>

          {/* Chat window */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDept}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl border border-neutral-200 shadow-soft-md overflow-hidden flex flex-col"
              style={{ minHeight: '460px' }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-100 bg-neutral-50/70">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: dept.color + '15' }}
                >
                  <Bot size={15} style={{ color: dept.color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{dept.employee}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 block" />
                    <span className="text-[10px] text-teal-600 font-medium">Active now</span>
                  </div>
                </div>
                <div
                  className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-medium"
                  style={{ backgroundColor: dept.color + '12', color: dept.color }}
                >
                  {dept.name}
                </div>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 p-5 space-y-4 overflow-y-auto"
                style={{ maxHeight: '320px' }}
              >
                {conv.slice(0, visible).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'ai' && (
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center mr-2 flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: dept.color + '15' }}
                      >
                        <Bot size={10} style={{ color: dept.color }} />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-neutral-900 text-white rounded-tr-sm'
                          : 'rounded-tl-sm text-neutral-800'
                      }`}
                      style={
                        msg.role === 'ai'
                          ? { backgroundColor: dept.color + '10', border: `1px solid ${dept.color}22` }
                          : {}
                      }
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {visible < conv.length && (
                  <div className="flex justify-start">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center mr-2"
                      style={{ backgroundColor: dept.color + '15' }}
                    >
                      <Bot size={10} style={{ color: dept.color }} />
                    </div>
                    <div
                      className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1"
                      style={{ backgroundColor: dept.color + '10', border: `1px solid ${dept.color}22` }}
                    >
                      {[0, 1, 2].map(j => (
                        <motion.div
                          key={j}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: dept.color }}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.55, repeat: Infinity, delay: j * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="px-4 py-3.5 border-t border-neutral-100 flex items-center gap-2.5">
                <div className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm text-neutral-400">
                  Ask {dept.employee.split(' ')[0]} a question...
                </div>
                <button
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                  style={{ backgroundColor: dept.color, color: '#fff' }}
                >
                  <Send size={13} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
