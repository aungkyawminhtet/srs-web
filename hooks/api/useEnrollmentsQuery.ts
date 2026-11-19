import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enrollmentsService, CreateEnrollmentPayload, EnrollmentItem } from "@/lib/api";
import { queryKeys } from "./queryKeys";

export function useMyEnrollmentsQuery() {
  return useQuery({
    queryKey: queryKeys.enrollments.my,
    queryFn: () => enrollmentsService.getMyEnrollments(),
  });
}

export function useAllEnrollmentsQuery(filters?: { status?: string }) {
  return useQuery({
    queryKey: queryKeys.enrollments.list(filters),
    queryFn: () => enrollmentsService.getAll(filters),
  });
}

export function useCreateEnrollmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateEnrollmentPayload) => enrollmentsService.create(payload),
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
    }) => enrollmentsService.updateStatus(id, status, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.my });
    },
  });
}
