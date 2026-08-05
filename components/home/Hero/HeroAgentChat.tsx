'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Bot, Send, RefreshCw } from 'lucide-react';

type Msg = { role: 'user' | 'ai'; text: string };

const AGENTS: {
  id: string;
  name: string;
  label: string;
  color: string;
  bg: string;
  abbr: string;
  tagline: string;
  messages: Msg[];
}[] = [
  {
    id: 'operations',
    name: 'Operations Agent',
    label: 'Operations',
    abbr: 'OPS',
    color: '#2563eb',
    bg: '#eff6ff',
    tagline: 'Streamlines processes and reduces cycle times.',
    messages: [
      { role: 'ai', text: "Hello! I'm your Operations Agent.\nI can help streamline your workflows, reduce cycle time, and improve operational efficiency.\n\nHow can I assist you today?" },
      { role: 'user', text: 'Can you show me the status of our ongoing processes?' },
      { role: 'ai', text: "Sure! Here's the current status of your key processes:\n\n• Order Fulfillment — On Track\n• Vendor Management — Delayed\n• Invoice Processing — On Track\n• Quality Check — Completed" },
      { role: 'user', text: "What's causing the delay in Vendor Management?" },
      { role: 'ai', text: "The delay is due to pending approvals from Vendor A and B. Would you like me to escalate this?" },
    ],
  },
  {
    id: 'finance',
    name: 'Finance Agent',
    label: 'Finance',
    abbr: 'FIN',
    color: '#0d9488',
    bg: '#f0fdfa',
    tagline: 'Reconciles data and improves CFO decisions.',
    messages: [
      { role: 'ai', text: "Hi! I'm your Finance Agent.\nI handle invoices, approvals, reporting, and real-time financial analytics.\n\nWhat can I help with?" },
      { role: 'user', text: '47 invoices need approval before EOD.' },
      { role: 'ai', text: "Reviewed all 47 invoices:\n\n• 43 match POs — auto-approved\n• 4 exceed $50K threshold → routed to you\n\nNet exposure: $312,000. Shall I notify the approvers?" },
      { role: 'user', text: 'Yes, and generate the Q3 cash flow summary.' },
      { role: 'ai', text: "Done! Q3 Cash Flow Summary:\n\n• Net cash: +$2.4M\n• AR improved 18%\n• AP cycle optimized by 3 days\n\nPDF sent to your inbox." },
    ],
  },
  {
    id: 'support',
    name: 'Support Agent',
    label: 'Support',
    abbr: 'SUP',
    color: '#7c3aed',
    bg: '#f5f3ff',
    tagline: 'Resolves texts and improves CSAT.',
    messages: [
      { role: 'ai', text: "Hey! I'm your Customer Support Agent.\nI resolve tickets instantly, route escalations, and keep CSAT scores high.\n\nHow can I help?" },
      { role: 'user', text: '200 tickets in queue, only 3 agents on shift.' },
      { role: 'ai', text: "On it! Handling Tier 1 now:\n\n• 156 resolved automatically (resets, billing, how-to)\n• 44 complex issues routed with full context\n\nQueue cleared. Your agents are free for escalations." },
      { role: 'user', text: 'Acme Corp is escalating a billing dispute.' },
      { role: 'ai', text: "Found it — duplicate charge of $480 in March. Refund initiated + $100 credit sent with apology.\n\nExecutive summary ready for your call." },
    ],
  },
  {
    id: 'hr',
    name: 'HR Agent',
    label: 'HR',
    abbr: 'HR',
    color: '#ea580c',
    bg: '#fff7ed',
    tagline: 'Handles onboarding and employee support.',
    messages: [
      { role: 'ai', text: "Hello! I'm your HR Agent.\nI manage onboarding, leave requests, policies, and employee lifecycle events.\n\nWhat do you need?" },
      { role: 'user', text: '3 new hires start Monday. Set up onboarding.' },
      { role: 'ai', text: "All set for Monday:\n\n• Equipment provisioned\n• Accounts activated\n• 30-60-90 day plans drafted\n• Welcome emails scheduled for 8AM local time" },
      { role: 'user', text: 'Sarah submitted a leave request for next week.' },
      { role: 'ai', text: "Approved! Sarah has 12 days remaining.\n\n• Team coverage confirmed\n• Calendar blocked\n• Sarah notified\n\nZero conflicts with current sprint." },
    ],
  },
  {
    id: 'sales',
    name: 'Sales Agent',
    label: 'Sales',
    abbr: 'SLS',
    color: '#0ea5e9',
    bg: '#f0f9ff',
    tagline: 'Finds opportunities and closes more deals.',
    messages: [
      { role: 'ai', text: "Hi! I'm your Sales Agent.\nI qualify leads, draft proposals, and keep your CRM up to date automatically.\n\nHow can I help close more deals?" },
      { role: 'user', text: 'Meeting with Apex Corp tomorrow. Brief me.' },
      { role: 'ai', text: "Apex Corp brief:\n\n• 850 employees, Series C\n• Pain point: manual AR processes\n• Decision maker: Marcus Webb (CTO)\n• Last contact: 14 days ago\n• Lead angle: ROI on automation" },
      { role: 'user', text: 'Draft a $120K proposal for them.' },
      { role: 'ai', text: "Proposal drafted!\n\n• 3 ROI scenarios included\n• 12-week implementation timeline\n• Apex-specific case study attached\n\nAwaiting your review before sending." },
    ],
  },
];

const DELAYS = [0, 900, 1800, 2800, 3800];

export default function HeroAgentChat() {
  const [activeId, setActiveId] = useState('operations');
  const [visible, setVisible] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const agent = AGENTS.find(a => a.id === activeId)!;

  useEffect(() => {
    setVisible(0);
    const timers = DELAYS.slice(0, agent.messages.length).map((delay, i) =>
      setTimeout(() => setVisible(i + 1), delay + 400)
    );
    return () => timers.forEach(clearTimeout);
  }, [activeId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [visible]);

  return (
    <div className="flex flex-col h-full min-h-0" style={{ maxHeight: 'calc(100vh - 120px)' }}>
      {/* Agent selector */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-soft-md p-4 mb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-neutral-700">AI Agents</h3>
          <RefreshCw size={11} className="text-neutral-400" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {AGENTS.map(a => {
            const isActive = activeId === a.id;
            return (
              <button
                key={a.id}
                onClick={() => setActiveId(a.id)}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl flex-shrink-0 w-[82px] transition-all border ${
                  isActive
                    ? 'border-neutral-200 bg-white shadow-soft-md'
                    : 'border-transparent hover:bg-neutral-50'
                }`}
              >
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all"
                  style={{
                    backgroundColor: isActive ? a.color : '#f3f4f6',
                    color: isActive ? '#fff' : '#9ca3af',
                  }}
                >
                  {a.abbr}
                </div>
                <span className={`text-[10px] font-medium text-center leading-tight ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`}>
                  {a.name}
                </span>
                <span className="text-[9px] text-neutral-400 text-center leading-tight hidden sm:block">
                  {a.tagline}
                </span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 block" />
                  <span className="text-[9px] text-teal-600 font-medium">Active</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat window */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl border border-neutral-200 shadow-soft-md flex flex-col flex-1 min-h-0 overflow-hidden"
        >
          {/* Chat header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: agent.bg }}
              >
                <Bot size={12} style={{ color: agent.color }} />
              </div>
              <span className="text-xs text-neutral-600">
                Chat with{' '}
                <span className="font-semibold" style={{ color: agent.color }}>
                  {agent.name}
                </span>
              </span>
            </div>
            <button className="text-[10px] text-neutral-400 hover:text-neutral-600 flex items-center gap-1 transition-colors">
              <RefreshCw size={9} />
              Change Agent
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {agent.messages.slice(0, visible).map((msg, i) => (
              <motion.div
                key={`${activeId}-${i}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
              >
                {msg.role === 'ai' && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[8px] font-bold"
                    style={{ backgroundColor: agent.bg, color: agent.color, border: `1px solid ${agent.color}30` }}
                  >
                    {agent.abbr[0]}
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-3 py-2.5 rounded-2xl text-[11px] leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-neutral-800 text-white rounded-tr-sm ml-6'
                      : 'rounded-tl-sm text-neutral-700'
                  }`}
                  style={
                    msg.role === 'ai'
                      ? { backgroundColor: agent.bg, border: `1px solid ${agent.color}20` }
                      : {}
                  }
                >
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[8px] font-bold text-neutral-500">U</span>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Typing indicator */}
            {visible < agent.messages.length && visible > 0 && (
              <div className="flex justify-start gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[8px] font-bold"
                  style={{ backgroundColor: agent.bg, color: agent.color }}
                >
                  {agent.abbr[0]}
                </div>
                <div
                  className="px-3 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1"
                  style={{ backgroundColor: agent.bg, border: `1px solid ${agent.color}20` }}
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
          </div>

          {/* Input bar */}
          <div className="px-3 py-3 border-t border-neutral-100 flex items-center gap-2 flex-shrink-0">
            <div className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-[11px] text-neutral-400">
              Type your message...
            </div>
            <button
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ backgroundColor: agent.color }}
            >
              <Send size={11} className="text-white" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
