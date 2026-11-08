"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ProgramModule } from "@/lib/data";
import { CheckCircle2, BookOpen } from "lucide-react";

export function CourseOutlineAccordion({ modules }: { modules: ProgramModule[] }) {
  return (
    <Accordion
      defaultValue={["module-0"]}
      className="w-full space-y-3"
    >
      {modules.map((mod, idx) => (
        <AccordionItem
          key={idx}
          value={`module-${idx}`}
          className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:border-[#0A5C4C]/40 transition-all px-4 sm:px-5 py-1"
        >
          <AccordionTrigger className="hover:no-underline py-3.5 cursor-pointer">
            <div className="flex items-center gap-3.5 text-left">
              <span className="w-8 h-8 rounded-xl bg-[#EAF5F2] text-[#0A5C4C] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                0{idx + 1}
              </span>
              <div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0A5C4C] transition-colors">
                  {mod.title}
                </h4>
                <p className="text-xs text-slate-500 font-normal">
                  {mod.topics.length} core topics included
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-4 text-slate-600">
            <p className="text-xs sm:text-sm leading-relaxed mb-4 text-slate-700 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
              {mod.description}
            </p>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#0A5C4C]" />
                <span>Topics & Skills Mastered:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mod.topics.map((topic, tIdx) => (
                  <div
                    key={tIdx}
                    className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-100 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0A5C4C] shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

