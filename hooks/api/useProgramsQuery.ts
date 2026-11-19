import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { programsService, ProgramPayload, ProgramItem } from "@/lib/api";
import { queryKeys } from "./queryKeys";

export function useProgramsQuery(filters?: { curriculum?: string; gradeLevel?: string }) {
  return useQuery({
    queryKey: queryKeys.programs.list(filters),
    queryFn: () => programsService.getAll(filters),
  });
}

export function useProgramQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.programs.detail(id),
    queryFn: () => programsService.getById(id),
    enabled: Boolean(id),
  });
}

export function useCreateProgramMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProgramPayload) => programsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.programs.all });
    },
  });
}

export function useUpdateProgramMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<ProgramPayload> }) =>
      programsService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.programs.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.programs.detail(variables.id) });
    },
  });
}

export function useDeleteProgramMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => programsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.programs.all });
    },
  });
}
