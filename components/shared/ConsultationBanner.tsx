import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ConsultationBannerProps {
  eyebrow?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  href?: string;
  buttonHref?: string;
}

export function ConsultationBanner({
  eyebrow,
  badge,
  title = "Not sure where to begin? That's our starting point.",
  subtitle = "No commitment. Just a helpful place to begin.",
  buttonText = "Book a free consultation",
  href,
  buttonHref,
}: ConsultationBannerProps) {
  const displayEyebrow = badge || eyebrow || "THEIR NEXT CHAPTER STARTS WITH A CONVERSATION";
  const targetHref = buttonHref || href || "/consultation";

  return (
    <section className="py-12 bg-inherit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A5C4C] rounded-3xl p-8 sm:p-10 lg:p-12 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-200 block mb-2 font-mono">
              {displayEyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2 font-display">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 font-normal">
              {subtitle}
            </p>
          </div>

          <Link
            href={targetHref}
            className="inline-flex items-center justify-center gap-1.5 bg-white text-[#0A5C4C] hover:bg-emerald-50 text-sm sm:text-base font-bold px-6 py-3.5 rounded-full shadow-sm hover:shadow transition-all shrink-0 self-start md:self-auto group"
          >
            <span>{buttonText}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

