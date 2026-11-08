import React from "react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ConsultationBanner } from "@/components/shared/ConsultationBanner";
import { ResourceListClient } from "@/components/resources/ResourceListClient";
import { RESOURCES } from "@/lib/resources";

export const metadata = {
  title: "Family Resources Directory | Fun & Learn",
  description: "Practical guides for learning at home, navigating US schools, and planning what comes next for grades K-12.",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4C] block mb-2">
              For The Moments Between Lessons
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1E2B] tracking-tight font-display mb-4">
              A little clarity for the road ahead.
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-sans">
              Practical guides for learning at home, navigating US schools and planning what comes next. Read at your own pace, then bring us your questions.
            </p>
          </div>

          {/* Interactive Resource List */}
          <ResourceListClient articles={RESOURCES} />

        </div>

        {/* Consultation Banner */}
        <div className="mt-20">
          <ConsultationBanner
            badge="THEIR NEXT CHAPTER STARTS WITH A CONVERSATION"
            title="Turn a helpful idea into a personal plan."
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

