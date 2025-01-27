import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './constant';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value;

  console.log(storeSlug);
  const protectedRoutes = ['/cart', '/store/:slug'];
  const guestRoutes = [ROUTES.LOGIN, ROUTES.REGISTER];

  const isProtectedRoute = protectedRoutes.some(route => {
    if (route.includes(':slug')) {
      const regex = new RegExp(route.replace(':slug', '[^/]+'));
      return regex.test(request.nextUrl.pathname);
    }
    return route === request.nextUrl.pathname;
  });

  if (isProtectedRoute && !token) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.LOGIN;
    return NextResponse.redirect(url);
  }

  if (guestRoutes.includes(request.nextUrl.pathname) && token) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.HOME;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/cart',
    '/login',
    '/register',
    '/store/:slug',
  ],
};