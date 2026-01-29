import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type JwtPayload = {
  role: "ADMIN" | "JOBSEEKER";
  exp?: number;
};

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1️⃣ Get token (cookie OR Authorization header)
  const token =
    request.cookies.get("access_token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  let role: JwtPayload["role"] | null = null;

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      role = decoded.role;
    } catch {
      role = null;
    }
  }

  const isLoggedIn = !!role;

  /* ------------------------------
     NOT LOGGED IN
  --------------------------------*/
  if (!isLoggedIn) {
    if (pathname !== "/login") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  /* ------------------------------
     ADMIN RULES
  --------------------------------*/
  if (role === "ADMIN") {
    // Admin should NEVER see public/job pages
    if (
      pathname === "/" ||
      pathname.startsWith("/jobs") ||
      pathname.startsWith("/job") ||
      pathname.startsWith("/my-applications")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Admin trying to access login again
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  /* ------------------------------
     JOB SEEKER RULES
  --------------------------------*/
  if (role === "JOBSEEKER") {
    // Job seeker cannot access admin dashboard
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Job seeker trying to access login again
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

/* ------------------------------
   MATCHER
--------------------------------*/
export const config = {
  matcher: [
    "/",
    "/login",
    "/jobs/:path*",
    "/job/:path*",
    "/my-applications/:path*",
    "/profile",
    "/dashboard/:path*",
  ],
};
