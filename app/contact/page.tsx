"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Check, 
  CheckCircle2, 
  ChevronDown, 
  MessageSquare, 
  User, 
  Globe2, 
  Sparkles,
  HelpCircle,
  KeyRound
} from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ConsultationBanner } from "@/components/shared/ConsultationBanner";
import { useAuthModal } from "@/components/auth/AuthModalContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  const { openAuthModal } = useAuthModal();
  const [name, setName] = useState("Mei Chen");
  const [email, setEmail] = useState("mei.chen@example.com");
  const [topic, setTopic] = useState("Programs & matching");
  const [language, setLanguage] = useState("Chinese");
  const [message, setMessage] = useState("I'm looking for Algebra I support for my child. Could you help us compare one-to-one lessons with a small group?");
  const [agree, setAgree] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [activeFaqCategory, setActiveFaqCategory] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const faqCategories = [
    { id: "all", label: "Getting started" },
    { id: "lessons", label: "Lessons & learning" },
    { id: "packages", label: "Packages & scheduling" },
    { id: "account", label: "Account support" },
  ];

  const faqs = [
    {
      category: "all",
      q: "How do you match my child with a tutor?",
      a: "We start with a free consultation about your child's goals, current learning needs, schedule and preferred language. Then we recommend a tutor and a learning plan together.",
    },
    {
      category: "all",
      q: "What ages and subjects do you support?",
      a: "We support grades K through 12 across Math (elementary through AP calculus), English literacy & essay writing, Sciences (general science through AP biology & chemistry), Coding foundations, and SAT/ACT test preparation.",
    },
    {
      category: "lessons",
      q: "Can we choose one-to-one or small-group lessons?",
      a: "Yes! One-to-one is dedicated personal instruction tailored to your child's current school curriculum. Small groups (3–5 peers) are interactive, collaborative, and budget-friendly.",
    },
    {
      category: "lessons",
      q: "What does my child need for an online lesson?",
      a: "A computer or tablet with a webcam, microphone, stable internet connection, and notebook with pencils. All whiteboard tools and digital materials run directly in your web browser—no complicated software to install.",
    },
    {
      category: "packages",
      q: "How do monthly packages and parent updates work?",
      a: "Packages include 4 live 55-minute lessons each month. After each session, the tutor submits a brief lesson summary and practice recommendation visible in your parent dashboard.",
    },
    {
      category: "packages",
      q: "Can you support families in Burmese or Chinese?",
      a: "Yes! Many of our mentors and family coordinators are fully bilingual in English and Burmese or Mandarin Chinese, helping students and parents navigate American coursework with confidence.",
    },
    {
      category: "account",
      q: "What if I need to reschedule a lesson?",
      a: "You can reschedule or cancel a session directly from your parent account up to 24 hours in advance with zero penalty.",
    },
    {
      category: "account",
      q: "I can't sign in. What should I do?",
      a: "Visit our password recovery page to request a reset link sent to your registered email address, or contact our family team below for immediate verification assistance.",
    },
  ];

  const filteredFaqs = activeFaqCategory === "all"
    ? faqs
    : faqs.filter((f) => f.category === activeFaqCategory || f.category === "all");

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-12 pb-16 md:pt-16 md:pb-20 bg-[#FBFBFA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2 font-mono">
                GOOD QUESTIONS WELCOME
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1E2B] tracking-tight font-display mb-3">
                Let&apos;s make the next step easier.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
                Choosing a program, navigating a new school system or finding your way around your account? Our family team is a helpful place to begin.
              </p>
            </div>

            {/* 3 Top Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              
              <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
                    New to Fun and Learn?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-4">
                    Start with a free conversation about your child&apos;s needs and learning style.
                  </p>
                </div>
                <div>
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0A5C4C] hover:underline"
                  >
                    <span>Book a consultation</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center mb-4">
                    <User className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
                    Already learning with us?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-4">
                    Use your parent account to review lessons, see notes, and contact your team.
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => openAuthModal("login")}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0A5C4C] hover:underline cursor-pointer"
                  >
                    <span>Go to parent login</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center mb-4">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
                    Prefer another language?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-4">
                    Request family support and advice in English, Burmese or Chinese.
                  </p>
                </div>
                <div>
                  <a
                    href="#message-form"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0A5C4C] hover:underline"
                  >
                    <span>Tell us your preference below</span>
                    <ArrowDownIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

            {/* Split Contact Form Section */}
            <div id="message-form" className="bg-[#EAF5F2]/60 rounded-3xl p-8 sm:p-12 border border-[#CCE8E0] scroll-mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Info */}
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block font-mono">
                    WE&apos;RE LISTENING
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E2B] font-display">
                    Tell us what&apos;s on your mind.
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                    Share your questions and how you&apos;d like us to respond. You do not need to know the right program or the right words yet.
                  </p>

                  <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-800 font-sans">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#0A5C4C] shrink-0 mt-0.5" />
                      <span>Questions about programs and tutor matching</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#0A5C4C] shrink-0 mt-0.5" />
                      <span>Help understanding packages and schedules</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#0A5C4C] shrink-0 mt-0.5" />
                      <span>Account and learning-platform support</span>
                    </li>
                  </ul>

                  <p className="text-[11px] text-slate-500 italic pt-2 leading-relaxed font-sans border-t border-[#CCE8E0]">
                    Please do not include passwords or sensitive student records in your message. For scheduled lesson prompts, use your parent account so your learning team has the right context.
                  </p>
                </div>

                {/* Right Form Card */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    Send a message
                  </h3>

                  {submitted ? (
                    <div className="bg-[#EAF5F2] rounded-2xl p-6 border border-[#CCE8E0] space-y-2 font-sans">
                      <div className="flex items-center gap-2 text-[#0A5C4C] font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>Message sent • Confirmation</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Thank you, {name}! Our family team will reply to <span className="font-semibold text-slate-900">{email}</span> within 24 hours. You don&apos;t need to submit the same message again.
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setSubmitted(false)}
                          className="text-xs font-bold text-[#0A5C4C] hover:underline"
                        >
                          Send another message
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs sm:text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Your name *
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/10"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Email address *
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/10"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Topic *
                          </label>
                          <Select value={topic} onValueChange={(val) => val && setTopic(val)}>
                            <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-700 h-10">
                              <SelectValue placeholder="Topic" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Programs & matching">Programs & matching</SelectItem>
                              <SelectItem value="Pricing & packages">Pricing & packages</SelectItem>
                              <SelectItem value="Lesson scheduling">Lesson scheduling</SelectItem>
                              <SelectItem value="Account & login support">Account & login support</SelectItem>
                              <SelectItem value="Multilingual family request">Multilingual family request</SelectItem>
                              <SelectItem value="Other inquiry">Other inquiry</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Preferred language
                          </label>
                          <Select value={language} onValueChange={(val) => val && setLanguage(val)}>
                            <SelectTrigger className="w-full bg-white border-slate-200 text-xs sm:text-sm text-slate-700 h-10">
                              <SelectValue placeholder="Preferred language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Chinese">Chinese (Mandarin)</SelectItem>
                              <SelectItem value="Burmese">Burmese</SelectItem>
                              <SelectItem value="English">English</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Your message *
                        </label>
                        <textarea
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/10 resize-none"
                        />
                      </div>

                      <div className="pt-1">
                        <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            required
                            className="mt-0.5 rounded border-slate-300 text-[#0A5C4C] focus:ring-[#0A5C4C]"
                          />
                          <span>I have read the privacy policy and agree to be contacted regarding my message.</span>
                        </label>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-sm font-bold px-7 py-3.5 rounded-full shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-60"
                        >
                          <span>{loading ? "Sending..." : "Send message"}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-24 bg-white border-t border-slate-200/80 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="mb-10 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2 font-mono">
                A LITTLE CLARITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
                What would you like to know?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 font-sans">
                Start with the essentials. If your question is personal to your family, send us a message above.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFaqCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeFaqCategory === cat.id
                      ? "bg-[#0B1E2B] text-white shadow-xs"
                      : "bg-[#FBFBFA] text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Accordion Questions */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-[#FBFBFA] rounded-2xl p-6 border border-slate-200 open:border-[#0A5C4C]/40 transition-all cursor-pointer"
                  open={idx === 0}
                >
                  <summary className="flex items-center justify-between font-bold text-slate-900 text-base sm:text-lg list-none group-hover:text-[#0A5C4C] font-display">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                  </summary>
                  <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans pt-3 border-t border-slate-100">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>

            {/* Need Help Signing In Box */}
            <div className="bg-[#FEF6E9] rounded-3xl p-6 sm:p-8 border border-[#F8E2C1] mt-10 space-y-2 font-sans">
              <div className="flex items-center gap-2 font-bold text-slate-900 font-display">
                <KeyRound className="w-5 h-5 text-amber-800" />
                <span>Need help signing in?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Use &ldquo;Forgot password?&rdquo; on the login page. We&apos;ll send a reset link if an account exists for your email address. Never share your password with anyone.
              </p>
              <div className="pt-2">
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-[#0A5C4C] hover:underline inline-flex items-center gap-1"
                >
                  <span>Recover your password</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Consultation Banner */}
        <ConsultationBanner
          badge="THEIR NEXT CHAPTER STARTS WITH A CONVERSATION"
          title="Big questions. A friendly place to begin."
          subtitle="No commitment. Just a helpful place to begin."
          buttonText="Book a free consultation"
          buttonHref="/consultation"
        />
      </main>

      <Footer />
    </div>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  );
}

