import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect all /admin routes
  if (path.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;

    // No token? Kick them to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify the token hasn't been tampered with
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If they are already logged in and try to visit /login, send them to dashboard
  if (path === '/login') {
    const token = request.cookies.get('admin_token')?.value;
    if (token) {
      try {
         const secret = new TextEncoder().encode(process.env.JWT_SECRET);
         await jwtVerify(token, secret);
         return NextResponse.redirect(new URL('/admin', request.url));
      } catch(e) {}
    }
  }

  return NextResponse.next();
}

// Only run middleware on these paths to keep the app fast
export const config = {
  matcher: ['/admin/:path*', '/login'],
};
