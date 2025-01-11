import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value;

  // Halaman yang hanya boleh diakses oleh pengguna yang sudah login
  const protectedRoutes = ['/'];

  const guestRoutes = ['/login', '/register'];

  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    // Jika tidak ada token, redirect ke halaman login
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if(guestRoutes.includes(request.nextUrl.pathname) && token){
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }


  // Jika token ada, lanjutkan ke halaman tujuan
  return NextResponse.next();
}

// Configurasi routes yang akan terkena middleware
export const config = {
  matcher: ['/', '/login', '/register'], 
};
