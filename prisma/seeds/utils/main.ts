import { PrismaClient } from '@prisma/client';

type Execution = (prisma: PrismaClient) => void;

export default function main(execution: Execution) {
	const prisma = new PrismaClient();

	(async () => {
		await execution(prisma);
	})()
		.then(async () => {
			await prisma.$disconnect();
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});
}
