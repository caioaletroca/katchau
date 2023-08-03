import { prisma } from '@/database/db';
import { applyMiddleware, validateBody } from '@/lib/routerMiddleware';
import hasher from '@/utils/bcrypt';
import { user } from '@/validation/user';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const PostSchema = z.object({
	username: user.username,
	email: user.email,
	name: user.name,
	password: user.password,
});

export const POST = applyMiddleware(
	[validateBody(PostSchema)],
	async (req: NextRequest) => {
		const body = await req.json();

		// Check if the username is available
		const checkUser = await prisma.user.findFirst({
			where: {
				username: body.username,
			},
		});
		if (checkUser) {
			return NextResponse.json(
				{ message: 'Username is not unique' },
				{ status: 400 }
			);
		}

		const hashPassword = await hasher.hash(body.password);

		const user = await prisma.user.create({
			data: {
				username: body.username,
				name: body.name,
				email: body.email,
				birth: body.birth,
			},
		});

		await prisma.account.create({
			data: {
				userId: user.id,
				type: 'credential',
				provider: 'credential',
				password: hashPassword,
			},
		});

		return NextResponse.json(user);
	}
);
