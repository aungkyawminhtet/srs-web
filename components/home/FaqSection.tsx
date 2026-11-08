import React from "react";
import Link from "next/link";
import { ChevronDown, MessageCircleQuestion, ArrowRight } from "lucide-react";

export function FaqSection() {
  const faqs = [
    {
      q: "How do you match my child with a tutor?",
      a: "We match based on academic need, your child's personality and learning speed, timezone availability, and specific school curriculum requirements. If for any reason the chemistry isn't 100% right after the first session, our Match Guarantee means we immediately re-match you and credit the session.",
    },
    {
      q: "What ages and subjects do you support?",
      a: "We support students from 1st Grade through 12th Grade and early college. Subjects include all levels of Math (Foundations, Pre-Algebra, Algebra I/II, Geometry, AP Calculus, Statistics), Sciences (Biology, Chemistry, Physics), English & Language Arts, Social Sciences, plus comprehensive PSAT/SAT/ACT and AP exam prep.",
    },
    {
      q: "What does my child need for an online lesson?",
      a: "A computer, laptop, or tablet with a webcam, microphone, and a stable internet connection. Our virtual classroom operates entirely in the browser with no bulky software installs required. A digital drawing stylus is supported but optional.",
    },
    {
      q: "Can we choose one-to-one or small-group lessons?",
      a: "Yes! You can choose 1:1 dedicated instruction for hyper-personalized pace and immediate gap remediation, or small group cohorts (3–5 peers) for collaborative problem solving, debate, and affordable SAT/ACT test prep.",
    },
    {
      q: "How do monthly packages and billing work?",
      a: "We offer simple monthly membership plans with no long-term contracts. You can pause, reschedule, or cancel anytime with 24 hours notice. Hours roll over, and session recordings and homework reviews are always included at no extra charge.",
    },
    {
      q: "What if my child needs to reschedule a lesson?",
      a: "Life happens! You can easily reschedule any lesson directly through your student portal up to 24 hours in advance with zero penalty fees.",
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FBFBFA] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Help Prompt */}
          <div className="lg:col-span-5 flex flex-col items-start sticky top-28">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B6B58] block mb-2">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1E2B] tracking-tight leading-tight mb-4 font-display">
              Let’s make the first step easier.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              Everything you need to know about matching, virtual lessons, and how we measure your child’s progress.
            </p>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs w-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0B6B58] flex items-center justify-center">
                  <MessageCircleQuestion className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Have a unique question?</h4>
                  <p className="text-xs text-slate-500">Our academic advisors reply within 15 minutes.</p>
                </div>
              </div>
              <Link
                href="#tutors"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B6B58] hover:text-[#085243] mt-2 group"
              >
                <span>Ask us anything on live chat</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Native Semantic Accordion using details name="faq" */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                name="tutoreem-faq"
                className="group bg-white rounded-2xl border border-slate-200/90 p-5 open:ring-2 open:ring-[#0B6B58]/20 transition-all duration-200"
                open={idx === 0}
              >
                <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#0B6B58] transition-colors focus:outline-hidden">
                  <span>{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-open:bg-[#EAF5F2] group-open:text-[#0B6B58] flex items-center justify-center shrink-0 ml-4 transition-all">
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </summary>
                <div className="pt-4 mt-2 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
