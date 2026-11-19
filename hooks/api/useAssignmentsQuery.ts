import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAssignmentList,
  getMyAssignments,
  getAssignmentDetail,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  AssignmentPayload,
  SubmitWorkPayload,
} from "@/utils/api-requests/assignments";
import { queryKeys } from "./queryKeys";

export function useMyAssignmentsQuery() {
  return useQuery({
    queryKey: queryKeys.assignments.my,
    queryFn: () => getMyAssignments(),
  });
}

export function useAssignmentsQuery(filters?: { courseId?: string; status?: string }) {
  return useQuery({
    queryKey: queryKeys.assignments.list(filters),
    queryFn: () => getAssignmentList(filters),
  });
}

export function useAssignmentDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.assignments.detail(id),
    queryFn: () => getAssignmentDetail(id),
    enabled: Boolean(id),
  });
}

export function useCreateAssignmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AssignmentPayload) => createAssignment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
    },
  });
}

export function useUpdateAssignmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<AssignmentPayload> }) =>
      updateAssignment(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.detail(variables.id) });
    },
  });
}

export function useDeleteAssignmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAssignment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
    },
  });
}

export function useSubmitAssignmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: SubmitWorkPayload }) =>
      submitAssignment(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.my });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.detail(variables.id) });
    },
  });
}
