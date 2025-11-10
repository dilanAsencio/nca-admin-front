import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = Boolean(request.cookies.get("auth_token")?.value);
  const tokenP = Boolean(request.cookies.get("auth_tokenP")?.value);
  const isFirstLogin = request.cookies.get("first_login")?.value === "true";
  const pathname = request.nextUrl.pathname;
  
  // Rutas públicas
  const publicRoutes = ["/login", "/forgot-password", "/auth/register", "/auth/change-password"];
  const resetRoutes = ["/reset-password", "/change-password"];

  // Permitir acceso libre a /landing y subrutas
  if (pathname.startsWith('/landing')) {
    return NextResponse.next();
  }

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
  if (token && !isFirstLogin) {
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