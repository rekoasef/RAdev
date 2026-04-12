import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_session')?.value;

  // Basic format check: timestamp.64hexchars — real verification in API routes
  const isValidFormat = token && /^\d+\.[0-9a-f]{64}$/.test(token);

  if (!isValidFormat) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/dashboard/:path*',
};
