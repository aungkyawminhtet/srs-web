/**
 * SRS Central HTTP Client
 * Reusable, senior-grade fetch wrapper connecting srs-web to srs-server.
 */

import { UserSession, SESSION_DURATION_MS } from "./types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number = 500, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Clean up legacy or foreign localhost storage keys (e.g. from previous projects like maesai_*, ors_*)
 */
export const purgeUnrelatedLocalStorage = () => {
  if (typeof window === "undefined") return;
  try {
    const explicitlyPurgedKeys = [
      // Removed mock stores (now 100% in-memory)
      "srs_instructors_store_v1",
      "srs_outlines_store_v1",
      "srs_assignments_store_v1",
      "srs_submissions_store_v1",
      "srs_threads_store_v1",
      "srs_auth_token",

      // Foreign localhost keys from other projects
      "user",
      "username",
      "maesai_lang_v1",
      "maesai_reviews_v1",
      "maesai_saved_itineraries_v1",
      "maesai_saved_places_v1",
      "maesai_submissions_v1",
      "maesai_trip_stops_v1",
      "ors-theme",
      "ors_lab_config",
      "ors_token",
      "ors_user",
      "student_record_token",
      "refreshToken",
      "token",
      "ui-store",
    ];
    explicitlyPurgedKeys.forEach((key) => localStorage.removeItem(key));

    // Dynamic scan: purge any key starting with 'srs_' that is NOT 'srs_user_session'
    const allKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) allKeys.push(key);
    }
    allKeys.forEach((key) => {
      if (key.startsWith("srs_") && key !== "srs_user_session") {
        localStorage.removeItem(key);
      }
      if (["user", "username", "token", "refreshToken", "student_record_token", "ui-store"].includes(key)) {
        localStorage.removeItem(key);
      }
    });
  } catch {}
};

// Session & Token Helpers with strictly enforced 1-day expiration limit
export const getStoredAuth = (): UserSession | null => {
  if (typeof window === "undefined") return null;
  try {
    purgeUnrelatedLocalStorage();
    const raw = localStorage.getItem("srs_user_session");
    if (!raw) return null;
    const session: UserSession = JSON.parse(raw);

    // 1-Day Limit Check: If expired, wipe session and return null
    if (session.expiresAt && Date.now() > session.expiresAt) {
      console.warn("[Auth] Session expired (exceeded 1-day limit). Clearing session.");
      setStoredAuth(null);
      return null;
    }

    return session;
  } catch {
    return null;
  }
};

export const setStoredAuth = (session: UserSession | null) => {
  if (typeof window === "undefined") return;

  if (!session) {
    // Logout: Remove all auth session items
    localStorage.removeItem("srs_user_session");
    localStorage.removeItem("srs_auth_token");
    purgeUnrelatedLocalStorage();

    // Expire cookie immediately
    document.cookie =
      "srs_user_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    return;
  }

  // Login: Enforce 1-day expiration (86,400,000 ms)
  const now = Date.now();
  const sessionWithExpiry: UserSession = {
    ...session,
    createdAt: session.createdAt || now,
    expiresAt: now + SESSION_DURATION_MS,
  };

  localStorage.setItem("srs_user_session", JSON.stringify(sessionWithExpiry));
  localStorage.removeItem("srs_auth_token"); // Clean up redundant separate token key

  // Sync session cookie with 1-day max-age (86,400 seconds)
  document.cookie = `srs_user_session=${encodeURIComponent(
    JSON.stringify(sessionWithExpiry)
  )}; path=/; max-age=86400; SameSite=Lax`;
};

export const getAuthToken = (): string | null => {
  const session = getStoredAuth();
  return session?.token || null;
};

/**
 * Universal typed API request method
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers: customHeaders, ...fetchOptions } = options;

  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        query.append(key, String(val));
      }
    });
    const queryString = query.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(customHeaders as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    const isJson = res.headers.get("content-type")?.includes("application/json");
    const json = isJson ? await res.json() : null;

    if (!res.ok) {
      const errorMsg =
        json?.msg || json?.message || `Request failed with status ${res.status}`;
      throw new ApiError(errorMsg, res.status, json);
    }

    // Server wraps response in { con: true, msg: "...", data: ... }
    if (json && typeof json === "object") {
      if ("data" in json) return json.data as T;
      if ("result" in json) return json.result as T;
    }

    return (json ?? ({} as any)) as T;
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || "Network request failed", 500);
  }
}
