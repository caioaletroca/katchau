import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { Adapter } from 'next-auth/adapters';
import { ExtendedPrismaClient } from './db';

/**
 * Re-cast PrismaAdapter
 *
 * https://echobind.com/post/extending-types-for-prisma-extensions-in-nextjs
 * @param p
 * @returns
 */
export function CustomPrismaAdapter(p: ExtendedPrismaClient) {
	const prismaAdapter = PrismaAdapter(p as unknown as PrismaClient);
	return prismaAdapter as Adapter;
}
