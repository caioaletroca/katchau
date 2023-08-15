import { prisma } from '@/database/db';
import { applyMiddleware, validateBody } from '@/lib/routerMiddleware';
import { ApiResponse } from '@/utils/response';
import { message } from '@/validation/message';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { z } from 'zod';

export async function GET(req: NextRequest) {
	const token = await getToken({ req });

	const messages = await prisma.message.findMany({
		distinct: ['sender_id'],
		orderBy: {
			created_at: 'desc',
		},
		where: {
			user_id: token?.sub,
		},
		include: {
			sender: {
				include: {
					profile_picture: true,
				},
			},
		},
	});

	return ApiResponse.send(messages);
}

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
