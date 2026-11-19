"use client";

import { PROGRAMS } from "./data";

export interface Instructor {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "instructor";
  title: string;
  phone: string;
  bio: string;
  assignedCourses: string[]; // Program IDs
  status: "active" | "invited" | "review" | "inactive";
  workloadHours: number;
  maxHours: number;
  avatar?: string;
  createdAt: string;
}

export interface LessonItem {
  id: string;
  lessonNumber: number;
  title: string;
  durationMinutes: number;
  objectives: string[];
  resourceTitle?: string;
  resourceLink?: string;
  liveMeetingUrl?: string;
}

export interface OutlineModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  lessons: LessonItem[];
}

export interface CourseOutlineData {
  courseId: string;
  courseTitle: string;
  modules: OutlineModule[];
}

export interface InstructorAssignment {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  status: "active" | "draft" | "closed";
  createdAt: string;
}

export interface StudentSubmission {
  id: string;
  assignmentId: string;
  courseId: string;
  studentName: string;
  studentEmail: string;
  studentAvatar: string;
  submittedAt: string;
  content: string;
  attachmentName?: string;
  status: "submitted" | "graded";
  grade?: number;
  maxPoints: number;
  feedback?: string;
  gradedAt?: string;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: "instructor" | "student" | "admin";
  text: string;
  time: string;
  isMe: boolean;
}

export interface ChatThread {
  id: string;
  participantName: string;
  participantRole: "student" | "admin";
  participantEmail: string;
  participantAvatar: string;
  courseTitle?: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: ChatMessage[];
}

// ----------------------------------------------------------------------
// INITIAL SEED DATA
// ----------------------------------------------------------------------

const DEFAULT_INSTRUCTORS: Instructor[] = [
  {
    id: "INS-101",
    name: "Lin Chen",
    email: "lin.chen@funandlearn.com",
    password: "instructor123",
    role: "instructor",
    title: "Senior Mathematics & Algebra Instructor",
    phone: "+1 (555) 349-8201",
    bio: "Over 8 years of teaching Algebra, Geometry, and Number Theory. Former STEM educator with passion for visual math intuition.",
    assignedCourses: ["math-that-clicks", "algebra-with-confidence"],
    status: "active",
    workloadHours: 18,
    maxHours: 20,
    avatar: "LC",
    createdAt: "2026-11-01",
  },
  {
    id: "INS-102",
    name: "Alex Rivera",
    email: "alex.rivera@funandlearn.com",
    password: "instructor123",
    role: "instructor",
    title: "Computer Science & Coding Lead",
    phone: "+1 (555) 782-1920",
    bio: "Software engineer and educator inspiring the next generation of coders through game development and Python fundamentals.",
    assignedCourses: ["coding-with-scratch", "python-for-beginners"],
    status: "active",
    workloadHours: 14,
    maxHours: 20,
    avatar: "AR",
    createdAt: "2026-11-03",
  },
];

const DEFAULT_OUTLINES: Record<string, CourseOutlineData> = {
  "math-that-clicks": {
    courseId: "math-that-clicks",
    courseTitle: "Math that clicks",
    modules: [
      {
        id: "m-1",
        moduleNumber: 1,
        title: "Number Sense & Place Value Intuition",
        description: "Visualizing tens, hundreds, and thousands using base-10 blocks and number lines.",
        lessons: [
          {
            id: "l-101",
            lessonNumber: 1,
            title: "Exploring 3-Digit and 4-Digit Place Values",
            durationMinutes: 45,
            objectives: ["Decompose numbers into hundreds and tens", "Understand base-10 representations"],
            resourceTitle: "Visual Place Value Mat.pdf",
            resourceLink: "https://example.com/place-value-mat.pdf",
            liveMeetingUrl: "https://meet.funandlearn.com/math-clicks-room",
          },
          {
            id: "l-102",
            lessonNumber: 2,
            title: "Mental Addition and Subtraction Strategies",
            durationMinutes: 45,
            objectives: ["Master compensation method", "Use visual number line jumps"],
            resourceTitle: "Mental Math Quick Practice.pdf",
            resourceLink: "https://example.com/mental-math.pdf",
          },
          {
            id: "l-103",
            lessonNumber: 3,
            title: "Patterns in Multiples & Skip Counting",
            durationMinutes: 50,
            objectives: ["Identify 2s, 5s, 10s and 3s rhythm", "Solve visual pattern sequences"],
          },
        ],
      },
      {
        id: "m-2",
        moduleNumber: 2,
        title: "Fractions & Parts of a Whole",
        description: "Making fractions visual with pizzas, tape diagrams, and interactive measuring tools.",
        lessons: [
          {
            id: "l-201",
            lessonNumber: 4,
            title: "Understanding Halves, Thirds & Quarters",
            durationMinutes: 50,
            objectives: ["Draw circular and bar fraction models", "Compare equal vs unequal shares"],
            resourceTitle: "Fraction Strip Cutouts.pdf",
            resourceLink: "https://example.com/fraction-strips.pdf",
            liveMeetingUrl: "https://meet.funandlearn.com/math-clicks-room",
          },
          {
            id: "l-202",
            lessonNumber: 5,
            title: "Equivalent Fractions on a Number Line",
            durationMinutes: 50,
            objectives: ["Place 1/2, 2/4 and 4/8 on common line", "Recognize visual identity"],
          },
        ],
      },
      {
        id: "m-3",
        moduleNumber: 3,
        title: "Real-World Geometry & Word Problems",
        description: "Connecting arithmetic to real geometry and everyday structures.",
        lessons: [
          {
            id: "l-301",
            lessonNumber: 6,
            title: "Perimeter, Area & Grid Exploration",
            durationMinutes: 50,
            objectives: ["Count square units", "Differentiate perimeter around vs area inside"],
          },
        ],
      },
    ],
  },
  "algebra-with-confidence": {
    courseId: "algebra-with-confidence",
    courseTitle: "Algebra with confidence",
    modules: [
      {
        id: "m-a1",
        moduleNumber: 1,
        title: "Variables, Expressions & Balance Model",
        description: "Moving from arithmetic to symbols with balance scale visual equations.",
        lessons: [
          {
            id: "l-a101",
            lessonNumber: 1,
            title: "What is an Unknown? Balancing Scales",
            durationMinutes: 60,
            objectives: ["Equivalence concept across the equals sign", "Simplifying single-variable terms"],
            resourceTitle: "Equation Balancing Guide.pdf",
            liveMeetingUrl: "https://meet.funandlearn.com/algebra-adv-room",
          },
          {
            id: "l-a102",
            lessonNumber: 2,
            title: "Two-Step Equations & Inverse Operations",
            durationMinutes: 60,
            objectives: ["Isolate variables step-by-step", "Check solutions with back-substitution"],
          },
        ],
      },
      {
        id: "m-a2",
        moduleNumber: 2,
        title: "Linear Equations & Graphing Relations",
        description: "Plotting coordinates, calculating slope (rise over run), and graphing y = mx + b.",
        lessons: [
          {
            id: "l-a201",
            lessonNumber: 3,
            title: "The Coordinate Plane & Slope Intuition",
            durationMinutes: 60,
            objectives: ["Compute rate of change", "Graph lines using slope-intercept form"],
            resourceTitle: "Coordinate Grid Notebook.pdf",
          },
        ],
      },
    ],
  },
};

const DEFAULT_ASSIGNMENTS: InstructorAssignment[] = [
  {
    id: "asg-01",
    courseId: "math-that-clicks",
    courseTitle: "Math that clicks",
    title: "Fraction Strips & Equivalencies Real-World Challenge",
    description: "Create fraction bar models for 1/2, 2/4, 3/6 and write 3 examples of fractions used in your home cooking or measuring.",
    dueDate: "2026-11-24",
    maxPoints: 100,
    status: "active",
    createdAt: "2026-11-15",
  },
  {
    id: "asg-02",
    courseId: "math-that-clicks",
    courseTitle: "Math that clicks",
    title: "Multi-Digit Place Value & Number Line Jumps",
    description: "Solve worksheet exercises 1 to 8 showing your visual number line work.",
    dueDate: "2026-11-21",
    maxPoints: 50,
    status: "active",
    createdAt: "2026-11-12",
  },
];

const DEFAULT_SUBMISSIONS: StudentSubmission[] = [
  {
    id: "sub-101",
    assignmentId: "asg-01",
    courseId: "math-that-clicks",
    studentName: "Emma Thant",
    studentEmail: "emma.thant@student.edu",
    studentAvatar: "ET",
    submittedAt: "Yesterday at 4:15 PM",
    content: "Here is my completed fraction strip workbook. I measured 1/2 cup of rice, which is equal to two 1/4 cups! See my attached drawing.",
    attachmentName: "Emma_FractionStrips_Homework.pdf",
    status: "submitted",
    maxPoints: 100,
  },
  {
    id: "sub-102",
    assignmentId: "asg-01",
    courseId: "math-that-clicks",
    studentName: "Noah Thant",
    studentEmail: "noah.thant@student.edu",
    studentAvatar: "NT",
    submittedAt: "Nov 17 at 6:30 PM",
    content: "Completed all 3 examples. I drew tape diagrams showing equivalent fractions for 1/3 and 2/6.",
    attachmentName: "Noah_TapeDiagrams.png",
    status: "graded",
    grade: 95,
    maxPoints: 100,
    feedback: "Outstanding work Noah! Your tape diagrams are precise and your explanation was very clear.",
    gradedAt: "Nov 18 at 10:00 AM",
  },
];

const DEFAULT_THREADS: ChatThread[] = [
  {
    id: "th-admin",
    participantName: "Jamie Lee (Owner / Admin)",
    participantRole: "admin",
    participantEmail: "admin@funandlearn.com",
    participantAvatar: "JL",
    courseTitle: "Admin & Operations",
    unreadCount: 1,
    lastMessage: "Welcome Lin! I have assigned you to Math that clicks & Algebra with confidence. Please review the course outline.",
    lastMessageTime: "10:30 AM",
    messages: [
      {
        id: "m-01",
        senderName: "Jamie Lee",
        senderRole: "admin",
        text: "Hi Lin! Welcome to Fun & Learn. I have set up your instructor account and granted you access to manage 'Math that clicks' and 'Algebra with confidence'.",
        time: "Yesterday, 3:00 PM",
        isMe: false,
      },
      {
        id: "m-02",
        senderName: "Lin Chen",
        senderRole: "instructor",
        text: "Thank you Jamie! I have reviewed the curriculum modules and am preparing the upcoming assignments for the students.",
        time: "Yesterday, 3:45 PM",
        isMe: true,
      },
      {
        id: "m-03",
        senderName: "Jamie Lee",
        senderRole: "admin",
        text: "Welcome Lin! I have assigned you to Math that clicks & Algebra with confidence. Please review the course outline.",
        time: "10:30 AM",
        isMe: false,
      },
    ],
  },
  {
    id: "th-student-1",
    participantName: "Emma Thant",
    participantRole: "student",
    participantEmail: "emma.thant@student.edu",
    participantAvatar: "ET",
    courseTitle: "Math that clicks",
    unreadCount: 1,
    lastMessage: "Thank you Ms. Chen! Will we go over equivalent fractions in our next session?",
    lastMessageTime: "11:15 AM",
    messages: [
      {
        id: "em-1",
        senderName: "Emma Thant",
        senderRole: "student",
        text: "Hello Ms. Chen! I just submitted my fraction strips assignment.",
        time: "Yesterday, 4:20 PM",
        isMe: false,
      },
      {
        id: "em-2",
        senderName: "Lin Chen",
        senderRole: "instructor",
        text: "Awesome work Emma! I will review it today and give you detailed notes.",
        time: "Yesterday, 5:10 PM",
        isMe: true,
      },
    ],
  },
];

// ----------------------------------------------------------------------
// IN-MEMORY STORE (No localStorage pollution)
// ----------------------------------------------------------------------

let memoryInstructors: Instructor[] = [...DEFAULT_INSTRUCTORS];
let memoryOutlines: Record<string, CourseOutlineData> = { ...DEFAULT_OUTLINES };
let memoryAssignments: InstructorAssignment[] = [...DEFAULT_ASSIGNMENTS];
let memorySubmissions: StudentSubmission[] = [...DEFAULT_SUBMISSIONS];
let memoryThreads: ChatThread[] = [...DEFAULT_THREADS];

export const instructorStore = {
  // --- INSTRUCTORS ---
  getInstructors: (): Instructor[] => {
    return memoryInstructors;
  },

  getInstructorById: (id: string): Instructor | undefined => {
    return memoryInstructors.find((ins) => ins.id === id || ins.email === id);
  },

  getInstructorByEmail: (email: string): Instructor | undefined => {
    return memoryInstructors.find((ins) => ins.email.toLowerCase() === email.toLowerCase());
  },

  createInstructor: (
    data: Omit<Instructor, "id" | "createdAt" | "status" | "role" | "workloadHours" | "maxHours" | "avatar"> & {
      password?: string;
      status?: "active" | "invited";
      workloadHours?: number;
      maxHours?: number;
      avatar?: string;
    }
  ): Instructor => {
    const newId = `INS-${100 + memoryInstructors.length + 1}`;
    const initials = data.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newInstructor: Instructor = {
      id: newId,
      name: data.name,
      email: data.email,
      password: data.password || "instructor123",
      role: "instructor",
      title: data.title || "Academic Program Instructor",
      phone: data.phone || "",
      bio: data.bio || "",
      assignedCourses: data.assignedCourses || [],
      status: data.status || "active",
      workloadHours: data.workloadHours || 12,
      maxHours: data.maxHours || 20,
      avatar: data.avatar || initials,
      createdAt: new Date().toISOString().split("T")[0],
    };

    memoryInstructors = [newInstructor, ...memoryInstructors];
    return newInstructor;
  },

  updateInstructorCourseAccess: (instructorId: string, assignedCourses: string[]): Instructor[] => {
    memoryInstructors = memoryInstructors.map((ins) => {
      if (ins.id === instructorId) {
        return { ...ins, assignedCourses };
      }
      return ins;
    });
    return memoryInstructors;
  },

  updateInstructor: (id: string, updates: Partial<Instructor>): Instructor[] => {
    memoryInstructors = memoryInstructors.map((ins) => (ins.id === id ? { ...ins, ...updates } : ins));
    return memoryInstructors;
  },

  deleteInstructor: (id: string): Instructor[] => {
    memoryInstructors = memoryInstructors.filter((ins) => ins.id !== id);
    return memoryInstructors;
  },

  // --- COURSE OUTLINE ---
  getCourseOutline: (courseId: string): CourseOutlineData => {
    if (memoryOutlines[courseId]) {
      return memoryOutlines[courseId];
    }

    const prog = PROGRAMS.find((p) => p.id === courseId);
    const outline: CourseOutlineData = {
      courseId,
      courseTitle: prog?.title || "Assigned Course",
      modules: (prog?.curriculumModules || []).map((m, idx) => ({
        id: `mod-${idx + 1}`,
        moduleNumber: idx + 1,
        title: m.title,
        description: m.description,
        lessons: m.topics.map((t, lIdx) => ({
          id: `les-${idx + 1}-${lIdx + 1}`,
          lessonNumber: lIdx + 1,
          title: t,
          durationMinutes: 45,
          objectives: [`Master ${t} core methodology`],
        })),
      })),
    };
    memoryOutlines[courseId] = outline;
    return outline;
  },

  saveCourseOutline: (courseId: string, outline: CourseOutlineData) => {
    memoryOutlines[courseId] = outline;
  },

  // --- ASSIGNMENTS ---
  getAssignments: (): InstructorAssignment[] => {
    return memoryAssignments;
  },

  getAssignmentsForCourses: (courseIds: string[]): InstructorAssignment[] => {
    if (!courseIds || courseIds.length === 0) return memoryAssignments;
    return memoryAssignments.filter((asg) => courseIds.includes(asg.courseId));
  },

  createAssignment: (asg: Omit<InstructorAssignment, "id" | "createdAt">): InstructorAssignment => {
    const newAssignment: InstructorAssignment = {
      ...asg,
      id: `asg-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    memoryAssignments = [newAssignment, ...memoryAssignments];
    return newAssignment;
  },

  deleteAssignment: (asgId: string): InstructorAssignment[] => {
    memoryAssignments = memoryAssignments.filter((a) => a.id !== asgId);
    return memoryAssignments;
  },

  // --- SUBMISSIONS ---
  getSubmissions: (): StudentSubmission[] => {
    return memorySubmissions;
  },

  getSubmissionsForCourses: (courseIds: string[]): StudentSubmission[] => {
    if (!courseIds || courseIds.length === 0) return memorySubmissions;
    return memorySubmissions.filter((sub) => courseIds.includes(sub.courseId));
  },

  gradeSubmission: (submissionId: string, grade: number, feedback: string): StudentSubmission[] => {
    memorySubmissions = memorySubmissions.map((sub) => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          status: "graded" as const,
          grade,
          feedback,
          gradedAt: "Just now",
        };
      }
      return sub;
    });
    return memorySubmissions;
  },

  // --- MESSAGES / CHATBOX ---
  getThreads: (): ChatThread[] => {
    return memoryThreads;
  },

  sendChatMessage: (threadId: string, text: string, senderName = "Lin Chen"): ChatThread[] => {
    memoryThreads = memoryThreads.map((th) => {
      if (th.id === threadId) {
        const newMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          senderName,
          senderRole: "instructor",
          text,
          time: "Just now",
          isMe: true,
        };
        return {
          ...th,
          lastMessage: text,
          lastMessageTime: "Just now",
          messages: [...th.messages, newMsg],
        };
      }
      return th;
    });
    return memoryThreads;
  },

  markThreadRead: (threadId: string): ChatThread[] => {
    memoryThreads = memoryThreads.map((th) => {
      if (th.id === threadId) {
        return { ...th, unreadCount: 0 };
      }
      return th;
    });
    return memoryThreads;
  },
};
