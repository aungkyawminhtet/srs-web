import { apiClient, setStoredAuth } from "./client";
import { UserSession } from "./types";

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

export const authService = {
  login: async (credentials: LoginPayload): Promise<UserSession> => {
    const data = await apiClient<UserSession>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    setStoredAuth(data);
    return data;
  },

  register: async (payload: RegisterPayload): Promise<UserSession> => {
    const data = await apiClient<UserSession>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setStoredAuth(data);
    return data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient("/auth/logout", { method: "POST" });
    } catch {
      // Ignore network errors on logout
    } finally {
      setStoredAuth(null);
    }
  },

  getProfile: async (): Promise<UserSession> => {
    return apiClient<UserSession>("/auth/profile");
  },
};
