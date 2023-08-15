import { prisma } from '@/database/db';
import { ApiResponse } from '@/utils/response';
import getSearchParams from '@/utils/searchParams/getSearchParams';
import { user } from '@/validation/user';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const SearchParams = z.object({
	name: user.name.optional(),
	visualized: z.enum(['true', 'false']).optional(),
});

type SearchType = z.infer<typeof SearchParams>;

export async function GET(req: NextRequest) {
	const token = await getToken({ req });
	const { visualized, ...search } = await getSearchParams<SearchType>(req);

	const messages = await prisma.message.findMany({
		distinct: ['sender_id'],
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
			...(search.name ? { sender: { name: { search: search.name } } } : {}),
		},
		include: {
			sender: {
				include: {
					profile_picture: true,
				},
			},
		},
	});

	return ApiResponse.send(messages);
}
