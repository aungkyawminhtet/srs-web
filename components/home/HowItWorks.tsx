import React from "react";
import { MessageSquareText, Compass, Rocket } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: MessageSquareText,
      title: "Tell us about your child",
      description:
        "Share their grade level, subjects needing attention, personal interests, and schedule preferences. We take time to understand both the academic goals and the person behind them.",
    },
    {
      number: "02",
      icon: Compass,
      title: "Build a plan together",
      description:
        "We handpick the best tutor fit based on personality and teaching style. During your first session, we conduct a friendly diagnostic and map out a structured learning plan.",
    },
    {
      number: "03",
      icon: Rocket,
      title: "Learn, reflect, keep growing",
      description:
        "Consistent weekly 1:1 sessions keep momentum high. Parents receive detailed session notes after every lesson, while monthly reviews ensure goals remain on target.",
    },
  ];

  return (
    <section id="how-it-works" className="py-14 md:py-18 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B6B58] block mb-2 font-mono">
            3 Simple Steps
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1E2B] tracking-tight font-display">
            From “where do we begin?” <br />
            to <span className="text-[#0B6B58]">“we’ve got this.”</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Getting quality academic support shouldn’t be stressful. We make finding and working with an exceptional tutor seamless from day one.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-1/4 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 -z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-[#FBFBFA] rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between relative z-10 hover:-translate-y-1 transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-4xl font-black font-display text-slate-300">
                      {step.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#EAF5F2] text-[#0B6B58] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B6B58] font-mono">
                    Step {idx + 1} of 3
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

