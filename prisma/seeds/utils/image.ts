import { faker } from '@faker-js/faker';
import { Post, PrismaClient, User } from '@prisma/client';
import supabase from '../../../src/database/supabase';
import blurImage from '../blurImage';

export async function createPostImage(
	prisma: PrismaClient,
	user: User,
	post: Post
) {
	const url = faker.image.url({ width: 600, height: 600 });
	const file = await fetch(url).then((res) => res.blob());

	const filePath = `/${user?.id}/${post.id}.jpeg`;
	const fileResponse = await supabase.storage
		.from('posts')
		.upload(filePath, file);

	const blur = await blurImage(file);

	return await prisma.postImage.create({
		data: {
			post_id: post.id,
			url: fileResponse.data?.path!,
			blur,
		},
	});
}
