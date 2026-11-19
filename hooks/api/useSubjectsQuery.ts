import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSubjectList,
  getSubjectDetail,
  createSubject,
  updateSubject,
  deleteSubject,
  SubjectPayload,
} from "@/utils/api-requests/subjects";
import { queryKeys } from "./queryKeys";

export function useSubjectsQuery(filters?: { programId?: string }) {
  return useQuery({
    queryKey: queryKeys.subjects.list(filters),
    queryFn: () => getSubjectList(filters),
  });
}

export function useSubjectDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.subjects.detail(id),
    queryFn: () => getSubjectDetail(id),
    enabled: Boolean(id),
  });
}

export function useCreateSubjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SubjectPayload) => createSubject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subjects.all });
    },
  });
}

export function useUpdateSubjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<SubjectPayload> }) =>
      updateSubject(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subjects.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.subjects.detail(variables.id) });
    },
  });
}

export function useDeleteSubjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSubject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subjects.all });
    },
  });
}
