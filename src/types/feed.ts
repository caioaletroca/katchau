import { Prisma } from '@prisma/client';

const feedPost = Prisma.validator<Prisma.PostArgs>()({
	include: {
		user: {
			include: {
				profile_picture: true,
			},
		},
		images: true,
	},
});

export type FeedPost = Prisma.PostGetPayload<typeof feedPost>;
