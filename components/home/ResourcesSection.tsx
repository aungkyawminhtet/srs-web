import React from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { RESOURCES } from "@/lib/resources";

export function ResourcesSection() {
  const articles = (Array.isArray(RESOURCES) && RESOURCES.length > 0 ? RESOURCES : []).slice(0, 3);

  return (
    <section id="resources" className="py-20 md:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2">
              Helpful Guides & Strategies
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1E2B] tracking-tight font-display">
              A little clarity for the road ahead.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-2xl font-sans">
              Free educational resources, parenting insights, and test prep frameworks curated by our academic mentors.
            </p>
          </div>

          <Link
            href="/resources"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-[#0A5C4C] hover:text-[#08483b] group transition-colors mt-4 md:mt-0"
          >
            <span>Explore full resource library</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Pastel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item) => (
            <Link
              key={item.id}
              href={`/resources/${item.slug}`}
              className={`${item.cardBg} rounded-3xl p-8 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${item.badgeBg}`}>
                    {item.categoryTag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#0A5C4C] transition-colors leading-snug font-display">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-700 leading-relaxed mb-6 font-sans">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#0A5C4C] transition-colors">
                  Read article
                </span>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-800 group-hover:text-white group-hover:bg-[#0A5C4C] transition-all shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

