import { Prisma } from '@prisma/client';
import { prisma } from '../db';

function getUserPath(user_id: string) {
	return `/users/${user_id}`;
}

function getPostPath(user_id: string, post_id: string) {
	return `/post/${user_id}/${post_id}`;
}

export default Prisma.defineExtension({
	name: 'Notification Events',
	query: {
		follows: {
			async create({ args, query }) {
				await prisma.notification.create({
					data: {
						user_id: args.data.followed_id!,
						actor_id: args.data.following_id!,
						event: 'followed',
						url: getUserPath(args.data.following_id!),
					},
				});

				return query(args);
			},
			async delete({ args, query }) {
				if (args.where.followed_id_following_id) {
					const notification = await prisma.notification.findFirst({
						where: {
							user_id: args.where.followed_id_following_id.followed_id!,
							actor_id: args.where.followed_id_following_id.following_id!,
							event: 'followed',
							url: getUserPath(
								args.where.followed_id_following_id.following_id!
							),
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
		postLike: {
			async create({ args, query }) {
				// Fetch context post
				const post = await prisma.post.findFirst({
					where: {
						id: args.data.post_id,
					},
				});

				// Create a notification
				if (post && args.data.user_id) {
					if (post.user_id !== args.data.user_id) {
						await prisma.notification.create({
							data: {
								user_id: post.user_id,
								actor_id: args.data.user_id,
								event: 'liked_post',
								url: getPostPath(post.user_id, post.id),
							},
						});
					}
				}

				return query(args);
			},
			async delete({ args, query }) {
				const postLike = await prisma.postLike.findFirst({
					where: args.where,
				});

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
		comment: {
			async create({ args, query }) {
				const post = await prisma.post.findFirst({
					where: {
						id: args.data.post_id,
					},
				});

				if (post) {
					if (post.user_id !== args.data.user_id) {
						await prisma.notification.create({
							data: {
								user_id: post?.user_id,
								actor_id: args.data.user_id!,
								event: 'commented',
								url: getPostPath(post?.user_id, post?.id),
							},
						});
					}
				}

				return query(args);
			},
			async delete({ args, query }) {
				const comment = await prisma.comment.findFirst({
					where: args.where,
				});

				if (comment) {
					const post = await prisma.post.findFirst({
						where: {
							id: comment.post_id,
						},
					});

					if (post) {
						const notification = await prisma.notification.findFirst({
							where: {
								user_id: post?.user_id,
								actor_id: comment.user_id!,
								event: 'commented',
								url: getPostPath(post.user_id, post?.id),
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
				}

				return query(args);
			},
		},
		commentLike: {
			async create({ args, query }) {
				const comment = await prisma.comment.findFirst({
					where: {
						id: args.data.comment_id,
					},
				});

				const post = await prisma.post.findFirst({
					where: {
						id: comment?.post_id,
					},
				});

				if (post && comment) {
					if (comment.user_id !== args.data.user_id) {
						await prisma.notification.create({
							data: {
								user_id: comment.user_id,
								actor_id: args.data.user_id!,
								event: 'liked_comment',
								url: getPostPath(post.user_id, post.id),
							},
						});
					}
				}

				return query(args);
			},
			async delete({ args, query }) {
				const like = await prisma.commentLike.findFirst({
					where: args.where,
				});

				const comment = await prisma.comment.findFirst({
					where: {
						id: like?.comment_id,
					},
				});

				const post = await prisma.post.findFirst({
					where: {
						id: comment?.post_id,
					},
				});

				if (like && comment && post) {
					const notification = await prisma.notification.findFirst({
						where: {
							user_id: comment.user_id,
							actor_id: like.user_id,
							event: 'liked_comment',
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
	},
});
