"use client";

import React, { useState } from "react";
import Image from "next/image";
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
} from "lucide-react";

export default function MessagesPage() {
  const [activeThread, setActiveThread] = useState("lin");
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      sender: "Lin Chen",
      role: "Tutor",
      time: "Lin Chen · 3:45 PM ET",
      text: "Hi May! Emma made a good connection with balancing equations. I've shared a short practice for today. She's explaining her steps more clearly.",
      attachment: {
        name: "The balance method.pdf",
        size: "PDF · 420 KB",
      },
      isOutgoing: false,
    },
    {
      id: "2",
      sender: "May Thant",
      role: "Parent",
      time: "May Thant · 4:02 PM ET · Parent",
      text: "Thank you, Lin. We'll take a look before the lesson. Could you revisit word problems with Emma today?",
      isOutgoing: true,
    },
    {
      id: "3",
      sender: "Lin Chen",
      role: "Tutor",
      time: "Lin Chen · 4:10 PM ET",
      text: "Absolutely! We'll begin with a real-life example and turn it into an equation together. See Emma at 5:00 PM!",
      isOutgoing: false,
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: "May Thant",
        role: "Parent",
        time: "May Thant · Just now · Parent",
        text: inputText,
        isOutgoing: true,
      },
    ]);
    setInputText("");
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
            Thursday, November 5, 2026 · Learner Portal
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
            In the conversation.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            A shared space for your family, your tutors and our learning team.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Start a new message")}
          className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-xs hover:shadow transition-all shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New message</span>
        </button>
      </div>

      {/* Main Split Chat Layout */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Inbox Column (4 cols) */}
        <div className="lg:col-span-4 border-r border-slate-200/80 flex flex-col justify-between">
          <div className="p-4 sm:p-5 space-y-4">
            <h2 className="text-base font-bold text-slate-900 font-display">Inbox</h2>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search people or messages..."
                className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#0A5C4C]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === "all"
                    ? "bg-[#0A5C4C] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === "unread"
                    ? "bg-[#0A5C4C] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Unread · 1
              </button>
            </div>

            {/* Thread list */}
            <div className="space-y-1.5 pt-1">
              
              {/* Thread 1 (Lin Chen - Active) */}
              <div
                onClick={() => setActiveThread("lin")}
                className={`p-3 rounded-2xl cursor-pointer transition-all ${
                  activeThread === "lin"
                    ? "bg-[#EAF5F2] border border-[#CCE8E0]"
                    : "hover:bg-slate-50 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-900">Lin Chen</span>
                  <span className="text-[10px] text-slate-400">3:45 PM</span>
                </div>
                <div className="text-[11px] font-semibold text-[#0A5C4C] mb-0.5">
                  Math · Algebra I
                </div>
                <p className="text-xs text-slate-600 line-clamp-1 leading-snug">
                  Today&apos;s question and a little encouragement.
                </p>
              </div>

              {/* Thread 2 (Thiri Aung) */}
              <div
                onClick={() => setActiveThread("thiri")}
                className={`p-3 rounded-2xl cursor-pointer transition-all ${
                  activeThread === "thiri"
                    ? "bg-[#EAF5F2] border border-[#CCE8E0]"
                    : "hover:bg-slate-50 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-900">Thiri Aung</span>
                  <span className="text-[10px] text-slate-400">Yesterday</span>
                </div>
                <div className="text-[11px] font-semibold text-amber-700 mb-0.5">
                  Noah · Science explorers
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 leading-snug">
                  For Friday, please bring a cup of warm water and a spoon.
                </p>
              </div>

              {/* Thread 3 (Family support) */}
              <div
                onClick={() => setActiveThread("support")}
                className={`p-3 rounded-2xl cursor-pointer transition-all ${
                  activeThread === "support"
                    ? "bg-[#EAF5F2] border border-[#CCE8E0]"
                    : "hover:bg-slate-50 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-900">Family support</span>
                  <span className="text-[10px] text-slate-400">Nov 2</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-600 mb-0.5">
                  Team Fun &amp; Learn
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 leading-snug">
                  We received your calendar sync questions.
                </p>
              </div>

            </div>
          </div>

          {/* Safe space info note */}
          <div className="p-4 m-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#0A5C4C] shrink-0 mt-0.5" />
            <div className="text-[11px] text-slate-600 leading-relaxed">
              <strong className="text-slate-900">A safe learning space: </strong>
              Parent accounts can see tutor conversations for their children.
            </div>
          </div>
        </div>

        {/* Right Active Conversation Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between h-full min-h-[560px]">
          
          {/* Conversation Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
                  alt="Lin Chen"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Lin Chen</div>
                <div className="text-[11px] text-slate-500">
                  Math tutor · English &amp; Chinese · <span className="text-slate-700 font-semibold">Emma Thant · Algebra I</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Feed */}
          <div className="flex-1 p-5 space-y-5 overflow-y-auto">
            {/* Date separator */}
            <div className="flex items-center justify-center">
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                Today · November 5
              </span>
            </div>

            {/* Bubble 1 (Lin Chen incoming) */}
            <div className="space-y-1.5 max-w-lg">
              <div className="bg-slate-50 border border-slate-100 text-slate-800 p-4 rounded-3xl rounded-tl-sm text-xs sm:text-sm leading-relaxed space-y-3">
                <p>
                  Hi May! Emma made a good connection with balancing equations. I&apos;ve shared a short practice for today. She&apos;s explaining her steps more clearly.
                </p>

                {/* Attachment chip */}
                <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#0A5C4C]" />
                    <div>
                      <div className="font-bold text-slate-800">The balance method.pdf</div>
                      <div className="text-[10px] text-slate-400">PDF · 420 KB</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="font-bold text-[#0A5C4C] hover:underline cursor-pointer"
                  >
                    Download
                  </button>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 pl-2">
                Lin Chen · 3:45 PM ET
              </div>
            </div>

            {/* Bubble 2 (May Thant parent outgoing) */}
            <div className="space-y-1.5 max-w-lg ml-auto flex flex-col items-end">
              <div className="bg-[#EAF5F2] border border-[#CCE8E0] text-slate-900 p-4 rounded-3xl rounded-tr-sm text-xs sm:text-sm leading-relaxed">
                Thank you, Lin. We&apos;ll take a look before the lesson. Could you revisit word problems with Emma today?
              </div>
              <div className="text-[10px] text-slate-400 pr-2">
                May Thant · 4:02 PM ET · Parent
              </div>
            </div>

            {/* Bubble 3 (Lin Chen incoming) */}
            <div className="space-y-1.5 max-w-lg">
              <div className="bg-slate-50 border border-slate-100 text-slate-800 p-4 rounded-3xl rounded-tl-sm text-xs sm:text-sm leading-relaxed">
                Absolutely! We&apos;ll begin with a real-life example and turn it into an equation together. See Emma at 5:00 PM!
              </div>
              <div className="text-[10px] text-slate-400 pl-2">
                Lin Chen · 4:10 PM ET
              </div>
            </div>

            {/* Dynamic additional messages */}
            {chatMessages.slice(3).map((msg) => (
              <div
                key={msg.id}
                className={`space-y-1.5 max-w-lg ${
                  msg.isOutgoing ? "ml-auto flex flex-col items-end" : ""
                }`}
              >
                <div
                  className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                    msg.isOutgoing
                      ? "bg-[#EAF5F2] border border-[#CCE8E0] text-slate-900 rounded-tr-sm"
                      : "bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <div className={`text-[10px] text-slate-400 ${msg.isOutgoing ? "pr-2" : "pl-2"}`}>
                  {msg.time}
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-2">
            <form onSubmit={handleSend} className="space-y-3">
              <textarea
                rows={2}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Write a message to Lin..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>PDF or image · Max 10 MB</span>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs transition-all cursor-pointer"
                >
                  <span>Send message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="text-[10px] text-slate-400 leading-snug pt-1">
              Tutors typically reply within 1 business day. For urgent lesson changes, please contact support.
            </div>
          </div>

        </div>

      </div>

      {/* Illustrative Footer Note */}
      <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-4 border-t border-slate-200/60 font-sans">
        <Info className="w-3.5 h-3.5 shrink-0" />
        <span>Sample workspace · Students, tutors, progress and billing are illustrative. No real student data is shown.</span>
      </div>
    </div>
  );
}
