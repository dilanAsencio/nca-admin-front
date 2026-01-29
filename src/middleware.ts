import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const isFirstLogin = request.cookies.get("first_login")?.value === "true";
  const pathname = request.nextUrl.pathname;
  
  const publicRoutes = ["/login", "/forgot-password", "/reset-password"];
  
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (token && isFirstLogin && pathname !== '/change-password') {
    return NextResponse.redirect(new URL('/change-password', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)']
};