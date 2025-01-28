import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './constant';
import {getToken} from "next-auth/jwt";
import {signOut} from "next-auth/react";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value;
  const token1 = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if(token1){
    const isExpired = token1?.exp < Math.floor(Date.now() / 1000)
    if (isExpired) {
      console.log('Token expired');

      await signOut({
        redirect: false,
      });

      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }
  }

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