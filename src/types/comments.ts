import { Prisma } from '@prisma/client';

const commentWithUserAndLike = Prisma.validator<Prisma.CommentArgs>()({
	include: {
		user: {
			include: {
				profile_picture: true,
			},
		},
		likes: true,
	},
});

export type CommentWithUserAndLike = Prisma.CommentGetPayload<
	typeof commentWithUserAndLike
>;
