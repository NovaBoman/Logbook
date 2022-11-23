import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(function middleware(req: NextRequest) {
  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard', '/api/users'],
};
