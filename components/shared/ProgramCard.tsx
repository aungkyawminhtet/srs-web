import React from "react";
import Link from "next/link";
import { 
  Calculator, 
  TrendingUp, 
  FlaskConical, 
  BookOpen, 
  Code2, 
  PenTool, 
  Shapes, 
  Target, 
  GraduationCap, 
  ArrowUpRight 
} from "lucide-react";
import { Program } from "@/lib/data";

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

export function ProgramCard({ program }: { program: Program }) {
  const IconComponent = iconMap[program.iconName] || BookOpen;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center group-hover:scale-105 transition-transform">
            <IconComponent className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-500 tracking-wide">
            {program.grades}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#0A5C4C] transition-colors leading-snug">
          <Link href={`/programs/${program.id}`}>
            {program.title}
          </Link>
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {program.description}
        </p>

        <div className="text-xs font-medium text-slate-400">
          {program.categoryTag} • {program.format}
        </div>
      </div>

      <div className="pt-5 mt-5 border-t border-slate-100">
        <Link
          href={`/programs/${program.id}`}
          className="inline-flex items-center gap-1 text-sm font-bold text-[#0A5C4C] hover:text-[#08483b] transition-colors group/link"
        >
          <span>Explore program</span>
          <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

