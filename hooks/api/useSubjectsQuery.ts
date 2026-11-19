import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { subjectsService, SubjectPayload, SubjectItem } from "@/lib/api";
import { queryKeys } from "./queryKeys";

export function useSubjectsQuery(filters?: { programId?: string }) {
  return useQuery({
    queryKey: queryKeys.subjects.list(filters),
    queryFn: () => subjectsService.getAll(filters),
  });
}

export function useCreateSubjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SubjectPayload) => subjectsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subjects.all });
    },
  });
}

export function useUpdateSubjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<SubjectPayload> }) =>
      subjectsService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subjects.all });
    },
  });
}

export function useDeleteSubjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => subjectsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subjects.all });
    },
  });
}
