/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions, User } from 'next-auth';
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
          if (!user.roles.includes('user')) {
            return null;
          }

          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            return null;
          }
          return { name: user.username, roles: user.roles };
        } catch (e: any) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = { name: user.name, roles: user.roles };
        token.isAdmin = user.roles?.includes('admin');
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
};

export default NextAuth(authOptions);
