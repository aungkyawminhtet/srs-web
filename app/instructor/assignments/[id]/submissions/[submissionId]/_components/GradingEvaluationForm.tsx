"use client";

import React, { useState } from "react";
import { Check, Sparkles, Send, Award, MessageSquare } from "lucide-react";
import { StudentSubmission } from "@/lib/instructorStore";

interface GradingEvaluationFormProps {
  submission: StudentSubmission;
  onSaveGrade: (grade: number, feedback: string) => void;
  savedToast: boolean;
}

export function GradingEvaluationForm({
  submission,
  onSaveGrade,
  savedToast,
}: GradingEvaluationFormProps) {
  const [score, setScore] = useState<number>(
    submission.grade !== undefined ? submission.grade : Math.round(submission.maxPoints * 0.9)
  );
  const [feedback, setFeedback] = useState<string>(
    submission.feedback ||
      `Excellent effort, ${submission.studentName.split(" ")[0]}! Your method demonstrates thorough comprehension of the core objectives.`
  );

  const quickFeedbackSnippets = [
    "Precise calculations and excellent step-by-step documentation.",
    "Good conceptual grasp. Double-check your signs in step 2.",
    "Clear visual diagrams! Keep up the great mathematical reasoning.",
    "Solid attempt. Please review the fraction strips worksheet for next class.",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveGrade(Number(score), feedback.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-5"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#0A5C4C]" />
          <h3 className="font-bold text-base text-[#0B1E2B] font-display">
            Instructor Grading Studio
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Max: {submission.maxPoints} pts
        </span>
      </div>

      {/* Score Input */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
          Numerical Score (Points Awarded) *
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="0"
            max={submission.maxPoints}
            required
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="w-32 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-lg font-black text-[#0B1E2B] focus:outline-none focus:border-[#0A5C4C] focus:bg-white transition-all"
          />
          <div className="text-xs text-slate-500 font-semibold">
            / {submission.maxPoints} points ({Math.round((score / submission.maxPoints) * 100)}%)
          </div>
        </div>
      </div>

      {/* Constructive Feedback Textarea */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
            Constructive Feedback &amp; Advice *
          </label>
          <span className="text-[10px] text-slate-400">Visible to Student &amp; Parents</span>
        </div>
        <textarea
          rows={5}
          required
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Offer words of encouragement and explain what was done well..."
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0A5C4C] focus:bg-white leading-relaxed transition-all"
        />
      </div>

      {/* Quick Snippet Chips */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#0A5C4C]" />
          Quick Feedback Snippets:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickFeedbackSnippets.map((snippet, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setFeedback((prev) => (prev ? `${prev} ${snippet}` : snippet))}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80 transition-colors text-left cursor-pointer"
            >
              + {snippet}
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          Publishing updates the student portal in real-time.
        </span>

        <button
          type="submit"
          className="px-5 py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          {savedToast ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Grade Published!</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Save &amp; Publish Grade</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
