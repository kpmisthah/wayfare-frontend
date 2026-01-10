import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64").toString("utf-8")
    );

    if (!payload.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime + 30;
  } catch {
    return true;
  }
}

function getRoleFromToken(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64").toString("utf-8")
    );

    return payload.role || null;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const accessTokenExpired = accessToken ? isTokenExpired(accessToken) : true;
  const needsRefresh = (!accessToken || accessTokenExpired) && refreshToken;


  let hasValidAccessToken = accessToken && !accessTokenExpired;

  if (needsRefresh) {
    const allCookies = request.cookies.getAll();
    const cookieString = allCookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const refreshUrl = `${apiUrl}/auth/refresh`;
      console.log('[Middleware Debug] Fetching:', refreshUrl);

      const result = await fetch(
        refreshUrl,
        {
          method: "POST",
          headers: {
            Cookie: cookieString,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      console.log('[Middleware Debug] Response status:', result.status);
      console.log('[Middleware Debug] Response ok:', result.ok);

      if (result.ok) {
        const response = NextResponse.next();

        const setCookieHeaders = result.headers.getSetCookie();
        console.log('[Middleware] Set-Cookie headers received:', setCookieHeaders.length);

        setCookieHeaders.forEach((cookie) => {
          const [fullCookie] = cookie.split(";");
          const [name, value] = fullCookie.split("=");
          if (name && value) {
            response.cookies.set(name.trim(), value.trim(), {
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              domain: '.wayfare.misthah.site',
              path: "/",
            });
          }
        });

        const newAccessToken = response.cookies.get("accessToken")?.value;
        if (newAccessToken) {
          response.headers.set("Authorization", `Bearer ${newAccessToken}`);
          console.log('[Middleware] New access token set successfully');
        }

        return response;
      } else {
        console.log('[Middleware] Refresh failed with status:', result.status);
        const errorText = await result.text().catch(() => 'Unable to read error');
        console.log('[Middleware] Refresh error:', errorText);

        const protectedUserPaths = [
          "/plan-trip",
          "/booking",
          "/connection",
          "/profile",
          "/notifications"
        ];
        const isProtectedPath = protectedUserPaths.some((path) => pathname.startsWith(path));

        if (isProtectedPath) {
          const response = NextResponse.redirect(new URL("/login", request.url));
          response.cookies.delete("accessToken");
          response.cookies.delete("refreshToken");
          return response;
        }

        hasValidAccessToken = false;
      }
    } catch (error) {
      console.error('[Middleware] Refresh token fetch error:', error);
      hasValidAccessToken = false;
    }
  }

  // Get user role from token for role-based access control
  const userRole = accessToken ? getRoleFromToken(accessToken) : null;

  // ============ ADMIN ROUTES ============
  // If admin is already logged in and tries to access admin login page, redirect to dashboard
  if (pathname.startsWith("/admin/login") && hasValidAccessToken) {
    const role = userRole;
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Admin routes require ADMIN role
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!hasValidAccessToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    // Check if user has ADMIN role
    if (userRole !== "ADMIN") {
      // Redirect non-admin users to their respective dashboards
      if (userRole === "AGENCY") {
        return NextResponse.redirect(new URL("/agency", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // ============ USER AUTH PAGES ============
  const authPages = [
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-otp",
    "/otp",
    "/forgot-password-otp",
  ];

  if (authPages.some((path) => pathname.startsWith(path)) && hasValidAccessToken) {
    // Redirect to appropriate dashboard based on role
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (userRole === "AGENCY") {
      return NextResponse.redirect(new URL("/agency", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ============ AGENCY AUTH PAGES ============
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

  // ============ PROTECTED USER PATHS ============
  const protectedUserPaths = [
    "/plan-trip",
    "/booking",
    "/connection",
    "/profile",
  ];

  if (protectedUserPaths.some((path) => pathname.startsWith(path))) {
    // Must be logged in
    if (!hasValidAccessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Must be a USER role - Admin and Agency should not access user pages
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (userRole === "AGENCY") {
      return NextResponse.redirect(new URL("/agency", request.url));
    }
  }

  // ============ PROTECTED AGENCY PATHS ============
  const protectedAgencyPaths = ["/agency"];
  const excludedAgencyPaths = [
    "/agency/login",
    "/agency/signup",
    "/agency/forgot-password",
    "/agency/verify-otp",
    "/agency/otp",
    "/agency/forgot-password-otp",
    "/agency/reset-password",
  ];

  const isProtectedAgencyPath = protectedAgencyPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isExcludedAgencyPath = excludedAgencyPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedAgencyPath && !isExcludedAgencyPath) {
    if (!hasValidAccessToken) {
      return NextResponse.redirect(new URL("/agency/login", request.url));
    }

    // Must be AGENCY role
    if (userRole !== "AGENCY") {
      if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [

    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
