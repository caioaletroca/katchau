import { prisma } from '@/database/db';
import hasher from '@/utils/bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';

const credentialProvider = CredentialsProvider({
	credentials: {
		username: { label: 'Username', type: 'text' },
		password: { label: 'Password', type: 'password' },
	},
	async authorize(credentials) {
		if (!credentials) return null;

		// Check if user exists
		const user = await prisma.user.findFirst({
			where: {
				username: credentials.username,
			},
		});
		if (!user) return null;

		// Check if user has a credentials account
		const account = await prisma.account.findFirst({
			where: {
				userId: user.id,
				provider: 'credential',
			},
		});
		if (!account) return null;

		// Check password
		const match = await hasher.compare(credentials.password, account.password!);
		if (!match) return null;

		return user;
	},
});

export default credentialProvider;
