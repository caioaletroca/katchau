import { Post, PrismaClient, User } from '@prisma/client';
import fs from 'fs';
import supabase from '../../../src/database/supabase';
import blurImage from '../blurImage';

export async function createPostImage(
	prisma: PrismaClient,
	user: User,
	post: Post
) {
	console.log('start');
	const fileBuffer = await fs.readFileSync(
		'./cypress/fixtures/images/postImage.jpeg'
	);
	const file = new Blob([fileBuffer]);
	console.log('file');
	const filePath = `/${user?.id}/${post.id}.jpeg`;
	const fileResponse = await supabase.storage
		.from('posts')
		.upload(filePath, file);
	console.log('blur');
	const blur = await blurImage(file);
	console.log('prisma');
	return await prisma.postImage.create({
		data: {
			post_id: post.id,
			url: fileResponse.data?.path!,
			blur,
		},
	});
}
