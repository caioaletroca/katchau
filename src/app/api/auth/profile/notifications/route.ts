import { prisma } from '@/database/db';
import { applyMiddleware, validateSearchParams } from '@/lib/routerMiddleware';
import { ApiResponse } from '@/utils/response';
import getParseSearchParams from '@/utils/searchParams/getParseSearchParams';
import getSearchParams from '@/utils/searchParams/getSearchParams';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const SearchSchema = z.object({
	visualized: z.enum(['true', 'false']).optional(),
	cursor: z.string().max(64).optional(),
	limit: z.coerce.number().max(100).optional(),
});

type SearchType = z.infer<typeof SearchSchema>;

export const GET = applyMiddleware(
	[validateSearchParams(SearchSchema)],
	async (req: NextRequest) => {
		const token = await getToken({ req });
		const { visualized, ...search } = getSearchParams<SearchType>(req);

		const notifications = await prisma.notification.findMany({
			...getParseSearchParams(search),
			orderBy: {
				created_at: 'desc',
			},
			where: {
				user_id: token?.sub,
				...(visualized
					? {
							visualized: visualized === 'true',
					  }
					: undefined),
			},
			include: {
				actor: {
					include: {
						profile_picture: true,
					},
				},
			},
		});

		return ApiResponse.sendCursorPagination(notifications);
	}
);

export async function POST(req: NextRequest) {
	const token = await getToken({ req });

	await prisma.notification.updateMany({
		where: {
			user_id: token?.sub,
		},
		data: {
			visualized: true,
		},
	});

	return ApiResponse.empty();
}
