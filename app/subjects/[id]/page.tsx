import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ConsultationBanner } from "@/components/shared/ConsultationBanner";
import { ProgramCard } from "@/components/shared/ProgramCard";
import { TutorCard } from "@/components/shared/TutorCard";
import { SUBJECTS, PROGRAMS, TUTORS, SubjectItem } from "@/lib/data";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Calculator,
  Check,
  CheckCircle2,
  Code2,
  Compass,
  FlaskConical,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  FlaskConical,
  BookOpen,
  Code2,
  Target,
  GraduationCap,
  TrendingUp,
};

interface SubjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return SUBJECTS.map((subject) => ({
    id: subject.id,
  }));
}

export default async function SubjectDetailPage({ params }: SubjectPageProps) {
  const resolvedParams = await params;
  const subject = SUBJECTS.find((s) => s.id === resolvedParams.id);

  if (!subject) {
    notFound();
  }

  const IconComponent = iconMap[subject.iconName] || BookOpen;

  // Filter programs matching this subject
  const subjectPrograms = PROGRAMS.filter(
    (p) => p.subjectId === subject.id || subject.programIds.includes(p.id)
  );

  // Filter tutors specialized in this subject
  const specializedTutors = TUTORS.filter((t) =>
    subject.tutorIds.includes(t.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-[#FBFBFA] border-b border-slate-200/80 pt-6 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link href="/subjects" className="hover:text-[#0A5C4C] transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All subjects</span>
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-bold">{subject.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-10 md:py-16 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center shadow-xs">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block font-mono">
                      ACADEMIC SUBJECT TRACK
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Grades K–12 • 1:1 and small group options
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1E2B] tracking-tight leading-tight font-display">
                  {subject.title} Learning Pathway
                </h1>

                <p className="text-lg sm:text-xl font-medium text-[#0A5C4C] leading-snug">
                  {subject.headline}
                </p>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                  {subject.overview}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <a
                    href="#programs"
                    className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-xs hover:shadow transition-all group"
                  >
                    <span>View {subject.title} programs</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all"
                  >
                    <span>Book a free consultation</span>
                  </Link>
                </div>
              </div>

              {/* Quick Highlight Box */}
              <div className="lg:col-span-4 bg-[#F2F8F6] rounded-3xl p-6 sm:p-7 border border-[#CCE8E0] shadow-xs space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] font-mono block">
                  AT A GLANCE
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 font-display">
                  {subject.tagline}
                </h3>
                
                <ul className="space-y-3 pt-2">
                  {subject.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#0A5C4C] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[#CCE8E0]/70 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>{subjectPrograms.length} dedicated programs</span>
                  <span>•</span>
                  <span>Tailored pacing</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Grade-by-Grade Progression Tracks */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2 font-mono">
                The learning journey
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight font-display mb-3">
                How we build mastery across grade levels
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether strengthening essentials or leaping into advanced challenges, our curriculum bridges each developmental stage smoothly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subject.gradeTracks.map((track, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-[#EAF5F2] text-[#0A5C4C] text-xs font-bold font-mono tracking-wide mb-3">
                      {track.gradeRange}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {track.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {track.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                      Core competencies:
                    </div>
                    <ul className="space-y-2">
                      {track.skills.map((skill, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-[#0A5C4C] shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs in this Subject */}
        <section id="programs" className="py-12 md:py-16 bg-[#F2F8F6]/60 border-y border-[#DCEEE8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2 font-mono">
                  Course offerings
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] tracking-tight font-display">
                  Programs in {subject.title}
                </h2>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {subjectPrograms.length} {subjectPrograms.length === 1 ? "program" : "programs"} available
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjectPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        </section>

        {/* Teaching Methodology for this Subject */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2 font-mono">
                Our approach
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] tracking-tight font-display mb-3">
                How we teach {subject.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We believe deep learning happens when students feel safe to make mistakes, question assumptions, and build their own conceptual framework.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subject.methodologies.map((method, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center font-bold font-mono text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mentors in this Subject */}
        {specializedTutors.length > 0 && (
          <section className="py-12 md:py-16 bg-white border-t border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2 font-mono">
                    Expert instructors
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] tracking-tight font-display">
                    Our {subject.title} tutors
                  </h2>
                </div>
                <Link
                  href="/tutors"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0A5C4C] hover:text-[#08483b] group"
                >
                  <span>Browse all tutors</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specializedTutors.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Subject FAQs */}
        {subject.faqs.length > 0 && (
          <section className="py-12 md:py-16 bg-[#FBFBFA] border-t border-slate-200/80">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2 font-mono">
                  Common questions
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] tracking-tight font-display">
                  Questions about our {subject.title} tutoring
                </h2>
              </div>

              <div className="space-y-4">
                {subject.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs"
                  >
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-[#0A5C4C] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-base font-bold text-slate-900 mb-2">{faq.q}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Consultation Banner */}
        <ConsultationBanner
          eyebrow="FIND THE RIGHT STARTING POINT"
          title={`Curious about our ${subject.title} tracks?`}
          subtitle="We'll recommend an ideal learning plan based on your student's school curriculum and goals."
          buttonText="Book a free consultation"
          href="/consultation"
        />
      </main>

      <Footer />
    </div>
  );
}

