/**
 * Middleware - Access Control
 *
 * Protects routes that require authentication.
 * Similar to Spring Security filters.
 */

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("user_session")
  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard")

  // Redirect to login if accessing dashboard without session
  if (isDashboard && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect to dashboard if accessing auth pages with active session
  if (isAuthPage && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}
