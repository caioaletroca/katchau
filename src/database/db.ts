import { PrismaClient } from '@prisma/client';
import NotificationEvents from './extensions/NotificationEvents';

const extendedPrismaClient = () => {
	const prisma = new PrismaClient();

	const extendedPrisma = prisma
		// .$extends(PasswordObfuscation)
		.$extends(NotificationEvents);

	return extendedPrisma;
};

const globalForPrisma = globalThis as unknown as {
	prisma: ExtendedPrismaClient | undefined;
};

export type ExtendedPrismaClient = ReturnType<typeof extendedPrismaClient>;

export const prisma = globalForPrisma.prisma || extendedPrismaClient();

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma;
}
