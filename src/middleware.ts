import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verifica si el usuario está autenticado
  const isAuthenticated = request.cookies.get('auth_token');

  if (!isAuthenticated && pathname !== '/login') {
    // Redirige a la página de login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Permite el acceso a la ruta solicitada
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};