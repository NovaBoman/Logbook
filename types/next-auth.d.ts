/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null | undefined;
      roles?: Array<string> | null | undefined;
    };
  }

  interface User {
    name?: string | null | undefined;
    roles?: Array<string> | null | undefined;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isAdmin: boolean;
    user: User;
  }
}
