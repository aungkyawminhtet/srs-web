import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getScheduleList,
  getWeeklySchedule,
  getScheduleDetail,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  SchedulePayload,
} from "@/utils/api-requests/schedules";
import { queryKeys } from "./queryKeys";

export function useWeeklyScheduleQuery(studentId?: string) {
  return useQuery({
    queryKey: queryKeys.schedules.weekly(studentId),
    queryFn: () => getWeeklySchedule(studentId),
  });
}

export function useSchedulesQuery(filters?: { studentId?: string; tutorId?: string }) {
  return useQuery({
    queryKey: queryKeys.schedules.list(filters),
    queryFn: () => getScheduleList(filters),
  });
}

export function useScheduleDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.schedules.detail(id),
    queryFn: () => getScheduleDetail(id),
    enabled: Boolean(id),
  });
}

export function useCreateScheduleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SchedulePayload) => createSchedule(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.schedules.all });
    },
  });
}

export function useUpdateScheduleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<SchedulePayload> }) =>
      updateSchedule(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.schedules.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.schedules.detail(variables.id) });
    },
  });
}

export function useDeleteScheduleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSchedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.schedules.all });
    },
  });
}
