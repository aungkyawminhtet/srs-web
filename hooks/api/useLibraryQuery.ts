import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getLibraryList,
  getLibraryDetail,
  createLibraryItem,
  updateLibraryItem,
  deleteLibraryItem,
  toggleSaveLibraryItem,
  LibraryPayload,
  LibraryFilterParams,
} from "@/utils/api-requests/library";
import { queryKeys } from "./queryKeys";

export function useLibraryQuery(filters?: LibraryFilterParams) {
  return useQuery({
    queryKey: queryKeys.library.list(filters),
    queryFn: () => getLibraryList(filters),
  });
}

export function useLibraryDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.library.detail(id),
    queryFn: () => getLibraryDetail(id),
    enabled: Boolean(id),
  });
}

export function useUploadLibraryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LibraryPayload) => createLibraryItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.library.all });
    },
  });
}

export function useUpdateLibraryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<LibraryPayload> }) =>
      updateLibraryItem(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.library.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.library.detail(variables.id) });
    },
  });
}

export function useDeleteLibraryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLibraryItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.library.all });
    },
  });
}

export function useToggleSaveLibraryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toggleSaveLibraryItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.library.all });
    },
  });
}
