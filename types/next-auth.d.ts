/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null | undefined;
      roles?: Array<string> | null | undefined;
    };
  }

  interface DefaultUser {
    id?: any;
    name?: string | null | undefined;
    roles?: Array<string> | null | undefined;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isAdmin: boolean;
    user: DefaultUser;
  }
}
