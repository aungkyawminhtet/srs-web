import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Calendar, 
  User, 
  Check, 
  CheckCircle2, 
  Share2, 
  ChevronRight,
  BookOpen
} from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ConsultationBanner } from "@/components/shared/ConsultationBanner";
import { RESOURCES, ResourceArticle } from "@/lib/resources";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return RESOURCES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = RESOURCES.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found | Fun & Learn" };

  return {
    title: `${article.title} | Fun & Learn Family Resources`,
    description: article.description,
  };
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = RESOURCES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Related articles (all except current)
  const related = RESOURCES.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-8 font-sans">
            <Link href="/" className="hover:text-[#0A5C4C] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/resources" className="hover:text-[#0A5C4C] transition-colors">
              Family resources
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-medium truncate max-w-[200px] sm:max-w-none">
              {article.categoryLabel}
            </span>
          </nav>

          {/* Article Header */}
          <header className="space-y-4 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block">
              {article.categoryLabel.toUpperCase()} • PARENT GUIDE
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1E2B] tracking-tight leading-[1.15] font-display">
              {article.title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-sans">
              {article.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 pt-2 font-sans border-t border-slate-200/80">
              <span className="font-semibold text-slate-800">By {article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>
          </header>

          {/* Hero Feature Image */}
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-md mb-12 bg-slate-100 border border-slate-200">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>

          {/* Article Editorial Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* In This Guide Outline */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  In this guide
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-sans">
                  {article.content?.sections.map((sec) => (
                    <li key={sec.number} className="hover:text-[#0A5C4C] transition-colors">
                      <a href={`#section-${sec.number}`} className="flex items-start gap-2">
                        <span className="font-bold text-[#0A5C4C]">{sec.number}.</span>
                        <span>{sec.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Keep It Simple Card */}
              <div className="bg-[#FEF6E9] rounded-2xl p-6 border border-[#F8E2C1] shadow-2xs space-y-2">
                <h4 className="text-sm font-bold text-slate-900 font-display">
                  Keep it simple
                </h4>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  A predictable start, a 5-minute family plan and room for rest.
                </p>
                <div className="pt-2">
                  <a
                    href="#five-minute-plan"
                    className="text-xs font-bold text-[#0A5C4C] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View family plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Article Body */}
            <article className="lg:col-span-8 space-y-8 font-sans text-slate-800 leading-relaxed text-base sm:text-lg">
              
              {/* Intro Text */}
              {article.content?.intro && (
                <p className="text-lg sm:text-xl font-medium text-slate-900 leading-relaxed">
                  {article.content.intro}
                </p>
              )}

              {article.content?.subIntro && (
                <p className="text-slate-600">
                  {article.content.subIntro}
                </p>
              )}

              {/* Numbered Sections */}
              <div className="space-y-8 pt-4 border-t border-slate-200/60">
                {article.content?.sections.map((sec) => (
                  <section id={`section-${sec.number}`} key={sec.number} className="space-y-3 scroll-mt-28">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E2B] font-display">
                      {sec.number}. {sec.title}
                    </h2>
                    <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line">
                      {sec.body}
                    </div>
                  </section>
                ))}
              </div>

              {/* Five-Minute Family Plan Callout */}
              {article.content?.fiveMinutePlan && (
                <div id="five-minute-plan" className="bg-[#EAF5F2] rounded-3xl p-8 border border-[#CCE8E0] my-8 shadow-xs scroll-mt-28">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block mb-1">
                    Your Family Compass
                  </span>
                  <h3 className="text-2xl font-black text-[#0B1E2B] mb-4 font-display">
                    {article.content.fiveMinutePlan.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {article.content.fiveMinutePlan.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#0A5C4C] shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-slate-800 font-medium font-sans">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* When Extra Support is Needed */}
              {article.content?.whenExtraSupport && (
                <div className="pt-6 border-t border-slate-200/80 space-y-3">
                  <h3 className="text-xl font-bold text-[#0B1E2B] font-display">
                    When it may be time for extra support
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                    {article.content.whenExtraSupport}
                  </p>
                  <p className="text-xs text-slate-500 italic font-sans pt-2">
                    You do not need to solve everything tonight. A useful next step—even a calmer conversation—is enough to begin.
                  </p>
                </div>
              )}

              {/* Author Bio Box */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs mt-8">
                <h4 className="text-base font-bold text-slate-900 font-display mb-1">
                  Fun and Learn family team
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-sans">
                  Practical support for the moments between lessons, for families across the country.
                </p>
              </div>

            </article>

          </div>

          {/* For Your Next Question (Related Articles) */}
          {related.length > 0 && (
            <div className="mt-20 pt-12 border-t border-slate-200/80 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block mb-1">
                  And A Few Others
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-display">
                  For your next question.
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/resources/${item.slug}`}
                    className={`${item.cardBg} rounded-2xl p-6 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${item.badgeBg}`}>
                          {item.categoryLabel}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {item.readTime}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#0A5C4C] transition-colors leading-snug font-display">
                        {item.title}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 group-hover:text-[#0A5C4C]">
                        Read guide
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#0A5C4C]" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Consultation Banner */}
        <div className="mt-20">
          <ConsultationBanner
            badge="THEIR NEXT CHAPTER STARTS WITH A CONVERSATION"
            title="A little support can change the after-school story."
            subtitle="No commitment. Just a helpful place to begin."
            buttonText="Book a free consultation"
            buttonHref="/tutors"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

