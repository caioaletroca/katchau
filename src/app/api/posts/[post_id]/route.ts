import { prisma } from '@/database/db';
import { ForbiddenException, NotFoundException } from '@/lib/exceptions/server';
import { applyMiddleware, validateBody } from '@/lib/routerMiddleware';
import { ApiResponse } from '@/utils/response';
import { post } from '@/validation/post';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { z } from 'zod';

type PatchParams = {
	post_id: string;
};

const Patchchema = z.object({
	description: post.description,
});

export const PATCH = applyMiddleware(
	[validateBody(Patchchema)],
	async (req: NextRequest, { params }: { params: PatchParams }) => {
		const token = await getToken({ req });
		const body = await req.json();

		const post = await prisma.post.findFirst({
			where: {
				id: params.post_id,
			},
		});

		if (!post) {
			return NotFoundException();
		}

		if (token?.sub !== post.user_id) {
			return ForbiddenException();
		}

		const updatedPost = await prisma.post.update({
			where: {
				id: params.post_id,
			},
			data: {
				description: body.description,
			},
		});

		return ApiResponse.send(updatedPost);
	}
);
