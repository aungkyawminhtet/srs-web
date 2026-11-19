import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "admin" | "instructor" | "student" | "owner";
      accessToken?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User {
    id: string;
    role?: "admin" | "instructor" | "student" | "owner";
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "admin" | "instructor" | "student" | "owner";
    accessToken?: string;
  }
}
