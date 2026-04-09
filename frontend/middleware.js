// src/middleware.js
import { NextResponse } from "next/server";

const protectedRoutes = [""];
const publicOnlyRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // ✅ If logged in and on a public-only route → go to home
  if (token && publicOnlyRoutes.some((route) => pathname === route)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ If NOT logged in and on a protected route → go to login
  if (!token && protectedRoutes.some((route) => pathname === route)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // ✅ Explicitly list every route — do NOT include "/"
  // "/" is handled by page.jsx alone, not middleware
  matcher: [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
  ],
};
