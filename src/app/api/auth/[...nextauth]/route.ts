import { prisma } from '@/database/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import credentialProvider from './CredentialsProvider';

const handler = NextAuth({
	providers: [
		credentialProvider,
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_PROVIDER_CLIENT_ID!,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_PROVIDER_SECRET_ID!,
		}),
	],
	adapter: PrismaAdapter(prisma) as Adapter,
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},
	pages: {
		signIn: '/login',
	},
	callbacks: {
		jwt: async ({ token, account, profile, user }) => {
			if (user) {
				token.username = user.username;
			}

			return token;
		},
		session: async ({ session, token, user }) => {
			// console.log(session, token, user);
			if (session?.user && token.sub) {
				session.user.id = token.sub;
				session.user.username = token.username;
			}
			return session;
		},
	},
});

export { handler as GET, handler as POST };
