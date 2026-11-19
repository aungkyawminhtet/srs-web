import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  login,
  register,
  logout,
  refreshToken,
  getCurrentUser,
  LoginPayload,
  RegisterPayload,
} from "@/utils/api-requests/auth";
import { queryKeys } from "./queryKeys";

export function useProfileQuery(enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.auth.profile,
    queryFn: () => getCurrentUser(),
    enabled,
    retry: false,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: LoginPayload) => login(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.profile, user);
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.my });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.my });
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.profile, user);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useRefreshTokenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => refreshToken(),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.profile, user);
    },
  });
}
