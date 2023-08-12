import { PrismaClient, User } from '@prisma/client';
import hasher from '../../../src/utils/bcrypt';

export async function createUser(
	prisma: PrismaClient,
	data: Partial<User>,
	password: string
) {
	const oldUser = await prisma.user.findFirst({
		where: {
			username: data.username,
		},
	});

	if (oldUser) {
		const oldAccount = await prisma.account.findFirst({
			where: { userId: oldUser.id },
		});

		return { user: oldUser, account: oldAccount };
	}

	const user = await prisma.user.create({ data });

	const hashPassword = await hasher.hash(password);

	const account = await prisma.account.create({
		data: {
			userId: user.id,
			type: 'credential',
			provider: 'credential',
			password: hashPassword,
		},
	});

	return { user, account };
}

export async function deleteUser(prisma: PrismaClient, username: string) {
	const user = await prisma.user.findFirst({ where: { username } });

	if (user) {
		await prisma.user.delete({ where: { id: user.id } });
	}
}
