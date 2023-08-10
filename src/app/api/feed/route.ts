import { prisma } from '@/database/db';
import { getSearchParams } from '@/lib/intl/server';
import { applyMiddleware, validateSearchParams } from '@/lib/routerMiddleware';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const SearchSchema = z.object({
	cursor: z.string().max(64).optional(),
	limit: z.number().max(50).optional(),
});

type SearchType = z.infer<typeof SearchSchema>;

export const GET = applyMiddleware(
	[validateSearchParams(SearchSchema)],
	async (req: NextRequest) => {
		const token = await getToken({ req });
		const { cursor, limit } = getSearchParams<SearchType>(req);

		const queryCursor = cursor
			? {
					id: cursor,
			  }
			: undefined;

		// Get all posts from users the client is following;
		const posts = await prisma.post.findMany({
			orderBy: {
				created_at: 'desc',
			},
			take: limit ?? 10,
			skip: cursor ? 1 : 0,
			cursor: queryCursor,
			where: {
				user: {
					is: {
						followed: {
							some: {
								following_id: token?.sub,
							},
						},
					},
				},
			},
			include: {
				user: {
					include: {
						profile_picture: true,
					},
				},
				images: true,
			},
		});

		return NextResponse.json({
			data: posts,
			nextCursor: posts.length ? posts[posts.length - 1].id : undefined,
		});
	}
);
