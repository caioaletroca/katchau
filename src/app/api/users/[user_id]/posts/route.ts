import { prisma } from '@/database/db';
import { NextRequest, NextResponse } from 'next/server';

type GetParams = {
	user_id: string;
};

export async function GET(req: NextRequest, { params }: { params: GetParams }) {
	const posts = await prisma.post.findMany({
		where: {
			user_id: params.user_id,
		},
		include: {
			images: true,
		},
	});

	return NextResponse.json(posts);
}
