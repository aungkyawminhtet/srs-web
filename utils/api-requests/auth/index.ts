import { apiRequest } from "@/utils/axios";
import { setStoredAuth } from "@/lib/api/client";
import type { UserSession } from "@/lib/api/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: "student" | "admin";
  grade?: string;
  phone?: string;
}

export interface AuthApiResponse {
  con: boolean;
  msg: string;
  data: UserSession;
}

/**
 * Log in with email and password
 */
export async function login(data: LoginPayload): Promise<UserSession> {
  const response = await apiRequest().post<AuthApiResponse>("/auth/login", data);
  const session = response.data.data;
  setStoredAuth(session);
  return session;
}

/**
 * Register a new user
 */
export async function register(data: RegisterPayload): Promise<UserSession> {
  const response = await apiRequest().post<AuthApiResponse>("/auth/register", data);
  const session = response.data.data;
  setStoredAuth(session);
  return session;
}

/**
 * Get current authenticated user profile
 */
export async function getCurrentUser(token?: string): Promise<UserSession> {
  const response = await apiRequest(token).get<AuthApiResponse>("/auth/profile");
  return response.data.data;
}

/**
 * Log out and clear session
 */
export async function logout(token?: string): Promise<void> {
  try {
    await apiRequest(token).post("/auth/logout");
  } catch {
    // Ignore network error on logout
  } finally {
    setStoredAuth(null);
  }
}

/**
 * Refresh authentication token
 */
export async function refreshToken(token?: string): Promise<UserSession> {
  const response = await apiRequest(token).post<AuthApiResponse>("/auth/refresh");
  const session = response.data.data;
  setStoredAuth(session);
  return session;
}
