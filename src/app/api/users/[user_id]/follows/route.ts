import { prisma } from '@/database/db';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

type GetParams = {
	user_id: string;
};

export async function GET(req: NextRequest, { params }: { params: GetParams }) {
	const token = await getToken({ req });

	const follow = await prisma.follows.findFirst({
		where: {
			follower_id: token?.sub,
			following_id: params.user_id,
		},
	});

	return NextResponse.json(follow);
}

type PostParams = {
	user_id: string;
};

export async function POST(
	req: NextRequest,
	{ params }: { params: PostParams }
) {
	const token = await getToken({ req });

	const oldFollow = await prisma.follows.findFirst({
		where: {
			follower_id: token?.sub!,
			following_id: params.user_id,
		},
	});
	if (oldFollow) {
		await prisma.follows.delete({
			where: {
				follower_id_following_id: {
					follower_id: token?.sub!,
					following_id: params.user_id,
				},
			},
		});

		return NextResponse.json({});
	} else {
		const follow = await prisma.follows.create({
			data: {
				follower_id: token?.sub!,
				following_id: params.user_id,
			},
		});

		return NextResponse.json(follow);
	}
}
