import React from "react";
import Link from "next/link";
import { 
  Calculator, 
  FlaskConical, 
  BookOpen, 
  Code2, 
  Target, 
  GraduationCap, 
  Check, 
  ArrowUpRight 
} from "lucide-react";
import { SubjectItem } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  FlaskConical,
  BookOpen,
  Code2,
  Target,
  GraduationCap,
};

export function SubjectCard({ subject }: { subject: SubjectItem }) {
  const IconComponent = iconMap[subject.iconName] || BookOpen;

  return (
    <div className="bg-[#F2F8F6]/70 rounded-3xl p-7 sm:p-8 border border-[#CCE8E0] hover:bg-[#EAF5F2] transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white text-[#0A5C4C] flex items-center justify-center shadow-xs">
            <IconComponent className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-display hover:text-[#0A5C4C] transition-colors">
            <Link href={`/subjects/${subject.id}`}>
              {subject.title}
            </Link>
          </h3>
        </div>

        <p className="text-sm sm:text-base text-slate-600 mb-6 font-medium">
          {subject.tagline}
        </p>

        <ul className="space-y-2.5 mb-6 text-sm text-slate-700">
          {subject.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-[#0A5C4C] font-bold text-xs mt-0.5">✓</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-[#CCE8E0]/60">
        <Link
          href={`/subjects/${subject.id}`}
          className="inline-flex items-center gap-1 text-sm font-bold text-[#0A5C4C] hover:text-[#08483b] transition-colors group/btn"
        >
          <span>Explore subject</span>
          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

