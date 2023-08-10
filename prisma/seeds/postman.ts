import { PrismaClient } from '@prisma/client';
import hasher from '../../src/utils/bcrypt';

const prisma = new PrismaClient();

export async function main() {
	console.log('Generating user...');
	const user = await prisma.user.create({
		data: {
			name: 'Postman User',
			email: 'postman.user@email.com',
			username: 'postman.user',
			bio: 'This is a test user agent',
		},
	});

	console.log('Generating account...');
	const hashPassword = await hasher.hash('Test@123');
	await prisma.account.create({
		data: {
			userId: user.id,
			type: 'credential',
			provider: 'credential',
			password: hashPassword,
		},
	});

	console.log('Test user created successfully');
	console.log('Username: Postman User');
	console.log('Password: Test@123');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
