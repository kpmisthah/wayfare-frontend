import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const url = request.nextUrl;

  if (url.pathname.startsWith("/admin/login") && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (
    url.pathname.startsWith("/admin") &&
    !token &&
    url.pathname !== "/admin/login"
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const authPages = [
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-otp",
    "/otp",
    "/forgot-password-otp",
  ];

  if (authPages.some((path) => url.pathname.startsWith(path)) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const protectedUserPaths = ["/plan-trip"];
  if (
    protectedUserPaths.some((path) => url.pathname.startsWith(path)) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/admin/:path*",
    "/agency/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/forgot-password-otp",
    "/verify-otp",
    "/reset-password",
    "/otp/:path*",
    "/forgot-password-otp",
    "/plan-trip"
  ],
};
