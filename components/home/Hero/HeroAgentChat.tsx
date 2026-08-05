'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, Check, TrendingUp, TriangleAlert as AlertTriangle } from 'lucide-react';

type Msg = {
  role: 'user' | 'ai';
  text: string;
  kind?: 'default' | 'status' | 'summary';
  items?: { label: string; status?: 'ok' | 'warn' | 'done'; value?: string }[];
};

const AGENTS: {
  id: string;
  name: string;
  role: string;
  color: string;
  bg: string;
  abbr: string;
  messages: Msg[];
}[] = [
  {
    id: 'operations',
    name: 'Operations',
    role: 'Workflow & Process',
    color: '#2563eb',
    bg: '#eff6ff',
    abbr: 'OPS',
    messages: [
      { role: 'ai', text: "Hi! I'm your Operations Agent. I streamline workflows and reduce cycle times." },
      { role: 'user', text: 'Show me the status of ongoing processes.' },
      {
        role: 'ai',
        text: "Here's your current process status:",
        kind: 'status',
        items: [
          { label: 'Order Fulfillment', status: 'ok' },
          { label: 'Vendor Management', status: 'warn' },
          { label: 'Invoice Processing', status: 'ok' },
          { label: 'Quality Check', status: 'done' },
        ],
      },
      { role: 'user', text: "What's causing the Vendor delay?" },
      { role: 'ai', text: "Pending approvals from Vendor A and B. Want me to escalate?" },
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    role: 'Invoices & Reporting',
    color: '#0d9488',
    bg: '#f0fdfa',
    abbr: 'FIN',
    messages: [
      { role: 'ai', text: "Hi! I'm your Finance Agent — invoices, approvals, reporting." },
      { role: 'user', text: '47 invoices need approval before EOD.' },
      {
        role: 'ai',
        text: "Reviewed all 47 invoices:",
        kind: 'summary',
        items: [
          { label: 'Auto-approved (match PO)', value: '43' },
          { label: 'Routed to you (>$50K)', value: '4' },
          { label: 'Net exposure', value: '$312K' },
        ],
      },
      { role: 'user', text: 'Yes, notify approvers and generate Q3 cash flow.' },
      { role: 'ai', text: "Done! Net cash +$2.4M, AR improved 18%. PDF sent to your inbox." },
    ],
  },
  {
    id: 'support',
    name: 'Support',
    role: 'Tickets & CSAT',
    color: '#7c3aed',
    bg: '#f5f3ff',
    abbr: 'SUP',
    messages: [
      { role: 'ai', text: "Hey! I'm your Support Agent. I resolve tickets and keep CSAT high." },
      { role: 'user', text: '200 tickets in queue, only 3 agents on shift.' },
      {
        role: 'ai',
        text: "Queue cleared automatically:",
        kind: 'summary',
        items: [
          { label: 'Auto-resolved (Tier 1)', value: '156' },
          { label: 'Routed with context', value: '44' },
          { label: 'Avg resolution time', value: '42s' },
        ],
      },
      { role: 'user', text: 'Acme Corp is escalating a billing dispute.' },
      { role: 'ai', text: "Found duplicate $480 charge in March. Refund + $100 credit sent. Executive summary ready." },
    ],
  },
  {
    id: 'hr',
    name: 'HR',
    role: 'Onboarding & Leave',
    color: '#ea580c',
    bg: '#fff7ed',
    abbr: 'HR',
    messages: [
      { role: 'ai', text: "Hello! I'm your HR Agent — onboarding, leave, policies." },
      { role: 'user', text: '3 new hires start Monday. Set up onboarding.' },
      {
        role: 'ai',
        text: "All set for Monday:",
        kind: 'status',
        items: [
          { label: 'Equipment provisioned', status: 'done' },
          { label: 'Accounts activated', status: 'done' },
          { label: '30-60-90 day plans', status: 'done' },
          { label: 'Welcome emails scheduled', status: 'ok' },
        ],
      },
      { role: 'user', text: 'Sarah submitted a leave request for next week.' },
      { role: 'ai', text: "Approved! 12 days remaining. Team coverage confirmed, calendar blocked." },
    ],
  },
  {
    id: 'sales',
    name: 'Sales',
    role: 'Leads & Proposals',
    color: '#0ea5e9',
    bg: '#f0f9ff',
    abbr: 'SLS',
    messages: [
      { role: 'ai', text: "Hi! I'm your Sales Agent — leads, proposals, CRM." },
      { role: 'user', text: 'Meeting with Apex Corp tomorrow. Brief me.' },
      {
        role: 'ai',
        text: "Apex Corp brief:",
        kind: 'summary',
        items: [
          { label: 'Company size', value: '850 emp' },
          { label: 'Stage', value: 'Series C' },
          { label: 'Decision maker', value: 'Marcus Webb' },
        ],
      },
      { role: 'user', text: 'Draft a $120K proposal.' },
      { role: 'ai', text: "Drafted! 3 ROI scenarios, 12-week timeline, Apex-specific case study. Awaiting your review." },
    ],
  },
];

const DELAYS = [0, 900, 1900, 3000, 4100];
const QUICK_REPLIES = ['Show status', 'Run report', 'Escalate', 'Summarize'];

function StatusIcon({ status }: { status?: 'ok' | 'warn' | 'done' }) {
  if (status === 'ok') return <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />;
  if (status === 'warn') return <AlertTriangle size={11} className="text-amber-500 flex-shrink-0" />;
  if (status === 'done') return <Check size={11} className="text-emerald-500 flex-shrink-0" />;
  return null;
}

function MessageBubble({ msg, agent, index }: { msg: Msg; agent: typeof AGENTS[number]; index: number }) {
  const isUser = msg.role === 'user';
  const time = `0${index + 1}:${(index * 7) % 10 < 10 ? '0' : ''}${(index * 7) % 10}`;

  if (!isUser && (msg.kind === 'status' || msg.kind === 'summary')) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex gap-2 max-w-[85%]"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[8px] font-bold"
          style={{ backgroundColor: agent.bg, color: agent.color, border: `1px solid ${agent.color}30` }}
        >
          {agent.abbr[0]}
        </div>
        <div className="min-w-0">
          <div
            className="rounded-2xl rounded-tl-md p-3 border"
            style={{ backgroundColor: agent.bg, borderColor: `${agent.color}1a` }}
          >
            <p className="text-[11px] text-neutral-600 mb-2">{msg.text}</p>
            <div className="space-y-1.5 bg-white/70 rounded-xl p-2.5">
              {msg.items?.map((item, j) => (
                <div key={j} className="flex items-center justify-between gap-3 text-[11px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <StatusIcon status={item.status} />
                    <span className="text-neutral-700 truncate">{item.label}</span>
                  </div>
                  {item.value && (
                    <span className="font-semibold text-neutral-900 flex-shrink-0">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <span className="text-[9px] text-neutral-300 mt-1 ml-1 block">{time} AM</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-2 ${isUser ? 'justify-end' : 'max-w-[85%]'}`}
    >
      {!isUser && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[8px] font-bold"
          style={{ backgroundColor: agent.bg, color: agent.color, border: `1px solid ${agent.color}30` }}
        >
          {agent.abbr[0]}
        </div>
      )}
      <div className="min-w-0">
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-[11.5px] leading-relaxed ${
            isUser
              ? 'bg-neutral-900 text-white rounded-br-md'
              : 'rounded-tl-md text-neutral-700 border'
          }`}
          style={!isUser ? { backgroundColor: agent.bg, borderColor: `${agent.color}1a` } : {}}
        >
          {msg.text}
        </div>
        <span className={`text-[9px] text-neutral-300 mt-1 block ${isUser ? 'text-right mr-1' : 'ml-1'}`}>
          {time} AM
        </span>
      </div>
    </motion.div>
  );
}

export default function HeroAgentChat() {
  const [activeId, setActiveId] = useState('operations');
  const [visible, setVisible] = useState(0);
  const [input, setInput] = useState('');
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

  const isTyping = visible < agent.messages.length && visible > 0;

  return (
    <div className="flex flex-col bg-white rounded-3xl border border-neutral-200 shadow-soft-lg overflow-hidden h-[520px] sm:h-[560px] xl:h-full xl:max-h-[640px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 flex-shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative flex-shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-bold"
              style={{ backgroundColor: agent.color, color: '#fff' }}
            >
              {agent.abbr}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-neutral-900 truncate">{agent.name} Agent</div>
            <div className="text-[10px] text-neutral-400 truncate flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block" />
              {agent.role} · Online
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100 flex-shrink-0">
          <Sparkles size={10} className="text-emerald-600" />
          <span className="text-[9px] font-medium text-emerald-700">AI</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0.5 px-2 border-b border-neutral-100 overflow-x-auto scrollbar-none flex-shrink-0">
        {AGENTS.map(a => {
          const isActive = activeId === a.id;
          return (
            <button
              key={a.id}
              onClick={() => setActiveId(a.id)}
              className={`relative px-3 py-2.5 text-[11px] font-medium whitespace-nowrap transition-colors ${
                isActive ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {a.name}
              {isActive && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                  style={{ backgroundColor: a.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {agent.messages.slice(0, visible).map((msg, i) => (
              <MessageBubble key={i} msg={msg} agent={agent} index={i} />
            ))}

            {isTyping && (
              <div className="flex gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[8px] font-bold"
                  style={{ backgroundColor: agent.bg, color: agent.color, border: `1px solid ${agent.color}30` }}
                >
                  {agent.abbr[0]}
                </div>
                <div
                  className="px-3.5 py-3 rounded-2xl rounded-tl-md flex items-center gap-1 border"
                  style={{ backgroundColor: agent.bg, borderColor: `${agent.color}1a` }}
                >
                  {[0, 1, 2].map(j => (
                    <motion.div
                      key={j}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: agent.color }}
                      animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: j * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quick replies */}
      <div className="px-3 pt-2 flex gap-1.5 overflow-x-auto scrollbar-none flex-shrink-0">
        {QUICK_REPLIES.map(q => (
          <button
            key={q}
            onClick={() => setInput(q)}
            className="px-2.5 py-1.5 text-[10px] font-medium text-neutral-500 bg-neutral-50 border border-neutral-200 rounded-full whitespace-nowrap hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 py-3 flex items-center gap-2 flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-300 focus:bg-white transition-colors"
        />
        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-90 disabled:opacity-40"
          style={{ backgroundColor: agent.color }}
          disabled={!input.trim()}
          aria-label="Send"
        >
          <Send size={14} className="text-white" />
        </button>
      </div>
    </div>
  );
}
