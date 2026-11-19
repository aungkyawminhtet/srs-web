import {
  login,
  register,
  getCurrentUser,
  logout,
  refreshToken,
  LoginPayload,
  RegisterPayload,
} from "@/utils/api-requests/auth";
import { UserSession } from "./types";

export type { LoginPayload, RegisterPayload, UserSession };

export const authService = {
  login,
  register,
  logout,
  refreshToken,
  getProfile: getCurrentUser,
};

export const authApi = authService;
