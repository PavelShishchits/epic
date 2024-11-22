import { NextResponse, NextRequest } from 'next/server';
import { createCsrfProtect, CsrfError } from '@edge-csrf/nextjs';

const csrfProtect = createCsrfProtect({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  try {
    await csrfProtect(request, response);
  } catch (err) {
    if (err instanceof CsrfError) {
      return new NextResponse('invalid csrf token', { status: 403 });
    }
    throw err;
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
