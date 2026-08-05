'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

type Msg = { role: 'user' | 'ai'; text: string };

const AGENTS = [
  {
    id: 'operations',
    name: 'Operations',
    color: '#2563eb',
    bg: '#eff6ff',
    abbr: 'OPS',
    messages: [
      { role: 'ai', text: "Hi! I'm your Operations Agent. I streamline workflows and reduce cycle times.\n\nHow can I help?" },
      { role: 'user', text: 'Show me the status of ongoing processes.' },
      { role: 'ai', text: "Here's your current status:\n\n• Order Fulfillment — On Track\n• Vendor Management — Delayed\n• Invoice Processing — On Track\n• Quality Check — Completed" },
      { role: 'user', text: "What's causing the Vendor delay?" },
      { role: 'ai', text: "Pending approvals from Vendor A and B. Want me to escalate?" },
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    color: '#0d9488',
    bg: '#f0fdfa',
    abbr: 'FIN',
    messages: [
      { role: 'ai', text: "Hi! I'm your Finance Agent — invoices, approvals, reporting.\n\nWhat can I do?" },
      { role: 'user', text: '47 invoices need approval before EOD.' },
      { role: 'ai', text: "Reviewed all 47:\n\n• 43 match POs — auto-approved\n• 4 exceed $50K → routed to you\n\nNet exposure: $312K. Notify approvers?" },
      { role: 'user', text: 'Yes, and generate Q3 cash flow summary.' },
      { role: 'ai', text: "Done!\n\n• Net cash: +$2.4M\n• AR improved 18%\n• AP cycle optimized 3 days\n\nPDF sent to your inbox." },
    ],
  },
  {
    id: 'support',
    name: 'Support',
    color: '#7c3aed',
    bg: '#f5f3ff',
    abbr: 'SUP',
    messages: [
      { role: 'ai', text: "Hey! I'm your Support Agent. I resolve tickets and keep CSAT high.\n\nHow can I help?" },
      { role: 'user', text: '200 tickets in queue, only 3 agents on shift.' },
      { role: 'ai', text: "On it!\n\n• 156 resolved automatically\n• 44 routed with full context\n\nQueue cleared. Agents free for escalations." },
      { role: 'user', text: 'Acme Corp is escalating a billing dispute.' },
      { role: 'ai', text: "Found it — duplicate $480 charge in March. Refund + $100 credit sent.\n\nExecutive summary ready for your call." },
    ],
  },
  {
    id: 'hr',
    name: 'HR',
    color: '#ea580c',
    bg: '#fff7ed',
    abbr: 'HR',
    messages: [
      { role: 'ai', text: "Hello! I'm your HR Agent — onboarding, leave, policies.\n\nWhat do you need?" },
      { role: 'user', text: '3 new hires start Monday. Set up onboarding.' },
      { role: 'ai', text: "All set for Monday:\n\n• Equipment provisioned\n• Accounts activated\n• 30-60-90 day plans drafted\n• Welcome emails scheduled 8AM" },
      { role: 'user', text: 'Sarah submitted a leave request for next week.' },
      { role: 'ai', text: "Approved! 12 days remaining.\n\n• Team coverage confirmed\n• Calendar blocked\n• Sarah notified" },
    ],
  },
  {
    id: 'sales',
    name: 'Sales',
    color: '#0ea5e9',
    bg: '#f0f9ff',
    abbr: 'SLS',
    messages: [
      { role: 'ai', text: "Hi! I'm your Sales Agent — leads, proposals, CRM.\n\nHow can I help close more deals?" },
      { role: 'user', text: 'Meeting with Apex Corp tomorrow. Brief me.' },
      { role: 'ai', text: "Apex Corp brief:\n\n• 850 employees, Series C\n• Pain: manual AR processes\n• Decision maker: Marcus Webb (CTO)\n• Angle: ROI on automation" },
      { role: 'user', text: 'Draft a $120K proposal.' },
      { role: 'ai', text: "Drafted!\n\n• 3 ROI scenarios\n• 12-week timeline\n• Apex-specific case study\n\nAwaiting your review." },
    ],
  },
] as const;

const DELAYS = [0, 800, 1700, 2600, 3600];

export default function HeroAgentChat() {
  const [activeId, setActiveId] = useState('operations');
  const [visible, setVisible] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const agent = AGENTS.find(a => a.id === activeId)!;

  useEffect(() => {
    setVisible(0);
    const timers = DELAYS.slice(0, agent.messages.length).map((delay, i) =>
      setTimeout(() => setVisible(i + 1), delay + 300)
    );
    return () => timers.forEach(clearTimeout);
  }, [activeId, agent.messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [visible]);

  return (
    <div className="flex flex-col bg-white rounded-3xl border border-neutral-200 shadow-soft-lg overflow-hidden h-[520px] sm:h-[560px] xl:h-full xl:max-h-[640px]">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-3 pt-3 border-b border-neutral-100 overflow-x-auto scrollbar-none">
        {AGENTS.map(a => {
          const isActive = activeId === a.id;
          return (
            <button
              key={a.id}
              onClick={() => setActiveId(a.id)}
              className={`relative flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-colors ${
                isActive ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <span
                className="w-4 h-4 rounded-md flex items-center justify-center text-[7px] font-bold flex-shrink-0"
                style={{ backgroundColor: isActive ? a.color : '#e5e7eb', color: isActive ? '#fff' : '#9ca3af' }}
              >
                {a.abbr[0]}
              </span>
              {a.name}
              {isActive && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                  style={{ backgroundColor: a.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2.5 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-2.5"
          >
            {agent.messages.slice(0, visible).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-neutral-900 text-white rounded-br-md'
                      : 'rounded-bl-md text-neutral-700'
                  }`}
                  style={
                    msg.role === 'ai'
                      ? { backgroundColor: agent.bg, border: `1px solid ${agent.color}1a` }
                      : {}
                  }
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Typing */}
            {visible < agent.messages.length && visible > 0 && (
              <div className="flex justify-start">
                <div
                  className="px-3.5 py-3 rounded-2xl rounded-bl-md flex items-center gap-1"
                  style={{ backgroundColor: agent.bg, border: `1px solid ${agent.color}1a` }}
                >
                  {[0, 1, 2].map(j => (
                    <motion.div
                      key={j}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: agent.color }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.55, repeat: Infinity, delay: j * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-neutral-100 flex items-center gap-2">
        <div className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-400">
          Type your message...
        </div>
        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-90"
          style={{ backgroundColor: agent.color }}
          aria-label="Send"
        >
          <Send size={14} className="text-white" />
        </button>
      </div>
    </div>
  );
}
