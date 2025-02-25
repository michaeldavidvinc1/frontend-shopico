import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { ROUTES } from "./constant";
import { signOut } from "next-auth/react";

interface Decoded {
  name: string;
  email: string;
  role: string;
  exp: number;
}

export async function middleware(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;

  const token = (await getToken({ req: request, secret })) as Decoded | null;
  const currentPath = request.nextUrl.pathname;

  console.log("Decoded Token:", token);

  if (token) {
    const isExpired = token.exp < Date.now() / 1000;
    if (isExpired) {
      await signOut();
      const url = request.nextUrl.clone();
      url.pathname = ROUTES.LOGIN;
      return NextResponse.redirect(url);
    }

    const isStoreRoute = request.nextUrl.pathname.startsWith("/store");
    if (isStoreRoute && token.role !== "SELLER") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const guestRoutes = [ROUTES.LOGIN, ROUTES.REGISTER];

  // ✅ Kalau user sudah login tapi akses guest page, redirect ke home
  if (guestRoutes.includes(currentPath) && token) {
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