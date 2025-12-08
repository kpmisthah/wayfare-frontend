import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log(accessToken,'accessTokennnn');
  const refreshToken = request.cookies.get("refreshToken")?.value;
  console.log(refreshToken,'refreshTokennn');
  const { pathname } = request.nextUrl;
  if (!accessToken && refreshToken) {
    const cookieStore = await cookies();
    const cookieString = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join(";");
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          Cookie: cookieString,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
      }
    );
    console.log(result,'resultttttt in fetchhh');

     console.log("middleware working →", pathname);
    
    if (result.ok) {
      const response = NextResponse.next();

      const setCookieHeaders = result.headers.getSetCookie();
      setCookieHeaders.forEach((cookie) => {
        // Parse name=value; options
        const [fullCookie] = cookie.split(";");
        const [name, value] = fullCookie.split("=");
        if (name && value) {
          response.cookies.set(name.trim(), value.trim(), {
            httpOnly: true,
            path: "/",
          });
        }
      });

      // Also inject Authorization header so Server Components see the new token
      const newAccessToken = response.cookies.get("accessToken")?.value;
      if (newAccessToken) {
        response.headers.set("Authorization", `Bearer ${newAccessToken}`);
      }

      return response;
    } else {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }
  if (pathname.startsWith("/admin/login") && accessToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (
    pathname.startsWith("/admin") &&
    !accessToken &&
    pathname !== "/admin/login"
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

  if (authPages.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  const agencyAuthPages = [
    "/agency/login",
    "/agency/signup",
    "/agency/forgot-password",
    "/agency/verify-otp",
    "/agency/otp",
    "/agency/forgot-password-otp",
  ];
  if (
    agencyAuthPages.some((path) => pathname.startsWith(path) && accessToken)
  ) {
    return NextResponse.redirect(new URL("/agency", request.url));
  }
  const protectedUserPaths = [
    "/plan-trip",
    "/booking",
    "/connection",
    "/profile",
  ];
  if (
    protectedUserPaths.some((path) => pathname.startsWith(path)) &&
    !accessToken
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
    "/profile",
    // '/agency'
  ],
};
