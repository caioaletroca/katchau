import { prisma } from '@/database/db';
import { NotFoundException } from '@/lib/exceptions/server';
import { ApiResponse } from '@/utils/response';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

type GetParams = {
	post_id: string;
};

export async function GET(req: NextRequest, { params }: { params: GetParams }) {
	const token = await getToken({ req });

	const post = await prisma.post.findFirst({
		where: {
			id: params.post_id,
			user_id: token?.sub,
		},
		include: {
			_count: {
				select: {
					likes: true,
				},
			},
		},
	});

	if (!post) {
		return NotFoundException();
	}

	return ApiResponse.send(post._count);
}
