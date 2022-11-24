/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';

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
