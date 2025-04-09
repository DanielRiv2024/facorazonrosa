import { NextResponse } from "next/server";

export function middleware(req) {
  const userCookie = req.cookies.get("user");

  // Rutas protegidas
  const protectedRoutes = ["/dashboard", "/perfil", "/admin"];

  if (protectedRoutes.includes(req.nextUrl.pathname) && !userCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Aplicar el middleware solo en rutas específicas
export const config = {
  matcher: ["/dashboard/:path*", "/perfil/:path*", "/admin/:path*"],
};
