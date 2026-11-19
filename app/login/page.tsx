"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { setStoredAuth } from "@/lib/api/client";
import { instructorStore } from "@/lib/instructorStore";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";
  const errorParam = searchParams.get("error");

  const getInitialError = (err: string | null) => {
    if (!err) return "";
    if (err === "session_expired") {
      return "Your session has expired (1-day limit reached). Please sign in again to continue.";
    }
    if (err === "admin_required") {
      return "Administrator privileges required to access the Admin workspace. Please sign in with an Admin account.";
    }
    if (err === "instructor_required") {
      return "Instructor privileges required to access the Instructor portal. Please sign in with a Teacher account.";
    }
    return "Authentication failed. Please check your credentials or Google account.";
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(getInitialError(errorParam));
  const [successMessage, setSuccessMessage] = useState("");

  // Handle Google OAuth Login
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrorMessage("");

    try {
      // Calls NextAuth Google Provider directly
      await signIn("google", {
        callbackUrl: callbackUrl || "/dashboard",
      });
    } catch (err: any) {
      setErrorMessage("Google Sign-In failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  // Handle Credentials Login (with NextAuth & Local Session Sync)
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both your email address and password.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // 1. NextAuth sign in
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // 2. Resolve Role for immediate routing & local store sync
      const lowerEmail = email.toLowerCase();
      const isAdmin = lowerEmail.includes("admin");
      const isInstructor =
        lowerEmail.includes("instructor") ||
        lowerEmail.includes("chen") ||
        lowerEmail.includes("rivera");

      let destination = callbackUrl;

      if (isAdmin) {
        setStoredAuth({
          _id: "USR-ADMIN",
          name: "Jamie Lee",
          email,
          role: "admin",
          token: "mock-token-admin",
          redirectUrl: "/admin",
        });
        destination = destination || "/admin";
        setSuccessMessage("Signed in as Admin. Redirecting to workspace...");
      } else if (isInstructor) {
        const found = instructorStore.getInstructorByEmail(email);
        setStoredAuth({
          _id: found?.id || "INS-101",
          name: found?.name || "Lin Chen",
          email,
          role: "instructor",
          phone: found?.phone || "+1 (555) 349-8201",
          avatar: found?.avatar || "LC",
          assignedCourses: found?.assignedCourses || ["math-that-clicks", "algebra-with-confidence"],
          token: "mock-token-instructor",
          redirectUrl: "/instructor",
        });
        destination = destination || "/instructor";
        setSuccessMessage("Signed in as Instructor. Redirecting to portal...");
      } else {
        setStoredAuth({
          _id: "USR-STUDENT",
          name: email.split("@")[0].replace(".", " "),
          email,
          role: "student",
          token: "mock-token-student",
          redirectUrl: "/dashboard",
        });
        destination = destination || "/dashboard";
        setSuccessMessage("Signed in successfully. Redirecting to student dashboard...");
      }

      setTimeout(() => {
        window.location.href = destination;
      }, 400);
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Top Brand */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-2xl bg-[#0A5C4C] text-white flex items-center justify-center font-black shadow-xs group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5 text-emerald-300" />
          </div>
          <span className="text-2xl font-black text-[#0B1E2B] font-display tracking-tight">
            fun &amp; learn
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E2B] font-display">
          Welcome back
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Sign in to access your course outlines, assignments, and real-time communications.
        </p>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-7 px-6 sm:px-9 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40">
          {/* Alerts */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 1. Google OAuth Direct Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 shadow-2xs hover:shadow transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
          >
            {/* Google G Multi-Color SVG */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
              />
            </svg>
            <span>{googleLoading ? "Connecting Google..." : "Continue with Google"}</span>
          </button>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200/80" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider font-mono text-slate-400">
              <span className="bg-white px-3">or continue with email</span>
            </div>
          </div>

          {/* 2. Credentials Form */}
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-semibold text-[#0A5C4C] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C4C]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-2.5 bg-[#0A5C4C] hover:bg-[#08483B] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <span>{loading ? "Signing in..." : "Sign In to Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono block mb-2 text-center">
              Quick Demo Accounts
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => handleSelectDemo("admin@funandlearn.com", "admin2026!")}
                className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-semibold truncate cursor-pointer text-center"
              >
                🛡️ Admin
              </button>
              <button
                type="button"
                onClick={() => handleSelectDemo("lin.chen@funandlearn.com", "teach2026!")}
                className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-semibold truncate cursor-pointer text-center"
              >
                🎓 Teacher
              </button>
              <button
                type="button"
                onClick={() => handleSelectDemo("emma.thant@student.edu", "student2026!")}
                className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-semibold truncate cursor-pointer text-center"
              >
                🎒 Student
              </button>
            </div>
          </div>
        </div>

        {/* Bottom register link */}
        <p className="text-center text-xs text-slate-500 mt-5">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="font-bold text-[#0A5C4C] hover:underline">
            Register for free
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-400">Loading sign in...</div>}>
      <LoginContent />
    </Suspense>
  );
}
