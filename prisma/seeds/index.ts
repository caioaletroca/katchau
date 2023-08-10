import { faker } from '@faker-js/faker';
import {
	Comment,
	Follows,
	Post,
	PostImage,
	PrismaClient,
	ProfileImage,
	User,
} from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import supabase from '../../src/database/supabase';
import blurImage from './blurImage';

const prisma = new PrismaClient();

const MAX_USERS = 8;
const MAX_POSTS = 30;
const MAX_IMAGES = 30;

async function generateUsers(prisma: PrismaClient, n: number = 1) {
	let users: User[] = [];

	for (let i = 0; i < n; i++) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const username = faker.internet.userName({ firstName, lastName });
		const name = faker.person.fullName({ firstName, lastName });
		const email = faker.internet.email({ firstName, lastName });
		const bio = `${faker.internet.emoji()} ${faker.lorem.lines(1)}`;
		const user = await prisma.user.create({
			data: {
				name,
				username,
				email,
				bio,
			},
		});
		users.push(user);
	}

	console.log(`${users.length} users created`);

	return users;
}

async function generatePosts(
	prisma: PrismaClient,
	users: User[],
	n: number = 1
) {
	let posts: Post[] = [];
	for (let i = 0; i < n; i++) {
		const index = Math.floor(Math.random() * (users.length - 1));
		const description = faker.lorem.paragraph();
		const post = await prisma.post.create({
			data: {
				user_id: users[index].id,
				description,
			},
		});
		posts.push(post);
	}

	console.log(`${posts.length} posts created`);

	return posts;
}

async function generateProfileImages(prisma: PrismaClient, users: User[]) {
	let profileImages: ProfileImage[] = [];

	for (let i = 0; i < users.length; i++) {
		const url = faker.image.avatar();
		const file = await fetch(url).then((res) => res.blob());

		const profileImage = await prisma.profileImage.create({
			data: {
				user_id: users[i].id,
			},
		});

		const filePath = `/${users[0].id}/${profileImage.id}.jpeg`;
		const fileResponse = await supabase.storage
			.from('profiles')
			.upload(filePath, file);

		const blur = await blurImage(file);

		const newProfileImage = await prisma.profileImage.update({
			where: {
				id: profileImage.id,
			},
			data: {
				url: fileResponse.data?.path,
				blur,
			},
		});
		profileImages.push(newProfileImage);
	}

	console.log(`${profileImages.length} profile images created`);

	return profileImages;
}

async function generatePostImages(
	prisma: PrismaClient,
	users: User[],
	posts: Post[],
	n: number = 1
) {
	let images: PostImage[] = [];

	if (posts.length !== n) {
		throw Error('Posts number different than images number');
	}

	for (let i = 0; i < n; i++) {
		const url = faker.image.url({ width: 600, height: 600 });
		const file = await fetch(url).then((res) => res.blob());
		const user = users.find((user) => user.id === posts[i].user_id);

		const filePath = `/${user?.id}/${posts[i].id}.jpeg`;
		const fileResponse = await supabase.storage
			.from('posts')
			.upload(filePath, file);

		const blur = await blurImage(file);

		const image = await prisma.postImage.create({
			data: {
				post_id: posts[i].id,
				url: fileResponse.data?.path!,
				blur,
			},
		});
		images.push(image);
	}

	console.log(`${images.length} images created`);

	return images;
}

async function generateComments(
	prisma: PrismaClient,
	users: User[],
	posts: Post[],
	n: number = 1
) {
	let comments: Comment[] = [];

	for (let i = 0; i < n; i++) {
		const index1 = Math.floor(Math.random() * (users.length - 1));
		const index2 = Math.floor(Math.random() * (users.length - 1));
		const comment = await prisma.comment.create({
			data: {
				user_id: users[index1].id,
				post_id: posts[index2].id,
				content: faker.lorem.lines(1),
			},
		});
		comments.push(comment);
	}

	console.log(`${comments.length} comments created`);

	return comments;
}

async function generateFollows(
	prisma: PrismaClient,
	users: User[],
	n: number = 1
) {
	let follows: Follows[] = [];

	for (let i = 0; i < n; i++) {
		const index1 = Math.floor(Math.random() * (users.length - 1));
		const index2 = Math.floor(Math.random() * (users.length - 1));
		const follow = await prisma.follows.create({
			data: {
				followed_id: users[index1].id,
				following_id: users[index2].id,
			},
		});
		follows.push(follow);
	}

	console.log(`${follows.length} follows created`);

	return follows;
}

export async function main() {
	const users = await generateUsers(prisma, MAX_USERS);
	const profileImages = await generateProfileImages(prisma, users);
	const posts = await generatePosts(prisma, users, MAX_POSTS);
	const images = await generatePostImages(prisma, users, posts, MAX_IMAGES);
	const comments = await generateComments(prisma, users, posts, 500);
	const follows = await generateFollows(prisma, users, 5);

	// Special users
	const specialUsers = [
		{
			name: 'Mark Empty',
			username: 'mark.empty',
			email: 'mark.empty@gmail.com',
		},
		{
			name: 'Sarah Troti',
			username: 'sarah.troti',
			email: 'sarah.troti@gmail.com',
			bio: `🌈|28y
			✈️ loves travel
			🎭 actress`,
		},
	];

	await prisma.user.create({
		data: specialUsers[0],
	});
	const sarah = await prisma.user.create({
		data: specialUsers[1],
	});

	const sarahPosts = await generatePosts(prisma, [sarah], 20);
	const sarahComments = await generateComments(prisma, users, sarahPosts, 200);
	const sarahProfileImage = await generateProfileImages(prisma, [sarah]);
	const sarahImages = await generatePostImages(prisma, [sarah], sarahPosts, 20);

	// Make everyone follows Sarah
	await prisma.follows.createMany({
		data: users.map((user) => ({
			followed_id: sarah.id,
			following_id: user.id,
		})),
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
