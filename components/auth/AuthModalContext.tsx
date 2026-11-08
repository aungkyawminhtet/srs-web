"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type AuthView = "login" | "register" | "forgot-password";

interface AuthModalContextType {
  isOpen: boolean;
  view: AuthView;
  openAuthModal: (view?: AuthView) => void;
  closeAuthModal: () => void;
  setAuthView: (view: AuthView) => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

function UrlAuthWatcher({ onAuthParam }: { onAuthParam: (view: AuthView) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth === "login" || auth === "register" || auth === "forgot-password") {
      onAuthParam(auth);
    }
  }, [searchParams, onAuthParam]);
  return null;
}

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AuthView>("login");

  const openAuthModal = useCallback((initialView: AuthView = "login") => {
    setView(initialView);
    setIsOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsOpen(false);
    // Remove ?auth query param from URL if present without page reload
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.has("auth")) {
        url.searchParams.delete("auth");
        window.history.replaceState({}, "", url.pathname + (url.search ? url.search : "") + url.hash);
      }
    }
  }, []);

  const setAuthView = useCallback((newView: AuthView) => {
    setView(newView);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeAuthModal]);

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        view,
        openAuthModal,
        closeAuthModal,
        setAuthView,
      }}
    >
      <Suspense fallback={null}>
        <UrlAuthWatcher onAuthParam={openAuthModal} />
      </Suspense>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
}

