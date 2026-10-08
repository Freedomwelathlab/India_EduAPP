import { NextResponse, type NextRequest } from 'next/server';
import { COOKIE, canOpen, readSession } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const account = await readSession(req.cookies.get(COOKIE)?.value);
  if (!account) {
    const url = new URL('/login', req.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  if (!canOpen(account.role, pathname)) {
    return NextResponse.redirect(new URL(account.home, req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/learn/:path*', '/teacher/:path*', '/parent/:path*', '/school/:path*', '/admin/:path*'] };
