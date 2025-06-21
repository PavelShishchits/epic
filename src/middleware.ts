import { NextRequest, NextResponse } from 'next/server';

import { CsrfError, createCsrfProtect } from '@edge-csrf/nextjs';

import { UnauthenticatedError } from '@/entities/errors';
import { AuthentificationService } from '@/infrastructure/services/authentication.service';
import { SESSION_NAME } from '@/lib/auth.server';
import env from '@/lib/env';

const csrfProtect = createCsrfProtect({
  cookie: {
    secure: env.NODE_ENV === 'production',
  },
});

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const PUBLIC_PATHS = ['/', '/login', '/api/healthcheck'];

  const isPublicPath = PUBLIC_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  const sessionId = request.cookies.get(SESSION_NAME)?.value;

  if (!isPublicPath) {
    if (!sessionId) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    const authenticationService = new AuthentificationService();

    try {
      await authenticationService.validateSession(sessionId);
      const { cookie } = await authenticationService.updateSession(sessionId);
      response.cookies.set(cookie.name, cookie.value, cookie.attributes);
    } catch (e) {
      if (e instanceof UnauthenticatedError) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      throw e;
    }
  } else {
    if (sessionId) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

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
