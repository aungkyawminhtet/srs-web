import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ConsultationBanner } from "@/components/shared/ConsultationBanner";
import { TUTORS, Tutor } from "@/lib/data";
import { 
  ArrowUpRight, 
  Check, 
  ChevronDown, 
  Clock, 
  GraduationCap, 
  Languages, 
  Users 
} from "lucide-react";

interface TutorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TutorProfilePage({ params }: TutorPageProps) {
  const resolvedParams = await params;
  const tutor = TUTORS.find((t) => t.id === resolvedParams.id) || TUTORS[0];

  if (!tutor) {
    notFound();
  }

  const firstName = tutor.name.split(" ")[0];

  const getSubjectTrackHref = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes("math")) return "/subjects/math";
    if (r.includes("science") || r.includes("biology")) return "/subjects/science";
    if (r.includes("writing") || r.includes("english")) return "/subjects/english";
    return "/subjects";
  };

  const getProgramHref = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("algebra")) return "/programs/algebra-minus-overwhelm";
    if (t.includes("geometry")) return "/programs/geometry-made-visible";
    if (t.includes("essay") || t.includes("writing") || t.includes("literature")) return "/programs/high-school-writing-lab";
    if (t.includes("college") || t.includes("personal statement")) return "/programs/your-next-chapter";
    if (t.includes("biology") || t.includes("science")) return "/programs/science-explored";
    return "/programs";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-[#FBFBFA] border-b border-slate-200/80 pt-6 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link href="/tutors" className="hover:text-[#0A5C4C] transition-colors">
                Our tutors
              </Link>
              <span>/</span>
              <Link href={getSubjectTrackHref(tutor.role)} className="hover:text-[#0A5C4C] transition-colors">
                {tutor.role}
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-bold">{tutor.name}</span>
            </nav>
          </div>
        </div>

        {/* Profile Hero Section */}
        <section className="py-10 md:py-14 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Tutor Photo */}
              <div className="lg:col-span-4">
                <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-3xl overflow-hidden shadow-md border-4 border-slate-100 bg-slate-100">
                  <Image
                    src={tutor.image}
                    alt={tutor.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Tutor Header Info */}
              <div className="lg:col-span-8 flex flex-col items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2 font-mono">
                  A friendly face on the other side
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1E2B] tracking-tight leading-tight mb-2 font-display">
                  Meet {tutor.name}
                </h1>

                <div className="text-sm sm:text-base font-semibold text-slate-600 mb-4 flex items-center gap-2">
                  <span>{tutor.role}</span>
                  <span>•</span>
                  <span>{tutor.languages.join(" & ")}</span>
                </div>

                <p className="text-base sm:text-lg text-slate-700 italic leading-relaxed mb-6 font-normal">
                  {tutor.quote}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    {tutor.gradeRange}
                  </span>
                  {tutor.formatSupport.map((fmt, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-slate-500 font-medium mb-6">
                  {tutor.subjects.map((s) => s.title).join(" • ")} • School-aligned support
                </div>

                <Link
                  href="/tutors"
                  className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-xs hover:shadow transition-all group"
                >
                  <span>Ask about learning with {firstName}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] text-slate-400 italic">
              Illustrative tutor profile. Your tutor match depends on your goals, language preference and availability. Credentials and availability are confirmed during matching.
            </div>
          </div>
        </section>

        {/* Anchor Tab Navigation Bar */}
        <div className="sticky top-20 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 overflow-x-auto py-3 text-xs sm:text-sm font-semibold text-slate-600 no-scrollbar">
              <a href="#about" className="text-[#0A5C4C] hover:underline whitespace-nowrap">About {firstName}</a>
              <a href="#approach" className="hover:text-[#0A5C4C] whitespace-nowrap">Teaching approach</a>
              <a href="#subjects" className="hover:text-[#0A5C4C] whitespace-nowrap">Subjects</a>
              <a href="#availability" className="hover:text-[#0A5C4C] whitespace-nowrap">Availability</a>
              <a href="#faq" className="hover:text-[#0A5C4C] whitespace-nowrap">Questions</a>
            </div>
          </div>
        </div>

        {/* Main Content Split Area */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              
              {/* Left Column (2/3 width) */}
              <div className="lg:col-span-8 space-y-12">
                
                {/* Teaching Approach */}
                <div id="approach" className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] block font-mono">
                    For the learner beyond the homework
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                    Make the tricky parts feel simple.
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {tutor.teachingApproach}
                  </p>

                  <div className="pt-4 space-y-3">
                    <h3 className="font-bold text-slate-900 text-sm">
                      What a lesson can look like
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {tutor.lessonStructure.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#0A5C4C] shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Subjects Explorer */}
                <div id="subjects" className="space-y-6 pt-6 border-t border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] block font-mono">
                    Connected learning
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                    Subjects {firstName} can help explore
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {tutor.subjects.map((sub, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-semibold text-slate-400 block mb-1">
                            {sub.grades}
                          </span>
                          <h4 className="text-base font-bold text-slate-900 mb-2">
                            {sub.title}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed mb-4">
                            {sub.description}
                          </p>
                        </div>
                        <Link
                          href={getProgramHref(sub.title)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#0A5C4C] hover:underline"
                        >
                          <span>Explore program</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability Box */}
                <div id="availability" className="space-y-4 pt-6 border-t border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] block font-mono">
                    Make room for learning
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                    Example weekly availability
                  </h2>
                  <div className="text-xs text-slate-500 font-medium mb-4">
                    Eastern Time (ET / UTC-5)
                  </div>

                  <div className="space-y-2.5">
                    {tutor.availability.map((slot, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl p-3.5 border border-slate-200/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700"
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#0A5C4C]" />
                          <span>{slot.days}</span>
                          <span className="text-slate-400 font-normal">| {slot.time}</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px]">
                          {slot.format}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-400 italic pt-2">
                    Illustrative times only. Tell us your timezone and we&apos;ll help find a fit.
                  </p>
                </div>

                {/* Questions FAQ Accordion */}
                <div id="faq" className="space-y-4 pt-6 border-t border-slate-200/80">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
                    Before your first lesson
                  </h2>

                  <div className="space-y-3">
                    {tutor.faq.map((item, idx) => (
                      <details
                        key={idx}
                        name="tutor-profile-faq"
                        open={idx === 0}
                        className="group bg-white rounded-2xl border border-slate-200/80 p-5 transition-all"
                      >
                        <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#0A5C4C] transition-colors focus:outline-hidden">
                          <span>{item.q}</span>
                          <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="pt-3 mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {item.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Sticky Sidebar (1/3 width) */}
              <div className="lg:col-span-4 sticky top-36">
                <div className="bg-[#EAF5F2] rounded-3xl p-7 border border-[#CCE8E0] shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
                    Could {firstName} be a good fit?
                  </h3>
                  <p className="text-xs text-slate-600 mb-6">
                    A helpful starting point for learners who want to:
                  </p>

                  <ul className="space-y-3 mb-8 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#0A5C4C] shrink-0 mt-0.5" />
                      <span>Reconnect with algebra foundations</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#0A5C4C] shrink-0 mt-0.5" />
                      <span>See how graphs and equations fit together</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#0A5C4C] shrink-0 mt-0.5" />
                      <span>Explain their thinking with confidence</span>
                    </li>
                  </ul>

                  <Link
                    href="/tutors"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0A5C4C] hover:bg-[#08483b] text-white font-bold text-sm py-3.5 px-6 rounded-full shadow-xs hover:shadow transition-all group"
                  >
                    <span>Book a free consultation</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>

                  <p className="text-[11px] text-slate-500 text-center mt-4 italic">
                    We&apos;ll discuss your needs first. A specific tutor match is guaranteed before starting.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Bottom Consultation Banner */}
        <ConsultationBanner
          eyebrow="THEIR NEXT CHAPTER STARTS WITH A CONVERSATION"
          title="A good connection starts with a conversation."
          subtitle="No commitment. Just a helpful place to begin."
          buttonText="Book a free consultation"
          href="/tutors"
        />
      </main>

      <Footer />
    </div>
  );
}

