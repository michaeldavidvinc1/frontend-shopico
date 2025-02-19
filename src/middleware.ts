import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {API_URL, ROUTES} from './constant';
import {signOut} from "next-auth/react";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  console.log(token)
  if (token) {
    try {
      const url = API_URL.VERIFY_TOKEN(token);
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const verify = await response.json();

      console.log(verify);

      // if (verify.success === false) {
      //   await signOut({
      //     redirect: false,
      //   });
      // }
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  }

  const protectedRoutes = ['/store/:slug/*', '/'];
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
    '/login',
    '/register',
    '/store/:slug*',
    '/'
  ],
};