"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Video,
  Calendar,
  CreditCard,
  ShieldCheck,
  ArrowUpRight,
  ChevronRight,
  Send,
  MessageSquare,
  Clock,
  CheckCircle2,
  Paperclip,
  Info,
  Settings,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [topic, setTopic] = useState("Schedules & changes");
  const [child, setChild] = useState("Emma Thant");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 font-mono block mb-1">
          Thursday, November 5, 2026 · Parent Portal
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
          We&apos;re here for your family.
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          A little support can make the next step easier. Find an answer or talk with our team.
        </p>
      </div>

      {/* Dark Search Hero Card */}
      <div className="bg-[#0B2332] text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black font-display text-white">
            How can we help?
          </h2>
          <div className="text-xs text-emerald-300 font-medium">
            English · Burmese · Chinese
          </div>
        </div>

        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Try "join a lesson" or "change timezone"...'
            className="w-full pl-10 pr-4 py-3 bg-white text-slate-800 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A5C4C]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          type="button"
          className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-slate-800 transition-colors shadow-2xs cursor-pointer"
        >
          <Video className="w-4 h-4 text-[#0A5C4C]" />
          <span>Joining a lesson</span>
        </button>
        <button
          type="button"
          className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-slate-800 transition-colors shadow-2xs cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#0A5C4C]" />
          <span>Schedules &amp; changes</span>
        </button>
        <button
          type="button"
          className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-slate-800 transition-colors shadow-2xs cursor-pointer"
        >
          <CreditCard className="w-4 h-4 text-[#0A5C4C]" />
          <span>Plans &amp; payments</span>
        </button>
        <button
          type="button"
          className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-slate-800 transition-colors shadow-2xs cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-[#0A5C4C]" />
          <span>Account &amp; family</span>
        </button>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column (7 cols): FAQs & Contact Form */}
        <div className="lg:col-span-7 space-y-6">

          {/* Helpful answers */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Helpful answers
              </h2>
              <button
                type="button"
                className="text-xs font-semibold text-[#0A5C4C] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>All help articles</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Featured Q1 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">
                I can&apos;t join my lesson. What should I do?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                The room opens 10 minutes before the start time. Allow camera and microphone access in your browser, then refresh once. If it still won&apos;t connect, use the device check or contact us below.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => alert("Running camera and audio diagnostic...")}
                  className="font-bold text-xs text-[#0A5C4C] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Run camera &amp; audio check</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Other FAQs list */}
            <div className="divide-y divide-slate-100">
              <div className="py-3 flex items-center justify-between gap-3 group cursor-pointer hover:bg-slate-50/70 -mx-2 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0A5C4C] transition-colors">
                      How do I request a schedule change?
                    </div>
                    <div className="text-[11px] text-slate-400">Scheduling · 2-minute read</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div className="py-3 flex items-center justify-between gap-3 group cursor-pointer hover:bg-slate-50/70 -mx-2 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0A5C4C] transition-colors">
                      Where can I find my invoices?
                    </div>
                    <div className="text-[11px] text-slate-400">Billing · 1-minute read</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div className="py-3 flex items-center justify-between gap-3 group cursor-pointer hover:bg-slate-50/70 -mx-2 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0A5C4C] transition-colors">
                      How do student accounts work?
                    </div>
                    <div className="text-[11px] text-slate-400">Family access · 3-minute read</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Send a new question form */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Send a new question
            </h2>

            {submitted ? (
              <Alert className="bg-[#EAF5F2] border-[#CCE8E0] rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0A5C4C]">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <AlertTitle className="text-xs sm:text-sm font-bold text-[#0A5C4C]">Question received!</AlertTitle>
                </div>
                <AlertDescription className="text-xs text-slate-700 leading-relaxed font-sans">
                  We&apos;ve sent confirmation to <strong className="text-slate-900">may.thant@example.com</strong>. Our family team will reply within 1 business day.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Topic</label>
                    <Select
                      value={topic}
                      onValueChange={(val) => val && setTopic(val)}
                    >
                      <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-700 h-10">
                        <SelectValue placeholder="Topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Schedules & changes">Schedules &amp; changes</SelectItem>
                        <SelectItem value="Technical & connection">Technical &amp; connection</SelectItem>
                        <SelectItem value="Billing & packages">Billing &amp; packages</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Related child</label>
                    <Select
                      value={child}
                      onValueChange={(val) => val && setChild(val)}
                    >
                      <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-700 h-10">
                        <SelectValue placeholder="Related child" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Emma Thant">Emma Thant</SelectItem>
                        <SelectItem value="Noah Thant">Noah Thant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="A short summary of your question"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">How can we help?</label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what happened and what you've already tried..."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C]"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>Attach screenshot · Max 10 MB</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs transition-all cursor-pointer"
                  >
                    <span>Send question</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[11px] text-slate-400">
                  We&apos;ll reply to may.thant@example.com and your portal inbox within 1 business day.
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Right Column (5 cols): Open Request & Quick Support */}
        <div className="lg:col-span-5 space-y-6">

          {/* Your open request */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
              Your Open Request
            </span>

            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-slate-700">FL-1048</span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100 font-mono">
                In progress
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Google Calendar isn&apos;t syncing
              </h3>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Submitted Nov 4, 2:18 PM ET · For Emma · Algebra I
              </div>
            </div>

            {/* Mint response box */}
            <div className="bg-[#EAF5F2] border border-[#CCE8E0] rounded-2xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A5C4C]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>We&apos;ve received your question</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                Our team is checking the calendar connection. Your lessons are still confirmed in the portal.
              </p>
            </div>

            <div className="text-[11px] text-slate-400 space-y-0.5 pt-1">
              <div>Latest update: Nov 4, 2:20 PM ET</div>
              <div>Expected reply by Nov 5, 5:00 PM ET</div>
            </div>

            <button
              type="button"
              onClick={() => alert("Viewing request and replies...")}
              className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold py-2.5 px-4 rounded-full transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <span>View request &amp; replies</span>
            </button>
          </div>

          {/* Need help before class? */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900 font-display">
              Need help before class?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              For a lesson starting soon, chat with us so we can help you get connected.
            </p>

            <button
              type="button"
              onClick={() => alert("Starting live support chat...")}
              className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start support chat</span>
            </button>

            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 space-y-0.5">
              <div>Team hours · Mon–Fri, 9 AM–8 PM ET</div>
              <div>Current status: <strong className="text-emerald-600">Available</strong></div>
            </div>
          </div>

          {/* Yellow language box */}
          <div className="bg-[#FAF7EC] border border-[#ECE5CD] rounded-3xl p-5 space-y-2">
            <h4 className="text-xs font-bold text-amber-950 font-display">
              We understand each other.
            </h4>
            <p className="text-xs text-amber-900/85 leading-relaxed font-sans">
              Let us know if you&apos;d prefer support in Burmese or Chinese. We&apos;ll connect you with the right person.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0A5C4C] hover:underline cursor-pointer"
            >
              <span>Language support</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
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

