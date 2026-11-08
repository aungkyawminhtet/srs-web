import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ProgramCard } from "@/components/shared/ProgramCard";
import { TutorCard } from "@/components/shared/TutorCard";
import { CourseOutlineAccordion } from "@/components/programs/CourseOutlineAccordion";
import { PROGRAMS, TUTORS, Program } from "@/lib/data";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
  Calculator,
  TrendingUp,
  FlaskConical,
  Code2,
  PenTool,
  Shapes,
  Target,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  TrendingUp,
  FlaskConical,
  BookOpen,
  Code2,
  PenTool,
  Shapes,
  Target,
  GraduationCap,
};

interface ProgramPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return PROGRAMS.map((program) => ({
    id: program.id,
  }));
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
  const resolvedParams = await params;
  const program = PROGRAMS.find((p) => p.id === resolvedParams.id);

  if (!program) {
    notFound();
  }

  const IconComponent = iconMap[program.iconName] || BookOpen;

  // Matched tutors
  const matchedTutors = TUTORS.filter((t) =>
    program.tutorIds.includes(t.id)
  );

  // Related programs (same grade category or subject, excluding self)
  const relatedPrograms = PROGRAMS.filter(
    (p) =>
      p.id !== program.id &&
      (p.gradeCategory === program.gradeCategory || p.subjectId === program.subjectId)
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-[#FBFBFA] border-b border-slate-200/80 pt-6 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link href="/programs" className="hover:text-[#0A5C4C] transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All programs</span>
              </Link>
              <span>/</span>
              <Link
                href={`/subjects/${program.subjectId}`}
                className="hover:text-[#0A5C4C] transition-colors capitalize"
              >
                {program.subjectId.replace("-", " ")}
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-bold">{program.title}</span>
            </nav>
          </div>
        </div>

        {/* Main Content & Sticky Sidebar Layout */}
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Left Column: Overview + Course Outline + Mentors */}
              <div className="lg:col-span-8 space-y-10">
                
                {/* Course Header & Description */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center shadow-xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#EAF5F2] text-[#0A5C4C] text-xs font-bold font-mono tracking-wide">
                      {program.categoryTag.toUpperCase()}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      {program.grades}
                    </span>
                  </div>

                  <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E2B] tracking-tight leading-tight font-display mb-2">
                      {program.title}
                    </h1>
                    <p className="text-base sm:text-lg font-medium text-[#0A5C4C] leading-snug">
                      {program.headline}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {program.overview}
                  </p>

                  {/* Key Skills Checklist */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                      What students will master:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {program.learningOutcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#0A5C4C] shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Two Large Action Buttons on the Left */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <Link
                        href={`/register?program=${program.id}`}
                        className="inline-flex items-center justify-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-full shadow-xs hover:shadow transition-all group w-full sm:w-auto"
                      >
                        <span>Enroll in program</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>

                      <Link
                        href={`/consultation?program=${program.id}`}
                        className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#EAF5F2] text-[#0A5C4C] border-2 border-[#0A5C4C] font-bold text-sm sm:text-base py-3.5 px-6 rounded-full transition-all text-center w-full sm:w-auto"
                      >
                        <span>Book a free consultation</span>
                      </Link>
                    </div>
                    <p className="text-[11px] text-slate-400 pt-2">
                      No commitment • Free schedule assessment included
                    </p>
                  </div>
                </div>

                {/* Course Outline & Clear Milestones (Accordion) */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
                  <div className="mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-1 font-mono">
                      Course outline & milestones
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] tracking-tight font-display mb-1.5">
                      Curriculum breakdown
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Explore what each unit covers. Pacing adjusts to your child&apos;s progress and current school coursework.
                    </p>
                  </div>

                  {/* shadcn Accordion */}
                  <CourseOutlineAccordion modules={program.curriculumModules} />
                </div>

                {/* Course Mentors */}
                {matchedTutors.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-1 font-mono">
                          Instruction & guidance
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] tracking-tight font-display">
                          Course mentors
                        </h2>
                      </div>
                      <Link
                        href="/tutors"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#0A5C4C] hover:text-[#08483b] group"
                      >
                        <span>All tutors</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {matchedTutors.map((tutor) => (
                        <TutorCard key={tutor.id} tutor={tutor} />
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Sticky Course Details & Application Card */}
              <div className="lg:col-span-4 sticky top-24">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md space-y-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] font-mono block mb-1">
                      COURSE TUITION & DETAILS
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 font-display">
                      Course summary
                    </h3>
                  </div>

                  {/* Details List */}
                  <div className="space-y-4 divide-y divide-slate-100">
                    {/* Course Price */}
                    <div className="flex items-start gap-3 pt-1">
                      <div className="w-9 h-9 rounded-xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center shrink-0 mt-0.5">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-medium uppercase font-mono">Course Price</div>
                        <div className="text-lg sm:text-xl font-black text-[#0A5C4C]">
                          {program.priceFrom}
                        </div>
                        <div className="text-xs text-slate-500">
                          Flexible per-session or monthly packages
                        </div>
                      </div>
                    </div>

                    {/* Session Duration */}
                    <div className="flex items-start gap-3 pt-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-medium uppercase font-mono">Duration</div>
                        <div className="text-sm sm:text-base font-bold text-slate-900">
                          {program.duration}
                        </div>
                        <div className="text-xs text-slate-500">
                          Live interactive online session
                        </div>
                      </div>
                    </div>

                    {/* Time & Schedule */}
                    <div className="flex items-start gap-3 pt-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-medium uppercase font-mono">Time & Schedule</div>
                        <div className="text-sm sm:text-base font-bold text-slate-900">
                          {program.scheduleOptions}
                        </div>
                        <div className="text-xs text-slate-500">
                          Reschedule anytime with 24h notice
                        </div>
                      </div>
                    </div>

                    {/* Learning Format */}
                    <div className="flex items-start gap-3 pt-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-medium uppercase font-mono">Format</div>
                        <div className="text-sm sm:text-base font-bold text-slate-900">
                          {program.format}
                        </div>
                        <div className="text-xs text-slate-500">
                          Dedicated 1:1 or small cohort (3–5 peers)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Highlights */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <ShieldCheck className="w-4 h-4 text-[#0A5C4C] shrink-0" />
                      <span>100% Tutor Match Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <Sparkles className="w-4 h-4 text-[#0A5C4C] shrink-0" />
                      <span>School homework & quiz aligned</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Related Programs Section */}
        {relatedPrograms.length > 0 && (
          <section className="py-12 bg-white border-t border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-1 font-mono">
                    Other pathways
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] tracking-tight font-display">
                    Related programs
                  </h2>
                </div>
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0A5C4C] hover:text-[#08483b] group"
                >
                  <span>View directory</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPrograms.map((p) => (
                  <ProgramCard key={p.id} program={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
