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
import { LibraryItem } from "./types";

export type { LibraryPayload, LibraryFilterParams, LibraryItem };
export type LibraryFileItem = LibraryItem;

export const libraryService = {
  getAll: async (params?: LibraryFilterParams): Promise<LibraryItem[]> => {
    return getLibraryList(params);
  },

  getById: async (id: string): Promise<LibraryItem> => {
    return getLibraryDetail(id);
  },

  upload: async (payload: LibraryPayload): Promise<LibraryItem> => {
    return createLibraryItem(payload);
  },

  update: async (id: string, payload: Partial<LibraryPayload>): Promise<LibraryItem> => {
    return updateLibraryItem(id, payload);
  },

  delete: async (id: string): Promise<{ id: string }> => {
    return deleteLibraryItem(id);
  },

  toggleSave: async (id: string): Promise<{ id: string; isSaved: boolean }> => {
    return toggleSaveLibraryItem(id);
  },
};

export const libraryApi = libraryService;
