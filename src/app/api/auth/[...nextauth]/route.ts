import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from '@/database/db';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_PROVIDER_CLIENT_ID!,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_PROVIDER_SECRET_ID!,
		}),
	],
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},
	pages: {
		signIn: '/login',
	},
});

export { handler as GET, handler as POST };
