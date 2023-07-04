import { prisma } from '@/database/db';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

type GetParams = {
	post_id: string;
};

export async function GET(
	req: NextRequest,
	{ params }: { params: PostParams }
) {
	const token = await getToken({ req });

	const like = await prisma.postLike.findFirst({
		where: {
			user_id: token?.sub,
			post_id: params.post_id,
		},
	});

	return NextResponse.json(like);
}

type PostParams = {
	post_id: string;
};

export async function POST(
	req: NextRequest,
	{ params }: { params: PostParams }
) {
	const token = await getToken({ req });

	const like = await prisma.postLike.findFirst({
		where: {
			user_id: token?.sub,
			post_id: params.post_id,
		},
	});

	if (like) {
		await prisma.postLike.delete({
			where: {
				id: like.id,
			},
		});
	} else {
		await prisma.postLike.create({
			data: {
				user_id: token?.sub,
				post_id: params.post_id,
			},
		});
	}

	return NextResponse.json({});
}
