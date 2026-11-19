"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Plus,
  MoreHorizontal,
  Download,
  Paperclip,
  Send,
  Info,
  ShieldCheck,
  CheckCircle2,
  User,
  Sparkles,
} from "lucide-react";
import { useRealtimeChat, ChatUser } from "@/hooks/useRealtimeChat";
import { ChatMessage } from "@/lib/instructorStore";

const INITIAL_MESSAGES_BY_THREAD: Record<string, ChatMessage[]> = {
  lin: [
    {
      id: "lin-1",
      senderName: "Lin Chen",
      senderRole: "instructor",
      time: "Today · 3:45 PM ET",
      text: "Hi Emma! You made a great connection with balancing equations yesterday. I've shared practice 03 for today. Let me know if you need help on problem 5!",
      isMe: false,
    },
    {
      id: "lin-2",
      senderName: "Emma Thant",
      senderRole: "student",
      time: "Today · 4:02 PM ET",
      text: "Thank you Lin! I'm reviewing question 5 right now. We have live class at 5:00 PM, right?",
      isMe: true,
    },
    {
      id: "lin-3",
      senderName: "Lin Chen",
      senderRole: "instructor",
      time: "Today · 4:10 PM ET",
      text: "Yes, exactly! Classroom room S1 202 is already open. See you at 5:00 PM!",
      isMe: false,
    },
  ],
  maya: [
    {
      id: "maya-1",
      senderName: "Dr. Maya Patel",
      senderRole: "instructor",
      time: "Yesterday · 2:15 PM",
      text: "Hi Emma, remember to submit your Cell Structure & Osmosis lab reflection before our Thursday meeting!",
      isMe: false,
    },
    {
      id: "maya-2",
      senderName: "Emma Thant",
      senderRole: "student",
      time: "Yesterday · 4:30 PM",
      text: "Hi Dr. Maya, yes! I'm finishing the microscopy slide diagrams today.",
      isMe: true,
    },
  ],
  support: [
    {
      id: "supp-1",
      senderName: "Academic Support",
      senderRole: "admin",
      time: "Nov 2 · 10:00 AM",
      text: "Welcome to Fun & Learn! If you ever need help with timetable scheduling, classroom audio/video, or payments, reach us here.",
      isMe: false,
    },
  ],
};

function MessagesContent() {
  const searchParams = useSearchParams();
  const advisorParam = searchParams ? searchParams.get("advisor") : null;

  const [activeThread, setActiveThread] = useState("lin");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser: ChatUser = {
    name: "Emma Thant",
    role: "student",
    email: "emma.thant@student.edu",
  };

  useEffect(() => {
    if (advisorParam) {
      if (advisorParam.toLowerCase().includes("maya")) {
        setActiveThread("maya");
      } else {
        setActiveThread("lin");
      }
    }
  }, [advisorParam]);

  // Hook for realtime Socket.IO chat
  const {
    messages,
    sendMessage,
    sendTyping,
    isConnected,
    typingUser,
  } = useRealtimeChat({
    threadId: activeThread,
    currentUser,
    initialMessages: INITIAL_MESSAGES_BY_THREAD[activeThread] || [],
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    sendTyping(e.target.value.length > 0);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(inputText.trim());
    setInputText("");
    sendTyping(false);
  };

  const advisors = [
    {
      id: "lin",
      name: "Lin Chen",
      role: "Lead Math & CS Advisor",
      sub: "Algebra I & Database Systems",
      time: "3:45 PM",
      avatar: "L",
      lastMsg: "Classroom room S1 202 is already open. See you at 5:00 PM!",
    },
    {
      id: "maya",
      name: "Dr. Maya Patel",
      role: "Lead Science Mentor",
      sub: "Science & Biology",
      time: "Yesterday",
      avatar: "M",
      lastMsg: "Remember to submit your Cell Structure & Osmosis lab reflection!",
    },
    {
      id: "support",
      name: "Academic Support Team",
      role: "Platform Operations",
      sub: "Student Support & Coordination",
      time: "Nov 2",
      avatar: "S",
      lastMsg: "Welcome to Fun & Learn! Let us know if you need any assistance.",
    },
  ];

  const filteredAdvisors = advisors.filter((adv) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      adv.name.toLowerCase().includes(q) ||
      adv.role.toLowerCase().includes(q) ||
      adv.sub.toLowerCase().includes(q) ||
      adv.lastMsg.toLowerCase().includes(q)
    );
  });

  const currentAdvisor = advisors.find((a) => a.id === activeThread) || advisors[0];

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
            Student Portal · Advisor Communications
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            Direct Messages with Course Advisors
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Realtime bidirectional communication powered by Socket.IO with instant updates and live feedback.
          </p>
        </div>

        {/* Realtime Status Badge */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
              isConnected
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}
          >
            {isConnected ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Socket.IO Live
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Offline Mode (Local Cached)
              </>
            )}
          </span>
        </div>
      </div>

      {/* Main Messaging Box (2-column layout) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px] h-[calc(100vh-230px)]">
        {/* Left Inbox Column (4 cols) */}
        <div className="lg:col-span-4 border-r border-slate-200/80 flex flex-col justify-between bg-slate-50/50">
          <div className="p-4 sm:p-5 space-y-4">
            <h2 className="text-base font-bold text-slate-900 font-display">
              Course Advisors
            </h2>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search advisors or messages..."
                className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#0A5C4C]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Advisor Threads */}
            <div className="space-y-2 pt-1">
              {filteredAdvisors.map((adv) => {
                const isSelected = activeThread === adv.id;
                return (
                  <div
                    key={adv.id}
                    onClick={() => setActiveThread(adv.id)}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? "bg-[#EAF5F2] border-[#CCE8E0] shadow-2xs"
                        : "hover:bg-white border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-900">{adv.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{adv.time}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#0A5C4C] mb-0.5">
                      {adv.sub}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1 leading-snug">
                      {adv.lastMsg}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Active Conversation Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between h-full bg-white">
          {/* Thread Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200/80 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0A5C4C] text-white flex items-center justify-center font-bold text-sm">
                {currentAdvisor.avatar}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {currentAdvisor.name}
                </h3>
                <div className="text-[11px] text-[#0A5C4C] font-semibold">
                  {currentAdvisor.role} · {currentAdvisor.sub}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Channel
              </span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.isMe ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="text-[11px] font-bold text-slate-500">
                    {msg.isMe ? "You (Emma)" : msg.senderName}
                  </span>
                  <span className="text-[10px] text-slate-300">·</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {msg.time}
                  </span>
                </div>
                <div
                  className={`p-3.5 sm:p-4 rounded-2xl max-w-md text-sm leading-relaxed ${
                    msg.isMe
                      ? "bg-[#0A5C4C] text-white rounded-br-xs shadow-xs"
                      : "bg-white border border-slate-200/80 text-slate-800 rounded-bl-xs shadow-2xs"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator bubble */}
            {typingUser && (
              <div className="flex items-center gap-2 text-xs text-slate-500 italic px-3 py-1.5 bg-white rounded-full w-fit border border-slate-200/60 shadow-2xs">
                <span className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-[#0A5C4C] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[#0A5C4C] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#0A5C4C] rounded-full animate-bounce" />
                </span>
                <span>{typingUser} is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3 sm:p-4 border-t border-slate-200/80 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder={`Message ${currentAdvisor.name}... (Live Socket.IO)`}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-1 focus:ring-[#0A5C4C]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#0A5C4C] hover:bg-[#08483b] disabled:opacity-40 text-white transition-all shrink-0 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading messages...</div>}>
      <MessagesContent />
    </Suspense>
  );
}
