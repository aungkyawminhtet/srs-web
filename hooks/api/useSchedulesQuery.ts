import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { schedulesService, SchedulePayload, ScheduleItem } from "@/lib/api";
import { queryKeys } from "./queryKeys";

export function useWeeklyScheduleQuery(studentId?: string) {
  return useQuery({
    queryKey: queryKeys.schedules.weekly(studentId),
    queryFn: () => schedulesService.getWeekly(studentId ? { studentId } : undefined),
  });
}

export function useCreateScheduleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SchedulePayload) => schedulesService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.schedules.all });
    },
  });
}

export function useDeleteScheduleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => schedulesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.schedules.all });
    },
  });
}
