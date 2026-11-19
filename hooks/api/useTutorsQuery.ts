import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTutorList,
  getTutorDetail,
  createTutor,
  updateTutor,
  deleteTutor,
  TutorPayload,
  TutorsFilterParams,
} from "@/utils/api-requests/tutors";
import { queryKeys } from "./queryKeys";

export function useTutorsQuery(filters?: TutorsFilterParams) {
  return useQuery({
    queryKey: queryKeys.tutors.list(filters),
    queryFn: () => getTutorList(filters),
  });
}

export function useTutorDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.tutors.detail(id),
    queryFn: () => getTutorDetail(id),
    enabled: Boolean(id),
  });
}

export function useCreateTutorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TutorPayload) => createTutor(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tutors.all });
    },
  });
}

export function useUpdateTutorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<TutorPayload> }) =>
      updateTutor(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tutors.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.tutors.detail(variables.id) });
    },
  });
}

export function useDeleteTutorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTutor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tutors.all });
    },
  });
}
