import React from "react";
import Image from "next/image";
import { Check, Mic, Video, Share2, PenTool, Eraser, Type, Sparkles } from "lucide-react";

export function VirtualClassroomSection() {
  return (
    <section className="py-20 md:py-28 bg-[#0B1E2B] text-white overflow-hidden relative">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Virtual Classroom Canvas Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-[#132A3B] border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl relative">
              {/* Classroom Window Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-semibold text-slate-300">
                    tutoreem live classroom • Algebra II
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>00:42:18</span>
                </div>
              </div>

              {/* Whiteboard + Video Split */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Whiteboard Area (2 cols) */}
                <div className="sm:col-span-2 bg-[#FBFBFA] text-slate-900 rounded-2xl p-6 min-h-[260px] flex flex-col justify-between relative shadow-inner">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Step-by-step resolution
                    </div>
                    <div className="text-xl font-bold text-slate-800 mb-4 font-mono">
                      Finding the Unknown
                    </div>

                    <div className="space-y-2 font-mono text-lg">
                      <div className="text-slate-700">2x + 4 = 12</div>
                      <div className="text-[#0B6B58] font-bold">2x = 8</div>
                      <div className="inline-block bg-emerald-100 text-[#0B6B58] px-2.5 py-1 rounded-md font-black">
                        x = 4
                      </div>
                    </div>

                    {/* Handwriting simulated note bubble */}
                    <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3 py-1.5 rounded-xl shadow-xs">
                      <span className="text-amber-500">✍️</span>
                      <span>Great job! You subtracted 4 on both sides to isolate x.</span>
                    </div>
                  </div>

                  {/* Canvas Mini Tools */}
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-200/60 mt-4 text-slate-500">
                    <button className="p-1.5 rounded-lg bg-emerald-100 text-[#0B6B58]" title="Pen">
                      <PenTool className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100" title="Eraser">
                      <Eraser className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100" title="Text">
                      <Type className="w-4 h-4" />
                    </button>
                    <div className="ml-auto text-[11px] font-medium text-slate-400">
                      Grid 100% • Sync Active
                    </div>
                  </div>
                </div>

                {/* Tutor Live Camera + Controls (1 col) */}
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-800 shadow-md">
                    <Image
                      src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop"
                      alt="Tutor explaining problem on webcam"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs px-2 py-1 rounded-lg text-[11px] font-semibold text-white truncate">
                      Lin Chen (Tutor)
                    </div>
                  </div>

                  {/* Student mini webcam */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-xs">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
                      alt="Student attending live lesson"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs px-2 py-1 rounded-lg text-[11px] font-semibold text-white truncate">
                      Emma (Student)
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-around bg-[#1B364B] rounded-2xl p-2 border border-slate-700 text-slate-300">
                    <button className="p-2 rounded-xl hover:bg-slate-700 text-emerald-400" title="Mute/Unmute">
                      <Mic className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-xl hover:bg-slate-700 text-emerald-400" title="Camera">
                      <Video className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-xl hover:bg-slate-700" title="Share Screen">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right: Pitch & Benefits */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Virtual Classroom Experience</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-6 font-display">
              A real connection. <br />
              <span className="text-emerald-400">An “aha!” in real time.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              More than a standard video call. Our proprietary interactive classroom makes complex concepts click through live digital whiteboards, simultaneous document editing, and immediate feedback.
            </p>

            <ul className="space-y-4 text-slate-200 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <span>
                  <strong>Interactive whiteboard:</strong> Draw math equations, sketch biological diagrams, or annotate essays alongside your tutor.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <span>
                  <strong>Session recordings:</strong> Review explanations and step-by-step notes anytime before tests and finals.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <span>
                  <strong>Curated question banks:</strong> Real-time problem sets aligned to your school district’s specific textbooks.
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

