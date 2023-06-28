import { FirestoreAdapter } from '@auth/firebase-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { cert } from 'firebase-admin/app';

import serviceAccount from '@/../../firebase-service-account.json';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_PROVIDER_CLIENT_ID!,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_PROVIDER_SECRET_ID!,
		}),
	],
	adapter: FirestoreAdapter({
		credential: cert({
			projectId: serviceAccount.project_id,
			clientEmail: serviceAccount.client_email,
			privateKey: serviceAccount.private_key,
		}),
	}),
});

export { handler as GET, handler as POST };
