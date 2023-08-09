import { prisma } from '@/database/db';
import { applyMiddleware, validateBody } from '@/lib/routerMiddleware';
import { user } from '@/validation/user';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const PatchSchema = z.object({
	name: user.name.optional(),
	username: user.username.optional(),
	bio: user.bio.optional(),
});

export const PATCH = applyMiddleware(
	[validateBody(PatchSchema)],
	async (req: NextRequest) => {
		const token = await getToken({ req });
		const body = await req.json();

		const user = await prisma.user.update({
			where: {
				id: token?.sub!,
			},
			data: {
				name: body.name,
				username: body.username,
				bio: body.bio,
			},
		});

		return NextResponse.json(user);
	}
);
