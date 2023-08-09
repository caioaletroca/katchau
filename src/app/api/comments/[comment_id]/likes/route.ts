import { prisma } from '@/database/db';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

type PostParams = {
	comment_id: string;
};

export async function POST(
	req: NextRequest,
	{ params }: { params: PostParams }
) {
	const token = await getToken({ req });

	const like = await prisma.commentLike.findFirst({
		where: {
			user_id: token?.sub,
			comment_id: params.comment_id,
		},
	});
	if (like) {
		await prisma.commentLike.delete({
			where: {
				id: like.id,
			},
		});
	} else {
		await prisma.commentLike.create({
			data: {
				user_id: token?.sub!,
				comment_id: params.comment_id,
			},
		});
	}

	return NextResponse.json({});
}
