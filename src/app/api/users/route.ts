import { prisma } from '@/database/db';
import { applyMiddleware, validateSearchParams } from '@/lib/routerMiddleware';
import { ApiResponse } from '@/utils/response';
import getParseSearchParams from '@/utils/searchParams/getParseSearchParams';
import getSearchParams from '@/utils/searchParams/getSearchParams';
import { user } from '@/validation/user';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const SearchSchema = z.object({
	name: user.name.optional(),
	cursor: z.string().max(64).optional(),
	limit: z.coerce.number().max(50).optional(),
});

type SearchType = z.infer<typeof SearchSchema>;

export const GET = applyMiddleware(
	[validateSearchParams(SearchSchema)],
	async (req: NextRequest) => {
		const { name, ...search } = getSearchParams<SearchType>(req);

		const users = await prisma.user.findMany({
			...getParseSearchParams(search),
			where: {
				name: {
					search: name ?? '',
				},
			},
			include: {
				profile_picture: true,
			},
		});

		return ApiResponse.sendCursorPagination(users);
	}
);
