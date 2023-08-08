import { prisma } from '@/database/db';
import { applyMiddleware, validateBody } from '@/lib/routerMiddleware';
import { comment } from '@/validation/comment';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

type GetParams = {
	post_id: string;
};

export async function GET(req: NextRequest, { params }: { params: GetParams }) {
	const comments = await prisma.comment.findMany({
		where: {
			post_id: params.post_id,
		},
		include: {
			user: {
				include: {
					profile_picture: true,
				},
			},
			likes: true,
		},
	});

	return NextResponse.json(comments);
}

type PostParams = {
	post_id: string;
};

const PostSchema = z.object({
	content: comment.content,
});

export const POST = applyMiddleware(
	[validateBody(PostSchema)],
	async (req: NextRequest, { params }: { params: PostParams }) => {
		const token = await getToken({ req });
		const body = await req.json();

		const comment = await prisma.comment.create({
			data: {
				user_id: token?.sub!,
				post_id: params.post_id,
				content: body.content,
			},
		});

		return NextResponse.json(comment);
	}
);
