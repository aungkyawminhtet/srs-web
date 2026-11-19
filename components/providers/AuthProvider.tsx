"use client";

import React, { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { purgeUnrelatedLocalStorage, getStoredAuth } from "@/lib/api/client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Clean up alien localhost keys from previous projects (maesai_*, ors_*, stray tokens)
    purgeUnrelatedLocalStorage();
    // 2. Enforce 1-day limit on active session (auto-wipes if expired)
    getStoredAuth();
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}
