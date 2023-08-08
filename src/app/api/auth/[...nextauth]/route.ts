import { prisma } from '@/database/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import isEmpty from 'lodash/isEmpty';
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
		jwt: async ({ token, user }) => {
			// User parameter exists when the user logs in
			if (user) {
				token.username = user.username;
			} else {
				// On the subsequent calls, the user param is undefined
				// Now we need to check if the user has a username defined
				if (isEmpty(token.username)) {
					// Empty username is bad, so attempt to check on DB
					// if the username is only outdated
					const userDB = await prisma.user.findFirst({
						where: {
							id: token.sub,
						},
					});

					// Set username on token
					// If this still fails, registerMiddleware will redirect
					// the client to properly set an username
					token.username = userDB?.username!;
				}
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
