import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isInstructorRoute = pathname.startsWith("/instructor");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  // Check NextAuth JWT token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || "srs-super-secure-nextauth-secret-key-2026-production",
  });

  // Check fallback session cookie with 1-day expiration validation
  const srsSessionCookie = req.cookies.get("srs_user_session")?.value;
  let srsUser: any = null;
  let sessionExpired = false;

  if (srsSessionCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(srsSessionCookie));
      if (parsed?.expiresAt && Date.now() > parsed.expiresAt) {
        sessionExpired = true;
        srsUser = null;
      } else {
        srsUser = parsed;
      }
    } catch {
      srsUser = null;
    }
  }

  const authenticatedUser = token || srsUser;
  const userRole = (authenticatedUser?.role || (authenticatedUser as any)?.user?.role || "student").toLowerCase();

  // If session expired and user is accessing protected routes, redirect to login with expiration notice
  if (sessionExpired && (isAdminRoute || isInstructorRoute || isDashboardRoute)) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("error", "session_expired");
    loginUrl.searchParams.set("callbackUrl", pathname);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete("srs_user_session");
    return res;
  }

  // If already authenticated and visiting /login or /register
  // Do NOT auto-redirect if there is an auth error (e.g. admin_required) or if user needs to switch accounts
  const authError = req.nextUrl.searchParams.get("error");
  if (isAuthRoute && authenticatedUser && !authError) {
    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");
    if (callbackUrl && !callbackUrl.startsWith("/login")) {
      const targetIsAdmin = callbackUrl.startsWith("/admin");
      const targetIsInstructor = callbackUrl.startsWith("/instructor");
      const isPermitted =
        (!targetIsAdmin && !targetIsInstructor) ||
        (targetIsAdmin && (userRole === "admin" || userRole === "owner")) ||
        (targetIsInstructor &&
          (userRole === "instructor" ||
            userRole === "tutor" ||
            userRole === "admin" ||
            userRole === "owner"));

      if (isPermitted) {
        return NextResponse.redirect(new URL(callbackUrl, req.url));
      }
      // If not permitted for callbackUrl, allow viewing login page so user can authenticate with required role
    } else {
      if (userRole === "admin" || userRole === "owner") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      if (userRole === "instructor" || userRole === "tutor") {
        return NextResponse.redirect(new URL("/instructor", req.url));
      }
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // If not a protected route, allow request
  if (!isAdminRoute && !isInstructorRoute && !isDashboardRoute) {
    return NextResponse.next();
  }

  // 1. Not Authenticated: Redirect to /login with callbackUrl
  if (!authenticatedUser) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Role Authorization for /admin
  if (isAdminRoute) {
    if (userRole !== "admin" && userRole !== "owner") {
      // User is authenticated but lacks admin privileges (e.g. signed in as student or teacher)
      // Redirect to /login with clear message and callbackUrl instead of silently bouncing to /dashboard
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("error", "admin_required");
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Role Authorization for /instructor
  if (isInstructorRoute) {
    if (
      userRole !== "instructor" &&
      userRole !== "tutor" &&
      userRole !== "admin" &&
      userRole !== "owner"
    ) {
      // User is authenticated as student but lacks instructor privileges
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("error", "instructor_required");
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 4. Authorized: proceed to destination
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/instructor/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};
