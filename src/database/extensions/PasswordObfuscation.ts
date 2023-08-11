import { Prisma } from '@prisma/client';

export default Prisma.defineExtension({
	name: 'Password Obfuscation',
	result: {
		account: {
			unsecure_password: {
				needs: { password: true },
				compute(account) {
					return account.password;
				},
			},
			password: {
				needs: {},
				compute() {
					return undefined;
				},
			},
		},
	},
});
