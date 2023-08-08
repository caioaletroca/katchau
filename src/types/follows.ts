import { Prisma } from '@prisma/client';

const followedWithUser = Prisma.validator<Prisma.FollowsArgs>()({
	include: {
		followed: {
			include: {
				profile_picture: true,
			},
		},
	},
});

export type FollowedWithUser = Prisma.FollowsGetPayload<
	typeof followedWithUser
>;

const followingWithUser = Prisma.validator<Prisma.FollowsArgs>()({
	include: {
		following: {
			include: {
				profile_picture: true,
			},
		},
	},
});

export type FollowingWithUser = Prisma.FollowsGetPayload<
	typeof followingWithUser
>;
