import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService, LoginPayload, RegisterPayload, UserSession } from "@/lib/api";
import { queryKeys } from "./queryKeys";

export function useProfileQuery(enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.auth.profile,
    queryFn: () => authService.getProfile(),
    enabled,
    retry: false,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: LoginPayload) => authService.login(credentials),
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
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.profile, user);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
