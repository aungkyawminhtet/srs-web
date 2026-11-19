"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Search,
  Send,
  User,
  ShieldCheck,
  CheckCheck,
  Paperclip,
  Sparkles,
  BookOpen,
  Clock,
  Phone,
  Video,
  Radio,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStoredAuth } from "@/lib/api/client";
import { instructorStore, ChatThread, ChatMessage } from "@/lib/instructorStore";
import { useRealtimeChat, ChatUser } from "@/hooks/useRealtimeChat";

export default function InstructorMessagesPage() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string>("th-1");
  const [inputText, setInputText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const auth = getStoredAuth();
  const currentName = auth?.name || "Lin Chen";

  const currentUser: ChatUser = {
    name: currentName,
    role: "instructor",
    email: auth?.email || "lin.chen@funandlearn.edu",
  };

  useEffect(() => {
    const loaded = instructorStore.getThreads();
    setThreads(loaded);
  }, []);

  const activeThread =
    threads.find((th) => th.id === activeThreadId) || threads[0];

  // Real-time chat hook powered by Socket.IO
  const {
    messages: realtimeMessages,
    sendMessage,
    sendTyping,
    isConnected,
    typingUser,
  } = useRealtimeChat({
    threadId: activeThread?.id || "th-1",
    currentUser,
    initialMessages: activeThread?.messages || [],
    onMessageReceived: (incomingMsg, thId) => {
      setThreads((prev) =>
        prev.map((th) => {
          if (th.id === thId) {
            return {
              ...th,
              lastMessage: incomingMsg.text,
              lastMessageTime: incomingMsg.time,
              unreadCount: th.id === activeThreadId ? 0 : th.unreadCount + 1,
              messages: [...th.messages, incomingMsg],
            };
          }
          return th;
        })
      );
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [realtimeMessages, typingUser]);

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    const updated = instructorStore.markThreadRead(threadId);
    setThreads(updated);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    sendTyping(e.target.value.length > 0);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;

    const trimmed = inputText.trim();
    sendMessage(trimmed);
    setInputText("");
    sendTyping(false);

    // Update thread preview locally
    setThreads((prev) =>
      prev.map((th) =>
        th.id === activeThread.id
          ? {
              ...th,
              lastMessage: trimmed,
              lastMessageTime: "Just now",
            }
          : th
      )
    );
  };

  const handleQuickResponse = (text: string) => {
    if (!activeThread) return;
    sendMessage(text);
    sendTyping(false);

    setThreads((prev) =>
      prev.map((th) =>
        th.id === activeThread.id
          ? {
              ...th,
              lastMessage: text,
              lastMessageTime: "Just now",
            }
          : th
      )
    );
  };

  const filteredThreads = threads.filter((th) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      th.participantName.toLowerCase().includes(q) ||
      th.lastMessage.toLowerCase().includes(q) ||
      (th.courseTitle && th.courseTitle.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-display">
              Chatbox &amp; Communication Channels
            </h1>
            {/* Realtime socket status indicator */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                isConnected
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-amber-50 text-amber-800 border-amber-200"
              }`}
            >
              {isConnected ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Socket.IO Realtime Active
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Connecting Socket...
                </>
              )}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time bidirectional messaging between students, course advisors, and school leadership.
          </p>
        </div>
      </div>

      {/* Main 2-Column Chatbox */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px] h-[calc(100vh-230px)]">
        {/* Left Column: Thread List (4 or 5 cols) */}
        <div className="md:col-span-5 lg:col-span-4 border-r border-slate-200/80 flex flex-col h-full bg-slate-50/50">
          {/* Search bar */}
          <div className="p-3.5 border-b border-slate-200/80 bg-white">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-8.5 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
              />
            </div>
          </div>

          {/* Threads Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredThreads.map((th) => {
              const isSelected = th.id === activeThread?.id;
              const isAdmin = th.participantRole === "admin";

              return (
                <div
                  key={th.id}
                  onClick={() => handleSelectThread(th.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected ? "bg-white shadow-2xs border-l-4 border-l-[#0A5C4C]" : "hover:bg-white/80"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isAdmin
                        ? "bg-[#0B1E2B] text-teal-300"
                        : "bg-[#0A5C4C] text-white"
                    }`}
                  >
                    {th.participantAvatar}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-xs text-[#0B1E2B] truncate">
                        {th.participantName}
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                        {th.lastMessageTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-0.5">
                      {th.courseTitle && (
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60 truncate max-w-[140px]">
                          {th.courseTitle}
                        </span>
                      )}
                      {isAdmin && (
                        <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200/60">
                          School Owner
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500 truncate mt-1">
                      {th.lastMessage}
                    </p>
                  </div>

                  {th.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#0A5C4C] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                      {th.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Conversation */}
        {activeThread ? (
          <div className="md:col-span-7 lg:col-span-8 flex flex-col h-full bg-white">
            {/* Active Thread Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white z-10 shadow-2xs">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                    activeThread.participantRole === "admin"
                      ? "bg-[#0B1E2B] text-teal-300"
                      : "bg-[#0A5C4C] text-white"
                  }`}
                >
                  {activeThread.participantAvatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-sm text-[#0B1E2B]">
                      {activeThread.participantName}
                    </h2>
                    {activeThread.participantRole === "admin" ? (
                      <Badge className="bg-[#0B1E2B] text-teal-300 text-[10px] font-bold border-none">
                        School Owner
                      </Badge>
                    ) : (
                      <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-bold border-none">
                        Student
                      </Badge>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {activeThread.participantEmail} · {activeThread.courseTitle || "Direct Channel"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>
            </div>

            {/* Message Bubbles Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-slate-50/30">
              {realtimeMessages.map((msg) => {
                const isMe = msg.isMe;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[11px] font-bold text-slate-500">
                        {isMe ? "You (Instructor)" : msg.senderName}
                      </span>
                      <span className="text-[10px] text-slate-300">·</span>
                      <span className="text-[10px] text-slate-400 font-mono">{msg.time}</span>
                    </div>

                    <div
                      className={`max-w-md rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-2xs ${
                        isMe
                          ? "bg-[#0A5C4C] text-white rounded-tr-xs"
                          : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

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

            {/* Quick response chips */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
              <span className="text-slate-400 font-bold shrink-0 flex items-center gap-1 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-[#0A5C4C]" />
                Quick replies:
              </span>
              <button
                type="button"
                onClick={() =>
                  handleQuickResponse(
                    "Great question! We will review this step-by-step in our next class session."
                  )
                }
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-[#0A5C4C] text-slate-700 whitespace-nowrap transition-colors cursor-pointer text-xs"
              >
                Review in next session
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickResponse(
                    "I have reviewed your work and provided detailed feedback in the assignments tab."
                  )
                }
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-[#0A5C4C] text-slate-700 whitespace-nowrap transition-colors cursor-pointer text-xs"
              >
                Feedback posted in assignments
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickResponse(
                    "The submission deadline has been extended by 48 hours for our class."
                  )
                }
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-[#0A5C4C] text-slate-700 whitespace-nowrap transition-colors cursor-pointer text-xs"
              >
                Deadline extended
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 sm:p-4 bg-white border-t border-slate-200/80 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder={`Message ${activeThread.participantName}... (Live Socket.IO)`}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#0A5C4C] focus:ring-1 focus:ring-[#0A5C4C]"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 bg-[#0A5C4C] hover:bg-[#08483B] disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="md:col-span-7 lg:col-span-8 flex items-center justify-center text-center p-8 text-sm text-slate-400">
            Select a conversation on the left to start chatting.
          </div>
        )}
      </div>
    </div>
  );
}
