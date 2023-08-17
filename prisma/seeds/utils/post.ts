import { Post, PrismaClient, User } from '@prisma/client';

export async function createPost(
	prisma: PrismaClient,
	user: User,
	data: Partial<Post>
) {
	return await prisma.post.create({
		data: {
			user_id: user.id,
			...data,
		},
	});
}
