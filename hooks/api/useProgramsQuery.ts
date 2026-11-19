import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProgramList,
  getProgramDetail,
  createProgram,
  updateProgram,
  deleteProgram,
  ProgramPayload,
  ProgramsFilterParams,
} from "@/utils/api-requests/programs";
import { queryKeys } from "./queryKeys";

export function useProgramsQuery(filters?: ProgramsFilterParams) {
  return useQuery({
    queryKey: queryKeys.programs.list(filters),
    queryFn: () => getProgramList(filters),
  });
}

export function useProgramQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.programs.detail(id),
    queryFn: () => getProgramDetail(id),
    enabled: Boolean(id),
  });
}

export function useCreateProgramMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProgramPayload) => createProgram(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.programs.all });
    },
  });
}

export function useUpdateProgramMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<ProgramPayload> }) =>
      updateProgram(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.programs.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.programs.detail(variables.id) });
    },
  });
}

export function useDeleteProgramMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProgram(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.programs.all });
    },
  });
}
