"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, ArrowRight, BookOpen, Compass, CheckCircle2 } from "lucide-react";
import { ResourceArticle, RESOURCES } from "@/lib/resources";

interface ResourceListClientProps {
  articles?: ResourceArticle[];
}

export function ResourceListClient({ articles }: ResourceListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const safeArticles = Array.isArray(articles) && articles.length > 0 ? articles : RESOURCES;

  const categories = [
    { id: "all", label: "All guides" },
    { id: "learning-at-home", label: "Learning at home" },
    { id: "navigating-us-schools", label: "Navigating US schools" },
    { id: "multilingual-families", label: "Multilingual families" },
    { id: "college-ahead", label: "College ahead" },
  ];

  
  const filteredArticles = useMemo(() => {
    return safeArticles.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryTag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [safeArticles, selectedCategory, searchQuery]);

  const featured = safeArticles.find((a) => a.isFeatured) || safeArticles[0] || null;

  return (
    <div className="space-y-12">
      {/* Search Bar & Category Tabs */}
      <div className="space-y-6">
        <div className="relative max-w-xl">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search family resources..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-full text-sm font-sans focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/20 shadow-2xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#0B1E2B] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Guide Banner (Shown when no search query and "all" or matching category) */}
      {!searchQuery && featured && (selectedCategory === "all" || selectedCategory === featured.category) && (
        <div className="bg-[#EAF5F2] rounded-3xl p-6 sm:p-10 border border-[#CCE8E0] shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-slate-100">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A5C4C] block">
                FOR PARENTS • {featured.date.toUpperCase()}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E2B] tracking-tight leading-snug font-display">
                {featured.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                {featured.description}
              </p>

              <div className="text-xs text-slate-500 font-medium font-sans">
                {featured.author} • {featured.readTime}
              </div>

              <div className="pt-2">
                <Link
                  href={`/resources/${featured.slug}`}
                  className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-sm font-bold px-6 py-3 rounded-full shadow-xs hover:shadow transition-all group"
                >
                  <span>Read this guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Guides Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-500 font-sans">
            {filteredArticles.length} {filteredArticles.length === 1 ? "guide" : "guides"} for your family
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700 font-display">No guides found</h3>
            <p className="text-sm text-slate-500 mt-1 font-sans">
              Try searching with different terms or selecting another category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/resources/${article.slug}`}
                className={`${article.cardBg} rounded-3xl p-7 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${article.badgeBg}`}>
                      {article.categoryTag}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#0A5C4C] transition-colors leading-snug font-display">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-sans">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#0A5C4C] transition-colors font-sans">
                    Read guide
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-800 group-hover:text-white group-hover:bg-[#0A5C4C] transition-all shadow-xs">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Understand a Little Deeper Callout */}
      <div className="bg-[#FEF6E9] rounded-3xl p-8 sm:p-10 border border-[#F8E2C1] shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
              Understand A Little Deeper
            </span>
            <h3 className="text-2xl font-black text-[#0B1E2B] font-display">
              Have a question about what you&apos;ve read?
            </h3>
            <p className="text-sm text-slate-600 font-sans max-w-xl">
              Our family team can help you think through next steps in English, Burmese or Chinese.
            </p>
          </div>

          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-sm font-bold px-6 py-3.5 rounded-full shadow-xs hover:shadow transition-all shrink-0"
          >
            <span>Talk with our family team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

