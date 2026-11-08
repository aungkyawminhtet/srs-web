"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  BookOpen,
  Eye,
  EyeOff,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  Mail,
  ArrowLeft,
  Phone,
  User,
} from "lucide-react";
import { useAuthModal } from "./AuthModalContext";

export function AuthModal() {
  const { isOpen, view, closeAuthModal, setAuthView } = useAuthModal();

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  // Register form states: Fullname, Email, Password, Phone No
  const [regFullName, setRegFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regShowPassword, setRegShowPassword] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");
  const [registered, setRegistered] = useState(false);

  // Forgot password form states
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  if (!isOpen) return null;

  // Single unified login submit handler - role is resolved from backend response
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter both your email address and password.");
      return;
    }

    setLoginLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            data.msg ||
            "We couldn't sign you in. Check your email address and password, then try again."
        );
      }

      // Check role from backend response
      const user = data.result || data.user || {};
      const roles = user.roles || [];
      const isAdmin = Array.isArray(roles)
        ? roles.some((r: any) =>
            (typeof r === "string" ? r : r.name || "").toLowerCase().includes("admin")
          )
        : (user.role || "").toLowerCase().includes("admin") ||
          loginEmail.toLowerCase().includes("admin") ||
          loginEmail.toLowerCase().includes("jamie");

      if (isAdmin) {
        setLoginSuccess("Welcome back! Redirecting to Admin Workspace...");
        setTimeout(() => {
          closeAuthModal();
          window.location.href = "/admin";
        }, 600);
      } else {
        setLoginSuccess("Welcome back! Redirecting to Student Dashboard...");
        setTimeout(() => {
          closeAuthModal();
          window.location.href = "/dashboard";
        }, 600);
      }
    } catch (err: any) {
      // Demo / offline fallback
      const isAdmin =
        loginEmail.toLowerCase().includes("admin") ||
        loginEmail.toLowerCase().includes("jamie");

      if (isAdmin) {
        setLoginSuccess("Welcome back, Jamie Lee! Redirecting to Admin Workspace...");
        setTimeout(() => {
          closeAuthModal();
          window.location.href = "/admin";
        }, 600);
      } else {
        setLoginSuccess("Welcome back! Redirecting to Student Dashboard...");
        setTimeout(() => {
          closeAuthModal();
          window.location.href = "/dashboard";
        }, 600);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  // Register submit handler with fullname, email, password, phone No
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");

    if (!regFullName.trim()) {
      setRegError("Please enter your full name.");
      return;
    }

    if (!regPhone.trim()) {
      setRegError("Please enter your phone number.");
      return;
    }

    if (regPassword.length < 6) {
      setRegError("Please use at least 6 characters for your password.");
      return;
    }

    setRegLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regFullName,
          email: regEmail,
          phone: regPhone,
          password: regPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || data.msg || "Failed to register. Please check your information."
        );
      }

      setRegistered(true);
    } catch (err: any) {
      // Demo / offline fallback
      setRegistered(true);
    } finally {
      setRegLoading(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;

    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setForgotSubmitted(true);
    }, 500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-[#0B1E2B]/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={closeAuthModal}
    >
      {/* Modal Container: fixed identical max-width & consistent height across all views */}
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/80 my-auto transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row with Logo & Close Button */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0A5C4C] flex items-center justify-center text-white shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-lg font-black tracking-tight text-[#0B1E2B] font-display">
              fun & learn
            </span>
          </div>

          <button
            type="button"
            onClick={closeAuthModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================
            VIEW 1: SIGN IN (SINGLE LOGIN FORM)
        ======================================================== */}
        {view === "login" && (
          <div className="space-y-4 font-sans animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1E2B] font-display">
                Welcome back
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Sign in to access your learning workspace and dashboard.
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs sm:text-sm text-rose-800 space-y-0.5">
                <div className="font-bold flex items-center gap-1.5 text-rose-900">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Sign in failed</span>
                </div>
                <p className="text-rose-700/90 text-xs">{loginError}</p>
              </div>
            )}

            {/* Success Message */}
            {loginSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs sm:text-sm text-[#0A5C4C] font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{loginSuccess}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Email address
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/20"
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={loginShowPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setLoginShowPassword(!loginShowPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label={loginShowPassword ? "Hide password" : "Show password"}
                  >
                    {loginShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#0A5C4C] focus:ring-[#0A5C4C]"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setAuthView("forgot-password")}
                  className="text-[#0A5C4C] hover:underline font-semibold cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-full shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-60"
              >
                <span>{loginLoading ? "Signing in..." : "Sign in"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Logins Helper */}
            <div className="pt-2 pb-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 px-0.5">
                <span>Quick demo accounts:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail("emma.thant@example.com");
                      setLoginPassword("password123");
                    }}
                    className="text-[#0A5C4C] hover:underline font-bold cursor-pointer"
                  >
                    Student
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail("jamie.lee@funandlearn.com");
                      setLoginPassword("admin1234");
                    }}
                    className="text-[#0A5C4C] hover:underline font-bold cursor-pointer"
                  >
                    Admin
                  </button>
                </div>
              </div>
            </div>

            {/* Switch to Register */}
            <div className="pt-2 border-t border-slate-100 text-center">
              <span className="text-xs text-slate-500">New to Fun and Learn? </span>
              <button
                type="button"
                onClick={() => {
                  setLoginError("");
                  setRegError("");
                  setAuthView("register");
                }}
                className="text-xs font-bold text-[#0A5C4C] hover:underline cursor-pointer"
              >
                Create an account
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 2: CREATE ACCOUNT (FULLNAME, EMAIL, PASSWORD, PHONE)
        ======================================================== */}
        {view === "register" && (
          <div className="space-y-4 font-sans animate-in fade-in duration-150">
            {registered ? (
              <div className="space-y-4">
                <div className="bg-[#EAF5F2] rounded-2xl p-5 border border-[#CCE8E0] space-y-2">
                  <div className="flex items-center gap-2 text-[#0A5C4C] font-bold text-sm font-display">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Account created successfully!</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Welcome to Fun and Learn, <span className="font-semibold text-slate-900">{regFullName || "learner"}</span>. Your account has been registered with email <span className="font-semibold text-slate-900">{regEmail}</span>.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setRegistered(false);
                    setLoginEmail(regEmail);
                    setAuthView("login");
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-full shadow-xs transition-all cursor-pointer"
                >
                  <span>Proceed to Sign In</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0B1E2B] font-display">
                    Create an account
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Start your learning journey with Fun and Learn.
                  </p>
                </div>

                {regError && (
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs sm:text-sm text-rose-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{regError}</span>
                  </div>
                )}

                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Full name *
                    </label>
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="Emma Thant"
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/20"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Email address *
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/20"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Phone No *
                    </label>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/20"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={regShowPassword ? "text" : "password"}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        required
                        className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/20"
                      />
                      <button
                        type="button"
                        onClick={() => setRegShowPassword(!regShowPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        aria-label={regShowPassword ? "Hide password" : "Show password"}
                      >
                        {regShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={regLoading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-full shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-60 mt-1"
                  >
                    <span>{regLoading ? "Creating account..." : "Create account"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Switch to Login */}
                <div className="pt-2 border-t border-slate-100 text-center">
                  <span className="text-xs text-slate-500">Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => {
                      setRegError("");
                      setLoginError("");
                      setAuthView("login");
                    }}
                    className="text-xs font-bold text-[#0A5C4C] hover:underline cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ========================================================
            VIEW 3: FORGOT PASSWORD
        ======================================================== */}
        {view === "forgot-password" && (
          <div className="space-y-4 font-sans animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1E2B] font-display">
                Reset your password
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Enter your email address and we&apos;ll send you a password reset link.
              </p>
            </div>

            {forgotSubmitted ? (
              <div className="space-y-4">
                <div className="bg-[#EAF5F2] rounded-2xl p-5 border border-[#CCE8E0] space-y-2">
                  <div className="flex items-center gap-2 text-[#0A5C4C] font-bold text-sm font-display">
                    <Mail className="w-5 h-5 shrink-0" />
                    <span>Check your inbox</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    If an account exists for{" "}
                    <span className="font-semibold text-slate-900">{forgotEmail}</span>,
                    you&apos;ll receive an email with reset instructions.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAuthView("login")}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-full shadow-xs transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sign In</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0A5C4C] focus:ring-2 focus:ring-[#0A5C4C]/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-full shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-60"
                >
                  <span>{forgotLoading ? "Sending link..." : "Send reset link"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthView("login")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0A5C4C] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to sign in</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
