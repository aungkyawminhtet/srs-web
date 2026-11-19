import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { clearAuthSession, getAuthToken } from "@/lib/api/client";

/**
 * Normalizes configured base API URL
 */
const getProxyBasePath = (): string => {
  const configuredBaseApi =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BASE_API ||
    "http://localhost:4000/api/v1";

  try {
    const parsedUrl = new URL(configuredBaseApi);
    return parsedUrl.toString().replace(/\/$/, "");
  } catch {
    return configuredBaseApi.startsWith("/")
      ? configuredBaseApi.replace(/\/$/, "")
      : "http://localhost:4000/api/v1";
  }
};

let isUnauthorizedRedirecting = false;

/**
 * Handles 401 Unauthorized responses globally
 */
const handleUnauthorized = () => {
  if (typeof window === "undefined" || isUnauthorizedRedirecting) {
    return;
  }

  // Clear session from localStorage and cookies
  clearAuthSession();

  const pathname = window.location.pathname;
  if (pathname === "/login" || pathname === "/register" || pathname === "/forgot-password") {
    return;
  }

  isUnauthorizedRedirecting = true;
  window.location.href = `/login?from=${encodeURIComponent(pathname)}`;
};

/**
 * Creates and returns a configured Axios instance
 * Compatible with the oms_web architecture: apiRequest(token)
 */
export const apiRequest = (
  token?: string | null | undefined,
  config?: AxiosRequestConfig
): AxiosInstance => {
  const effectiveToken = token || getAuthToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(config?.headers as Record<string, string>),
  };

  if (effectiveToken) {
    headers.Authorization = `Bearer ${effectiveToken}`;
  }

  const baseURL = getProxyBasePath();

  const instance = axios.create({
    baseURL,
    timeout: 30000,
    headers,
    ...config,
  });

  // Response Interceptor: handle 401 and extract meaningful error messages
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any>) => {
      if (error.response?.status === 401) {
        handleUnauthorized();
      }

      // Format custom error message from server envelope
      const serverMsg =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        error.message ||
        "An unexpected API error occurred";

      const enhancedError = new Error(serverMsg) as Error & {
        status?: number;
        data?: any;
        response?: any;
      };
      enhancedError.status = error.response?.status || 500;
      enhancedError.data = error.response?.data;
      enhancedError.response = error.response;

      return Promise.reject(enhancedError);
    }
  );

  return instance;
};

export default apiRequest;
