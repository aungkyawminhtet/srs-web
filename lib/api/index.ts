/**
 * SRS Central API Layer
 * Clean, senior-grade modular API services for srs-web.
 */

export * from "./types";
export * from "./client";
export * from "./auth";
export * from "./programs";
export * from "./subjects";
export * from "./tutors";
export * from "./enrollments";
export * from "./schedules";
export * from "./assignments";
export * from "./library";
export * from "./students";

// Aliases for unified imports
import { authService } from "./auth";
import { programsService } from "./programs";
import { subjectsService } from "./subjects";
import { tutorsService } from "./tutors";
import { enrollmentsService } from "./enrollments";
import { schedulesService } from "./schedules";
import { assignmentsService } from "./assignments";
import { libraryService } from "./library";
import { studentsService } from "./students";

export const api = {
  auth: authService,
  programs: programsService,
  subjects: subjectsService,
  tutors: tutorsService,
  enrollments: enrollmentsService,
  schedules: schedulesService,
  assignments: assignmentsService,
  library: libraryService,
  students: studentsService,
};

export default api;
