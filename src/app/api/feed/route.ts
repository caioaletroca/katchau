import { prisma } from '@/database/db';
import { applyMiddleware, validateSearchParams } from '@/lib/routerMiddleware';
import { ApiResponse } from '@/utils/response';
import getParseSearchParams from '@/utils/searchParams/getParseSearchParams';
import getSearchParams from '@/utils/searchParams/getSearchParams';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
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
		const search = getSearchParams<SearchType>(req);

		// Get all posts from users the client is following;
		const posts = await prisma.post.findMany({
			...getParseSearchParams(search),
			orderBy: {
				created_at: 'desc',
			},
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

		return ApiResponse.sendCursorPagination(posts);
	}
);
