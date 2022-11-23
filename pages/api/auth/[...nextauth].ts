/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';
import dbConnect from '../../../utils/mongoose.connect';
import UserModel from '../../../models/UserModel';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        try {
          if (
            credentials === undefined ||
            username === undefined ||
            password === undefined
          ) {
            return null;
          }

          await dbConnect();
          const user = await UserModel.findOne({ username });
          if (!user) {
            return null;
          }

          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            return null;
          }
          return user;
        } catch (e: any) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = { username: user.username, roles: user.roles };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
};

export default NextAuth(authOptions);
