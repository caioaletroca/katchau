import { prisma } from '@/database/db';
import { applyMiddleware, validateBody } from '@/lib/routerMiddleware';
import { ApiResponse } from '@/utils/response';
import { message } from '@/validation/message';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const PostSchema = z.object({
	user_id: z.string(),
	content: message.content,
});

export const POST = applyMiddleware(
	[validateBody(PostSchema)],
	async (req: NextRequest) => {
		const token = await getToken({ req });
		const body = await req.json();

		const message = await prisma.message.create({
			data: {
				user_id: body.user_id,
				sender_id: token?.sub!,
				content: body.content,
			},
		});

		return ApiResponse.send(message);
	}
);
