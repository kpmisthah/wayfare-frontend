import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper function to check if a JWT token is expired
function isTokenExpired(token: string): boolean {
  try {
    // Decode the JWT without verification to check expiry
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64").toString("utf-8")
    );

    if (!payload.exp) return true;

    // Check if token is expired (with 30 second buffer for clock skew)
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime + 30;
  } catch {
    // If we can't decode/parse the token, consider it expired
    return true;
  }
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log(accessToken, 'accessTokennnn');
  const refreshToken = request.cookies.get("refreshToken")?.value;
  console.log(refreshToken, 'refreshTokennn');
  const { pathname } = request.nextUrl;

  // Check if access token is missing OR expired, and refresh token exists
  const accessTokenExpired = accessToken ? isTokenExpired(accessToken) : true;
  const needsRefresh = (!accessToken || accessTokenExpired) && refreshToken;

  // Track if we have a valid access token (either original or refreshed)
  let hasValidAccessToken = accessToken && !accessTokenExpired;

  if (needsRefresh) {
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
    console.log(result, 'resultttttt in fetchhh');

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
      // Refresh failed - clear tokens and redirect to login for protected routes
      const protectedUserPaths = [
        "/plan-trip",
        "/booking",
        "/connection",
        "/profile",
      ];
      const isProtectedPath = protectedUserPaths.some((path) => pathname.startsWith(path));

      if (isProtectedPath) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      }

      // For non-protected paths, just continue without tokens
      hasValidAccessToken = false;
    }
  }

  if (pathname.startsWith("/admin/login") && hasValidAccessToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (
    pathname.startsWith("/admin") &&
    !hasValidAccessToken &&
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

  if (authPages.some((path) => pathname.startsWith(path)) && hasValidAccessToken) {
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
    agencyAuthPages.some((path) => pathname.startsWith(path) && hasValidAccessToken)
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
    !hasValidAccessToken
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
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
