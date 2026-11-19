import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { libraryService, LibraryPayload, LibraryItem } from "@/lib/api";
import { queryKeys } from "./queryKeys";

export function useLibraryQuery(filters?: { fileType?: string; savedOnly?: boolean }) {
  return useQuery({
    queryKey: queryKeys.library.list(filters),
    queryFn: () => libraryService.getAll(filters),
  });
}

export function useToggleSaveLibraryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => libraryService.toggleSave(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.library.all });
    },
  });
}

export function useUploadLibraryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LibraryPayload) => libraryService.upload(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.library.all });
    },
  });
}
