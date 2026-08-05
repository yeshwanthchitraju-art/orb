'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Bot, Send, CircleCheck as CheckCircle2 } from 'lucide-react';

type Msg = { role: 'user' | 'ai'; text: string };

const CHATS: { dept: string; color: string; employee: string; messages: Msg[] }[] = [
  {
    dept: 'Finance',
    color: '#2563eb',
    employee: 'Aria',
    messages: [
      { role: 'user', text: '47 invoices need approval before EOD.' },
      { role: 'ai', text: 'Reviewed all 47. 43 match POs — approved. 4 exceed $50K, routed to you.' },
      { role: 'user', text: 'Generate the Q3 cash flow report.' },
      { role: 'ai', text: 'Done. Net cash: +$2.4M. AR improved 18%. PDF delivered to your inbox.' },
    ],
  },
  {
    dept: 'HR',
    color: '#0d9488',
    employee: 'Max',
    messages: [
      { role: 'user', text: '3 new hires start Monday. Set up onboarding.' },
      { role: 'ai', text: 'Done. Equipment provisioned, accounts activated, 30-60-90 plans drafted.' },
      { role: 'user', text: 'Sarah submitted a leave request.' },
      { role: 'ai', text: 'Approved — 12 days remaining. Team coverage confirmed, calendar blocked.' },
    ],
  },
  {
    dept: 'Sales',
    color: '#2563eb',
    employee: 'Nova',
    messages: [
      { role: 'user', text: 'Meeting with Apex Corp tomorrow. Brief me.' },
      { role: 'ai', text: 'Apex Corp: 850 employees, Series C. Pain point: manual AR. CTO: Marcus Webb.' },
      { role: 'user', text: 'Draft a $120K proposal.' },
      { role: 'ai', text: 'Proposal drafted. 3 ROI scenarios, 12-week timeline. Awaiting your review.' },
    ],
  },
  {
    dept: 'Support',
    color: '#0d9488',
    employee: 'Echo',
    messages: [
      { role: 'user', text: '200 tickets in queue, 3 agents on shift.' },
      { role: 'ai', text: 'Handling Tier 1 now. 156 resolved automatically. 44 routed with context.' },
      { role: 'user', text: 'Acme Corp escalating a billing dispute.' },
      { role: 'ai', text: 'Found duplicate $480 charge. Refund initiated, $100 credit sent.' },
    ],
  },
];

export default function HeroChat() {
  const [chatIdx, setChatIdx] = useState(0);
  const [visible, setVisible] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chat = CHATS[chatIdx];

  // Type out messages progressively
  useEffect(() => {
    setVisible(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    chat.messages.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), 700 + i * 1100));
    });
    return () => timers.forEach(clearTimeout);
  }, [chatIdx]);

  // Cycle to next chat after all messages shown
  useEffect(() => {
    const total = chat.messages.length * 1100 + 700 + 3500;
    const t = setTimeout(() => setChatIdx(i => (i + 1) % CHATS.length), total);
    return () => clearTimeout(t);
  }, [chatIdx, chat.messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [visible]);

  return (
    <div className="w-full h-[400px] flex flex-col min-h-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={chatIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl border border-neutral-200 shadow-soft-md flex flex-col flex-1 min-h-0 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-neutral-100 bg-neutral-50/70 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: chat.color + '15' }}>
              <Bot size={14} style={{ color: chat.color }} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-900 truncate">{chat.employee} — {chat.dept} AI</p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 block" />
                <span className="text-[9px] text-teal-600 font-medium">Active now</span>
              </div>
            </div>
            <div className="ml-auto px-2 py-0.5 rounded-full text-[9px] font-medium" style={{ backgroundColor: chat.color + '12', color: chat.color }}>
              {chat.dept}
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 p-3.5 space-y-2.5 overflow-y-auto min-h-0" style={{ maxHeight: '260px' }}>
            {chat.messages.slice(0, visible).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'ai' && (
                  <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-1.5 flex-shrink-0 mt-0.5" style={{ backgroundColor: chat.color + '15' }}>
                    <Bot size={9} style={{ color: chat.color }} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-neutral-900 text-white rounded-tr-sm'
                      : 'rounded-tl-sm text-neutral-800'
                  }`}
                  style={msg.role === 'ai' ? { backgroundColor: chat.color + '0F', border: `1px solid ${chat.color}22` } : {}}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {visible < chat.messages.length && (
              <div className="flex justify-start">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-1.5" style={{ backgroundColor: chat.color + '15' }}>
                  <Bot size={9} style={{ color: chat.color }} />
                </div>
                <div className="px-3 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1" style={{ backgroundColor: chat.color + '0F', border: `1px solid ${chat.color}22` }}>
                  {[0, 1, 2].map(j => (
                    <motion.div
                      key={j}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: chat.color }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.55, repeat: Infinity, delay: j * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}

            {visible >= chat.messages.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-1.5 pt-1"
              >
                <CheckCircle2 size={11} className="text-teal-500" />
                <span className="text-[9px] text-neutral-400">Workflow completed automatically</span>
              </motion.div>
            )}
          </div>

          {/* Input bar */}
          <div className="px-3 py-2.5 border-t border-neutral-100 flex items-center gap-2 flex-shrink-0">
            <div className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-[11px] text-neutral-400">
              Ask {chat.employee} a question...
            </div>
            <button className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: chat.color, color: '#fff' }}>
              <Send size={11} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
