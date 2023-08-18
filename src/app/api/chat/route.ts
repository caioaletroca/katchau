import { prisma } from '@/database/db';
import { ApiResponse } from '@/utils/response';
import getSearchParams from '@/utils/searchParams/getSearchParams';
import { user } from '@/validation/user';
import { Message } from '@prisma/client';
import { uniqBy } from 'lodash';
import orderBy from 'lodash/orderBy';
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
	const { visualized, name } = await getSearchParams<SearchType>(req);

	const nameQuery = name?.trim().replace('.', ' ').split(' ').join(' <-> ');

	// Fetch messages sended by other users
	const ownMessages = await prisma.message.findMany({
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
				: {}),
			...(nameQuery
				? {
						sender: {
							name: { search: nameQuery },
						},
				  }
				: {}),
		},
		include: {
			sender: {
				include: {
					profile_picture: true,
				},
			},
		},
	});

	// Fetch messages this user sended
	let sendedMessages: Message[] = [];
	// If looking for non visualized messages, skip this
	// Since we visualized only cares about received messages
	if (visualized !== 'false') {
		sendedMessages = await prisma.message.findMany({
			distinct: ['user_id'],
			orderBy: {
				created_at: 'desc',
			},
			where: {
				sender_id: token?.sub,
				...(nameQuery
					? {
							user: {
								name: { search: nameQuery },
							},
					  }
					: {}),
			},
			include: {
				user: {
					include: {
						profile_picture: true,
					},
				},
			},
		});
	}

	const messages =
		// Remove duplicates between sended and received messages
		uniqBy(
			// Join messages and order by latest
			orderBy([...ownMessages, ...sendedMessages], 'created_at', 'desc'),
			// Create a unique ID so lodash could figure out the duplicates
			(message) =>
				message.user_id === token?.sub
					? message.user_id + message.sender_id
					: message.sender_id + message.user_id
		);

	return ApiResponse.send(messages);
}
