import { Prisma } from '@prisma/client';

export type NotificationEvent =
	| 'liked_post'
	| 'liked_comment'
	| 'followed'
	| 'commented';

const notificationWithActor = Prisma.validator<Prisma.NotificationArgs>()({
	include: {
		actor: {
			include: {
				profile_picture: true,
			},
		},
	},
});

export type NotificationWithActor = Prisma.NotificationGetPayload<
	typeof notificationWithActor
>;
