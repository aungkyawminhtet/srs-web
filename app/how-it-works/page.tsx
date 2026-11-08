import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Heart, 
  Compass, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Check,
  Sparkles,
  Info,
  Calendar,
  GraduationCap,
  ArrowUpRight 
} from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ConsultationBanner } from "@/components/shared/ConsultationBanner";
import { TutorCard } from "@/components/shared/TutorCard";
import { TUTORS, COLLEGE_ROADMAP, PRICING_PLANS } from "@/lib/data";

const FALLBACK_ROADMAP = [
  {
    grade: "08–09",
    title: "Discover possibilities",
    description: "Explore interests, build study habits and understand how high-school choices connect to future options.",
    tag: "WHAT WE CAN WORK ON",
    deliverables: ["Interest reflection", "Course conversations", "Study routines"],
  },
  {
    grade: "10",
    title: "Build a foundation",
    description: "Review courses, activities and academic support needs. Get familiar with different college pathways.",
    tag: "WHAT WE CAN WORK ON",
    deliverables: ["Course planning", "Activities record", "Early campus ideas"],
  },
  {
    grade: "11",
    title: "Research with purpose",
    description: "Build a balanced college list, explore testing choices and organize questions about cost and fit.",
    tag: "WHAT WE CAN WORK ON",
    deliverables: ["College research", "Timeline", "Test plan"],
  },
  {
    grade: "12",
    title: "Take the next step",
    description: "Create an application calendar, develop essays in the student's own voice and prepare to compare options.",
    tag: "WHAT WE CAN WORK ON",
    deliverables: ["Applications", "Essay feedback", "Decision support"],
  },
];

const FALLBACK_PLANS = [
  {
    id: "small-group",
    badge: "LEARN TOGETHER",
    title: "Small-group learning",
    tagline: "A small circle. A shared spark.",
    price: "$120",
    billing: "/ month",
    frequency: "4 live lessons • 55 minutes each",
    popular: false,
    features: [
      "3–5 students at a similar level",
      "Shared practice and learning materials",
      "Notes and parent updates",
      "Subjects and schedules consulted as a group",
    ],
  },
  {
    id: "one-to-one",
    badge: "PERSONALIZED LEARNING",
    title: "One-to-one tutoring",
    tagline: "Built around your child.",
    price: "$240",
    billing: "/ month",
    frequency: "4 live lessons • 55 minutes each",
    popular: true,
    features: [
      "A dedicated tutor and personal starting plan",
      "Schoolwork and curriculum support",
      "Shared whiteboard and practice materials",
      "Lesson notes and parent progress updates",
    ],
  },
  {
    id: "college-pathway",
    badge: "LIGHTING AHEAD",
    title: "College Pathway",
    tagline: "A roadmap for the whole family.",
    price: "Let's talk",
    billing: "",
    frequency: "Steps and custom year-round roadmap",
    popular: false,
    features: [
      "Grade 8–12 planning conversations",
      "College research and timeline support",
      "Student essay style feedback",
      "Parent questions and language support",
    ],
  },
];

export const metadata = {
  title: "How It Works, College Pathway & Pricing | Fun & Learn",
  description: "Learn how Fun & Learn supports K-12 learners with personalized live tutoring, a calmer grades 8-12 college roadmap, and clear, transparent pricing.",
};

export default function HowItWorksPage() {
  const featuredTutors = TUTORS?.slice(0, 3) || [];
  const roadmap = Array.isArray(COLLEGE_ROADMAP) && COLLEGE_ROADMAP.length > 0 ? COLLEGE_ROADMAP : FALLBACK_ROADMAP;
  const plans = Array.isArray(PRICING_PLANS) && PRICING_PLANS.length > 0 ? PRICING_PLANS : FALLBACK_PLANS;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1">
        {/* Top Hero Section */}
        <section className="pt-12 pb-16 md:pt-16 md:pb-24 bg-[#FBFBFA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block">
                  A Little Guidance. A Lot of Possibility.
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1E2B] tracking-tight leading-[1.1] font-display">
                  We see the learner behind the homework.
                </h1>

                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-sans">
                  Fun and Learn is built around a simple idea: children take brave next steps when they feel understood. Families belong in that journey, too.
                </p>

                {/* Quick Section Anchor Jump Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href="#how-it-works"
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#0A5C4C] hover:border-[#0A5C4C]/40 transition-colors"
                  >
                    1. Our Approach
                  </a>
                  <a
                    href="#college-pathway"
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#0A5C4C] hover:border-[#0A5C4C]/40 transition-colors"
                  >
                    2. College Pathway
                  </a>
                  <a
                    href="#pricing"
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#0A5C4C] hover:border-[#0A5C4C]/40 transition-colors"
                  >
                    3. Pricing & Plans
                  </a>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/tutors"
                    className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-base font-bold px-7 py-3.5 rounded-full shadow-sm hover:shadow transition-all group cursor-pointer"
                  >
                    <span>Book a free consultation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="#pricing"
                    className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-900 text-base font-semibold px-6 py-3.5 rounded-full transition-all"
                  >
                    <span>View plans</span>
                  </a>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:col-span-5 relative">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop"
                    alt="Mother and daughter learning together at wooden table with laptop"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 1. Core Principles */}
        <section id="how-it-works" className="py-16 md:py-24 bg-white border-y border-slate-200/80 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2">
                What Guides Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
                Small principles. Meaningful moments.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mt-2 font-sans">
                Learning is personal. Support should be, too. We replace homework anxiety with predictable, steady growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#FBFBFA] rounded-3xl p-8 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1E2B] mb-3 font-display">
                  Confidence comes first
                </h3>
                <p className="text-slate-600 leading-relaxed font-sans text-sm sm:text-base">
                  A welcoming space to ask questions, make mistakes and try again. We celebrate understanding, not just rushed answers.
                </p>
              </div>

              <div className="bg-[#FBFBFA] rounded-3xl p-8 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1E2B] mb-3 font-display">
                  A plan, not a guess
                </h3>
                <p className="text-slate-600 leading-relaxed font-sans text-sm sm:text-base">
                  Begin with a clear goal and starting point. Connect lessons to schoolwork, curiosity and the next useful skill.
                </p>
              </div>

              <div className="bg-[#FBFBFA] rounded-3xl p-8 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1E2B] mb-3 font-display">
                  Families belong here
                </h3>
                <p className="text-slate-600 leading-relaxed font-sans text-sm sm:text-base">
                  Clear updates, shared expectations and room for questions help parents stay closely involved in their child&apos;s growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive Live Connection */}
        <section className="py-16 md:py-24 bg-[#F0F7F6]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop"
                    alt="Student engaged in real-time interactive session with online tutor"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block">
                  Not Another Video To Watch
                </span>

                <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
                  A real connection. An &ldquo;aha!&rdquo; in real time.
                </h2>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
                  Your child talks, tries, asks and discovers. Their tutor is right there, helping the next step feel possible.
                </p>

                <ul className="space-y-3 pt-1">
                  {[
                    "Live one-to-one tutoring or small cohorts of 3–5",
                    "A shared digital whiteboard and interactive lesson materials",
                    "Lesson notes and parent progress updates after every session",
                    "A learning plan that adapts to your child's pace and school curriculum",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#0A5C4C] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-slate-800 font-medium font-sans">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Combined: College Pathway (Concise Section) */}
        <section id="college-pathway" className="py-20 md:py-28 bg-white border-t border-slate-200/80 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2">
                  College-Ready Futures • Grades 8–12
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
                  College Pathway: A clearer way forward.
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mt-2 font-sans">
                  College planning can feel like a new language. We break it down into a calm, year-by-year roadmap so students and families stay on track without anxiety.
                </p>
              </div>

              <Link
                href="/tutors"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-[#0A5C4C] hover:text-[#08483b] transition-colors mt-4 md:mt-0"
              >
                <span>Book a college consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 4-Year Roadmap Compact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {roadmap.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FBFBFA] rounded-3xl p-6 border border-slate-200/90 hover:border-[#0A5C4C]/40 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#EAF5F2] text-[#0A5C4C] mb-4">
                      Grade {item.grade}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Focus Areas
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(item.deliverables || []).slice(0, 2).map((d, dIdx) => (
                        <span
                          key={dIdx}
                          className="bg-white text-[11px] font-medium text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* College Support Checklist & Disclaimer */}
            <div className="bg-[#0B1E2B] rounded-3xl p-8 sm:p-10 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                    Guidance, Not A Guarantee
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                    A plan that belongs to your child.
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    We support thinking, organization, and confidence. Students remain the true authors of their applications and choices.
                  </p>
                </div>

                <div className="lg:col-span-7 space-y-2.5 text-xs sm:text-sm text-slate-200 font-sans">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Understanding college types, campus culture, and admissions criteria</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Building a realistic testing and application timeline without last-minute panic</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Authentic personal essay brainstorming & polish—never ghostwriting</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Dedicated multilingual support for parents in English, Burmese, or Chinese</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Combined: Simple Transparent Pricing (Concise Section) */}
        <section id="pricing" className="py-20 md:py-28 bg-[#FBFBFA] border-t border-slate-200/80 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2">
                Flexible Learning Packages
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
                Simple, transparent pricing.
              </h2>
              <p className="text-base text-slate-600 mt-2 font-sans">
                Choose the format that fits your family. Free initial consultation with zero obligation.
              </p>
            </div>

            {/* 3 Concise Tier Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
                    plan.popular
                      ? "bg-white border-2 border-[#0A5C4C] shadow-lg relative lg:-translate-y-2"
                      : "bg-white border border-slate-200/80 shadow-xs hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          plan.popular
                            ? "bg-[#EAF5F2] text-[#0A5C4C]"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {plan.badge}
                      </span>
                      {plan.popular && (
                        <span className="text-xs font-bold text-[#0A5C4C] flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> Most chosen
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 mb-1 font-display">
                      {plan.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mb-6 font-sans">
                      {plan.tagline}
                    </p>

                    <div className="mb-4 pb-6 border-b border-slate-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-black text-slate-900 font-display">
                          {plan.price}
                        </span>
                        {plan.billing && (
                          <span className="text-slate-500 text-sm font-medium">
                            {plan.billing}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 font-medium font-sans">
                        {plan.frequency}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {(plan.features || []).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-sans">
                          <Check className="w-4 h-4 text-[#0A5C4C] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Link
                      href="/tutors"
                      className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-sm font-bold transition-all ${
                        plan.popular
                          ? "bg-[#0A5C4C] hover:bg-[#08483b] text-white shadow-xs hover:shadow"
                          : "bg-white hover:bg-slate-50 border border-slate-300 text-slate-800"
                      }`}
                    >
                      <span>Find their starting point</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* 3 Step Roadmap */}
            <div className="bg-[#FEF6E9] rounded-3xl p-8 sm:p-10 border border-[#F8E2C1]">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                  How We Begin
                </span>
                <h3 className="text-2xl font-black text-[#0B1E2B] font-display">
                  First, a conversation. Then, a plan.
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-800 font-sans">
                <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-6 border border-[#F8E2C1] shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#EAF5F2] text-[#0A5C4C] font-bold text-sm flex items-center justify-center mb-3">
                    1
                  </div>
                  <h4 className="font-bold text-base mb-1 font-display">Tell us what you need</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Share your child&apos;s current subjects, learning style, and language preferences.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-6 border border-[#F8E2C1] shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#EAF5F2] text-[#0A5C4C] font-bold text-sm flex items-center justify-center mb-3">
                    2
                  </div>
                  <h4 className="font-bold text-base mb-1 font-display">Review recommendation</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    We suggest a matched mentor and package that fits your weekly schedule and budget.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-6 border border-[#F8E2C1] shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#EAF5F2] text-[#0A5C4C] font-bold text-sm flex items-center justify-center mb-3">
                    3
                  </div>
                  <h4 className="font-bold text-base mb-1 font-display">Confirm & get ready</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Begin with your live session. Progress updates and parent notes follow each class.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5. Multilingual Family Partnership */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block">
                  Multilingual Family Support
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] tracking-tight font-display">
                  A new school system. A familiar helping hand.
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                  Navigating US education can come with lots of questions. We help your family understand the curriculum, course options, and progress in your preferred language.
                </p>
              </div>

              <div className="lg:col-span-5 bg-[#EAF5F2] rounded-3xl p-6 border border-[#CCE8E0] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#0A5C4C] shadow-2xs">English</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#0A5C4C] shadow-2xs">Burmese</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#0A5C4C] shadow-2xs">Chinese</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                  Tell us which language your family feels most comfortable using. We&apos;ll match you with a tutor or bilingual liaison who can assist.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 6. Featured Tutors */}
        <section className="py-20 md:py-28 bg-[#FBFBFA] border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2">
                  People, Not Just Pedagogy
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E2B] tracking-tight font-display">
                  Patient guides. Curious minds. Your team.
                </h2>
                <p className="text-base text-slate-600 mt-2 font-sans">
                  Meet some of our vetted mentors who make room for questions and personal growth.
                </p>
              </div>

              <Link
                href="/tutors"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-[#0A5C4C] hover:text-[#08483b] group mt-4 md:mt-0"
              >
                <span>View all tutor profiles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>

          </div>
        </section>

        {/* Bottom Consultation Banner */}
        <ConsultationBanner
          badge="THEIR NEXT CHAPTER STARTS WITH A CONVERSATION"
          title="Let's find your child's way forward."
          subtitle="No commitment. Just a helpful place to begin."
          buttonText="Book a free consultation"
          buttonHref="/tutors"
        />
      </main>

      <Footer />
    </div>
  );
}
