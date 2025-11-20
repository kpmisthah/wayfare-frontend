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
  const agencyAuthPages = [
    '/agency/login',
    '/agency/signup',
    '/agency/forgot-password',
    '/agency/verify-otp',
    '/agency/otp',
    '/agency/forgot-password-otp'
  ]
  if(agencyAuthPages.some((path)=>url.pathname.startsWith(path) && token)){
    return NextResponse.redirect(new URL('/agency',request.url))
  }
  const protectedUserPaths = ["/plan-trip","/booking",'/connection','/profile'];
  if (
    protectedUserPaths.some((path) => url.pathname.startsWith(path)) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // const agencyProtectedPaths = ['/agency']
  // if(agencyProtectedPaths.some((path)=>url.pathname.startsWith(path)) && !token
  // ){
  //   return NextResponse.redirect(new URL('/agency/login',request.url))
  // }

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
    "/plan-trip",
    "/booking/:path*",
    "/connection/:path*",
    '/profile',
    // '/agency'
  ],
};
