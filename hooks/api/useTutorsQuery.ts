import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tutorsService, TutorPayload, TutorItem } from "@/lib/api";
import { queryKeys } from "./queryKeys";

export function useTutorsQuery(filters?: { specialization?: string }) {
  return useQuery({
    queryKey: queryKeys.tutors.list(filters),
    queryFn: () => tutorsService.getAll(filters),
  });
}

export function useCreateTutorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TutorPayload) => tutorsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tutors.all });
    },
  });
}

export function useUpdateTutorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<TutorPayload> }) =>
      tutorsService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tutors.all });
    },
  });
}

export function useDeleteTutorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tutorsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tutors.all });
    },
  });
}
