import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assignmentsService, SubmitWorkPayload, AssignmentItem } from "@/lib/api";
import { queryKeys } from "./queryKeys";

export function useMyAssignmentsQuery() {
  return useQuery({
    queryKey: queryKeys.assignments.my,
    queryFn: () => assignmentsService.getMyAssignments(),
  });
}

export function useSubmitAssignmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: SubmitWorkPayload }) =>
      assignmentsService.submitWork(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.my });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
    },
  });
}
