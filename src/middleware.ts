import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    //'/code/:path*', // würde dafür sorgen, dass man für die weiterleitung eingeloggt sein muss
    '/logout',
    '/register',
    //'/login', // würde zu unendlichen redirects führen
    '/api/code/:path*',
    '/api/user/:path*',
  ],
};
