import bcrypt from 'bcrypt';

const hasher = {
	hash: async (password: string) => {
		return bcrypt.hash(password, process.env.NEXT_PUBLIC_SALT_ROUNDS ?? 10);
	},

	compare: async (password: string, hash: string) => {
		return bcrypt.compare(password, hash);
	},
};

export default hasher;
