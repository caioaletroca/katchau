import { prisma } from '@/database/db';
import {
	applyMiddleware,
	validateBody,
	validateSearchParams,
} from '@/lib/routerMiddleware';
import { ApiResponse } from '@/utils/response';
import getParseSearchParams from '@/utils/searchParams/getParseSearchParams';
import getSearchParams from '@/utils/searchParams/getSearchParams';
import { message } from '@/validation/message';
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
			...getParseSearchParams(search),
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

type PostParams = {
	user_id: string;
};

const PostSchema = z.object({
	content: message.content,
});

export const POST = applyMiddleware(
	[validateBody(PostSchema)],
	async (req: NextRequest, { params }: { params: PostParams }) => {
		const token = await getToken({ req });
		const body = await req.json();

		const message = await prisma.message.create({
			data: {
				user_id: params.user_id,
				sender_id: token?.sub!,
				content: body.content,
			},
		});

		return ApiResponse.send(message);
	}
);

type PatchParams = {
	user_id: string;
};

export async function PATCH(
	req: NextRequest,
	{ params }: { params: PatchParams }
) {
	const token = await getToken({ req });

	await prisma.message.updateMany({
		where: {
			user_id: token?.sub!,
			sender_id: params.user_id,
		},
		data: {
			visualized: true,
		},
	});

	return ApiResponse.empty();
}
