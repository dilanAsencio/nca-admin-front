import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = Boolean(request.cookies.get("auth_token")?.value);
  const isFirstLogin = request.cookies.get("first_login")?.value === "true";
  const pathname = request.nextUrl.pathname;
  
  
  // Rutas públicas
  const publicRoutes = ["/login", "/forgot-password"];
  const resetRoutes = ["/reset-password", "/change-password"];
  const isPublic = publicRoutes.some((path) => pathname === path);
  const isReset = resetRoutes.some((path) => pathname === path);
  console.log("AUTH", token, isFirstLogin, pathname);

  // 1. Si NO está autenticado
  if (!token) {
    // Permitir acceso solo a rutas públicas y de reset
    if (![...publicRoutes, ...resetRoutes].includes(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Permitir acceso a login, forgot-password, reset-password, change-password
    return NextResponse.next();
  }

  // 2. Si está autenticado y es primer login
  if (token && isFirstLogin) {
    // Solo permitir acceso a reset-password y change-password
    if (!resetRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/reset-password', request.url));
    }
    return NextResponse.next();
  }

  // 3. Si está autenticado y NO es primer login
  console.log("AUTENTICADO Y NO FIRST LOGIN", token, isFirstLogin, pathname);
  if (token && !isFirstLogin) {
  console.log("AUTENTICADO Y NO FIRST LOGIN 11", token, isFirstLogin, pathname);
    // Si intenta acceder a rutas públicas o de reset, redirigir a raíz
    if ([...publicRoutes, ...resetRoutes].includes(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Permitir acceso a rutas internas
    return NextResponse.next();
  }

  // Por defecto, permitir acceso
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets|\\.well-known).*)']
};