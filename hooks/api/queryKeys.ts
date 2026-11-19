/**
 * Central TanStack Query Keys Factory
 * Ensures consistent cache keys and invalidation across all components.
 */

export const queryKeys = {
  auth: {
    profile: ["auth", "profile"] as const,
  },
  programs: {
    all: ["programs"] as const,
    list: (filters?: Record<string, any>) => ["programs", "list", filters] as const,
    detail: (id: string) => ["programs", "detail", id] as const,
  },
  subjects: {
    all: ["subjects"] as const,
    list: (filters?: Record<string, any>) => ["subjects", "list", filters] as const,
    detail: (id: string) => ["subjects", "detail", id] as const,
  },
  tutors: {
    all: ["tutors"] as const,
    list: (filters?: Record<string, any>) => ["tutors", "list", filters] as const,
    detail: (id: string) => ["tutors", "detail", id] as const,
  },
  enrollments: {
    all: ["enrollments"] as const,
    my: ["enrollments", "my"] as const,
    list: (filters?: Record<string, any>) => ["enrollments", "list", filters] as const,
    detail: (id: string) => ["enrollments", "detail", id] as const,
  },
  schedules: {
    all: ["schedules"] as const,
    weekly: (studentId?: string) => ["schedules", "weekly", studentId] as const,
  },
  assignments: {
    all: ["assignments"] as const,
    my: ["assignments", "my"] as const,
    list: (filters?: Record<string, any>) => ["assignments", "list", filters] as const,
  },
  library: {
    all: ["library"] as const,
    list: (filters?: Record<string, any>) => ["library", "list", filters] as const,
  },
  students: {
    all: ["students"] as const,
    list: (filters?: Record<string, any>) => ["students", "list", filters] as const,
  },
};
