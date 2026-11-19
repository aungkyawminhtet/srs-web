import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEnrollmentList,
  getMyEnrollments,
  getEnrollmentDetail,
  createEnrollment,
  updateEnrollmentStatus,
  deleteEnrollment,
  CreateEnrollmentPayload,
  EnrollmentsFilterParams,
} from "@/utils/api-requests/enrollments";
import { queryKeys } from "./queryKeys";

export function useMyEnrollmentsQuery() {
  return useQuery({
    queryKey: queryKeys.enrollments.my,
    queryFn: () => getMyEnrollments(),
  });
}

export function useAllEnrollmentsQuery(filters?: EnrollmentsFilterParams) {
  return useQuery({
    queryKey: queryKeys.enrollments.list(filters),
    queryFn: () => getEnrollmentList(filters),
  });
}

export function useEnrollmentDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.enrollments.detail(id),
    queryFn: () => getEnrollmentDetail(id),
    enabled: Boolean(id),
  });
}

export function useCreateEnrollmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateEnrollmentPayload) => createEnrollment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.my });
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.all });
    },
  });
}

export function useUpdateEnrollmentStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
      notes,
    }: {
      id: string;
      status: "approved" | "rejected" | "completed";
      notes?: string;
    }) => updateEnrollmentStatus(id, status, notes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.my });
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.detail(variables.id) });
    },
  });
}

export function useDeleteEnrollmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEnrollment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.my });
    },
  });
}
