import React from "react";
import { Smile, Target, TrendingUp } from "lucide-react";

export function ValuePillars() {
  const pillars = [
    {
      icon: Smile,
      title: "Confidence comes first",
      description:
        "We build a supportive, encouraging environment where asking questions is celebrated and mistakes become natural stepping stones to mastery.",
      iconBg: "bg-emerald-50 text-emerald-700",
    },
    {
      icon: Target,
      title: "A plan, not a guess",
      description:
        "Comprehensive diagnostic assessment pinpoints exact learning gaps, enabling a personalized syllabus aligned with your school curriculum.",
      iconBg: "bg-blue-50 text-blue-700",
    },
    {
      icon: TrendingUp,
      title: "Progress you can follow",
      description:
        "Transparent session notes, homework tracking, and weekly progress reports sent directly to parents so you always know how your child is doing.",
      iconBg: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl ${pillar.iconBg} flex items-center justify-center shrink-0 shadow-xs`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

