import { Prisma } from '@prisma/client';
import { prisma } from '../db';

function getPostPath(user_id: string, post_id: string) {
	return `/post/${user_id}/${post_id}`;
}

export default Prisma.defineExtension({
	name: 'Notification Events',
	query: {
		postLike: {
			async create({ args, query }) {
				// Fetch context post
				const post = await prisma.post.findFirst({
					where: {
						id: args.data.post_id,
					},
				});

				// Create a notification
				if (args.data.user_id && post) {
					await prisma.notification.create({
						data: {
							user_id: post.user_id,
							actor_id: args.data.user_id,
							event: 'liked_post',
							url: getPostPath(post.user_id, post.id),
						},
					});
				}

				return query(args);
			},
			async delete({ args, query }) {
				const postLike = await prisma.postLike.findFirst(query);

				// Fetch context post
				const post = await prisma.post.findFirst({
					where: {
						id: postLike?.post_id,
					},
				});

				// Delete notification
				if (postLike && post) {
					const notification = await prisma.notification.findFirst({
						where: {
							user_id: post.user_id,
							actor_id: postLike.user_id,
							event: 'liked_post',
							url: getPostPath(post.user_id, post.id),
						},
					});

					if (notification) {
						await prisma.notification.delete({
							where: {
								id: notification.id,
							},
						});
					}
				}

				return query(args);
			},
		},
		commentLike: {
			async create({ args, query }) {
				return query(args);
			},
		},
	},
});
