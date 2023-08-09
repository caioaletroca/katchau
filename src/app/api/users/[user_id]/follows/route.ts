import { prisma } from '@/database/db';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

type GetParams = {
	user_id: string;
};

export async function GET(req: NextRequest, { params }: { params: GetParams }) {
	// Fetch all people who follows the user
	const followeds = await prisma.follows.findMany({
		where: {
			followed_id: params.user_id,
		},
		include: {
			followed: {
				include: {
					profile_picture: true,
				},
			},
		},
	});
	// Fetch all people who this user follows
	const followings = await prisma.follows.findMany({
		where: {
			following_id: params.user_id,
		},
		include: {
			followed: {
				include: {
					profile_picture: true,
				},
			},
		},
	});

	return NextResponse.json({ followeds, followings });
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
			followed_id: params.user_id,
			following_id: token?.sub,
		},
	});
	if (oldFollow) {
		await prisma.follows.delete({
			where: {
				followed_id_following_id: {
					followed_id: params.user_id,
					following_id: token?.sub!,
				},
			},
		});

		return NextResponse.json({});
	} else {
		const follow = await prisma.follows.create({
			data: {
				followed_id: params.user_id,
				following_id: token?.sub!,
			},
		});

		return NextResponse.json(follow);
	}
}
