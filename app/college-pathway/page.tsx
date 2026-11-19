import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Compass,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
  Users,
  Target,
  FileCheck2,
  Award,
} from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ConsultationBanner } from "@/components/shared/ConsultationBanner";
import { COLLEGE_ROADMAP, TUTORS } from "@/lib/data";

export const metadata = {
  title: "College Pathway Program | Fun and Learn",
  description:
    "A calm, year-by-year college preparation roadmap for grades 8–12. Academic advising, course selection, and personalized mentoring.",
};

export default function CollegePathwayPage() {
  const roadmap = COLLEGE_ROADMAP || [
    {
      grade: "08–09",
      title: "Discover possibilities",
      description:
        "Explore academic interests, build effective study habits, and understand how high-school choices connect to future options.",
      tag: "CORE MILESTONE",
      deliverables: ["Interest reflection", "High school course conversations", "Independent study routines"],
    },
    {
      grade: "10",
      title: "Build a foundation",
      description:
        "Review rigorous coursework, activities, and leadership opportunities. Get familiar with global university pathways.",
      tag: "CORE MILESTONE",
      deliverables: ["Course planning & AP selection", "Extracurriculars portfolio", "Early college list exploration"],
    },
    {
      grade: "11",
      title: "Research with purpose",
      description:
        "Build a balanced college list, explore standardized testing strategies, and clarify questions around costs, fit, and majors.",
      tag: "CORE MILESTONE",
      deliverables: ["Curated college list", "Testing timeline (SAT/ACT)", "Summer enrichment roadmap"],
    },
    {
      grade: "12",
      title: "Take the next step",
      description:
        "Create an organized application calendar, craft personal essays in the student's authentic voice, and evaluate admission offers.",
      tag: "CORE MILESTONE",
      deliverables: ["Application essay coaching", "Financial aid & scholarship review", "Final enrollment decision support"],
    },
  ];

  const collegeAdvisors = TUTORS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col font-sans text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-[#EAF5F2]/50 via-white to-[#FBFBFA] border-b border-slate-200/60 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F2] text-[#0A5C4C] text-xs font-bold tracking-wide border border-[#CCE8E0]">
                  <Compass className="w-4 h-4 text-[#0A5C4C]" />
                  <span>College-Ready Futures · Grades 8–12</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1E2B] tracking-tight font-display leading-[1.15]">
                  A calm, step-by-step roadmap to college.
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-sans">
                  College planning can feel like a high-pressure puzzle. We break it down into a clear, year-by-year framework so your student builds confidence, discovers genuine passions, and presents their best authentic self without burnout.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/consultation"
                    className="px-6 py-3.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-sm font-bold rounded-2xl shadow-sm hover:shadow transition-all inline-flex items-center gap-2"
                  >
                    <span>Schedule Free College Advising Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="px-5 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-2xl transition-all"
                  >
                    <span>How Mentorship Works</span>
                  </Link>
                </div>

                {/* Key Benefits List */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 text-xs">
                  <div>
                    <span className="font-bold text-[#0B1E2B] block text-sm">1-on-1 Guidance</span>
                    <span className="text-slate-500">Dedicated former admissions advisor</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#0B1E2B] block text-sm">Zero Stress Timelines</span>
                    <span className="text-slate-500">Paced milestones from grade 8 to 12</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#0B1E2B] block text-sm">Balanced College Lists</span>
                    <span className="text-slate-500">Academic, financial & social fit</span>
                  </div>
                </div>
              </div>

              {/* Right Hero Image Card */}
              <div className="lg:col-span-5">
                <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
                    alt="High school students collaborating on college applications and academic roadmaps"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2B]/80 via-transparent to-transparent flex items-end p-6 text-white">
                    <div className="space-y-1">
                      <span className="text-xs uppercase font-bold tracking-wider text-emerald-300">
                        Personalized Pathways
                      </span>
                      <h2 className="text-lg font-bold font-display">
                        Empowering students to stand out authentically
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. 4-Year Milestone Roadmap Grid */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block">
                Year-By-Year Progression
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E2B] font-display tracking-tight">
                The 4-Year College Milestone Framework
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                Each stage focuses on meaningful growth instead of frantic last-minute cramming.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roadmap.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FBFBFA] rounded-3xl p-6 border border-slate-200 hover:border-[#0A5C4C]/50 hover:shadow-sm transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EAF5F2] text-[#0A5C4C]">
                        Grade {item.grade}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">Step 0{idx + 1}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0B1E2B] font-display">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Core Deliverables
                    </span>
                    <ul className="space-y-1.5">
                      {item.deliverables?.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0A5C4C] shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Three Pillars of Support */}
        <section className="py-16 md:py-24 bg-[#F8FAF9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block">
                Holistic Advising
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E2B] font-display tracking-tight">
                Three Pillars of Student Success
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                A complete advisory ecosystem covering academics, activities, and storytelling.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center font-bold">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1E2B] font-display">
                  1. Academic Strategy &amp; Rigor
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Selecting the right balance of honors, AP, and IB courses to show academic ambition without sacrificing well-being or GPA stability.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center font-bold">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1E2B] font-display">
                  2. Extracurricular Depth
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Moving past resume-padding checklists toward meaningful capstone projects, community impact, and genuine creative expression.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1E2B] font-display">
                  3. Authentic Voice in Essays
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Translating personal challenges, values, and triumphs into memorable, reflective admissions essays that resonate with committees.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Consultation Banner CTA */}
        <ConsultationBanner />
      </main>

      <Footer />
    </div>
  );
}
