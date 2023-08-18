import { Prisma } from '@prisma/client';

const conversation = Prisma.validator<Prisma.MessageArgs>()({
	include: {
		user: {
			include: {
				profile_picture: true,
			},
		},
		sender: {
			include: {
				profile_picture: true,
			},
		},
	},
});

export type Conversation = Prisma.MessageGetPayload<typeof conversation>;
