import { prisma } from '@/database/db';
import { applyMiddleware, validateSearchParams } from '@/lib/routerMiddleware';
import { ApiResponse } from '@/utils/response';
import getParseSearchParams from '@/utils/searchParams/getParseSearchParams';
import getSearchParams from '@/utils/searchParams/getSearchParams';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { z } from 'zod';

type GetParams = {
	user_id: string;
};

const SearchSchema = z.object({
	cursor: z.string().max(64).optional(),
	limit: z.coerce.number().max(50).optional(),
});

type SearchType = z.infer<typeof SearchSchema>;

export const GET = applyMiddleware(
	[validateSearchParams(SearchSchema)],
	async (req: NextRequest, { params }: { params: GetParams }) => {
		const token = await getToken({ req });
		const search = getSearchParams<SearchType>(req);

		const messages = await prisma.message.findMany({
			...getParseSearchParams({
				cursor: search.cursor,
				limit: Number(search.limit),
			}),
			orderBy: {
				created_at: 'desc',
			},
			where: {
				OR: [
					{
						user_id: token?.sub,
						sender_id: params.user_id,
					},
					{
						user_id: params.user_id,
						sender_id: token?.sub,
					},
				],
			},
		});

		return ApiResponse.sendCursorPagination(messages.reverse());
	}
);
