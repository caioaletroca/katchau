
import { faker } from '@faker-js/faker';
import { Post, PostImage, PrismaClient, User } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config({ path: ".env.local" });
import supabase from '../../src/database/supabase';

const prisma = new PrismaClient();

const MAX_USERS = 8;
const MAX_POSTS = 30;
const MAX_IMAGES = 30;

async function generateUsers(prisma: PrismaClient, n: number = 1) {
	let users: User[] = [];

 	for(let i = 0; i < n; i++) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const name = faker.person.fullName({ firstName, lastName });
		const email = faker.internet.email({ firstName, lastName });
		const user = await prisma.user.create({
			data: {
				name, email
			}
		});
		users.push(user);
	}

	console.log(`${users.length} users created`);

	return users;
}

async function generatePosts(prisma: PrismaClient, users: User[], n: number = 1) {
	let posts: Post[] = [];
	for(let i = 0; i < n; i++) {
		const index = Math.floor(Math.random() * (users.length - 1));
		const description = faker.lorem.paragraph();
		const post = await prisma.post.create({
			data: {
				user_id: users[index].id,
				description
			}
		});
		posts.push(post);
	}

	console.log(`${posts.length} posts created`);

	return posts;
}

async function generatePostImages(prisma: PrismaClient, users: User[], posts: Post[], n: number = 1) {
	let images: PostImage[] = [];

	if(posts.length !== n) {
		throw Error('Posts number different than images number');
	}

	for(let i = 0; i < n; i++) {
		const url = faker.image.url({ width: 600, height: 600 });
		const file = await fetch(url).then(res => res.blob());
		const user = users.find(user => user.id === posts[i].user_id);

		const filePath = `/${user?.id}/${posts[i].id}.jpeg`;
		const fileResponse = await supabase.storage.from('posts').upload(filePath, file);
		
		const image = await prisma.postImage.create({
			data: {
				post_id: posts[i].id,
				url: fileResponse.data?.path!
			}
		});
		images.push(image);
	}

	console.log(`${images.length} images created`);

	return images;
}

export async function main() {
	const users = await generateUsers(prisma, MAX_USERS);
	const posts = await generatePosts(prisma, users, MAX_POSTS);
	const images = await generatePostImages(prisma, users, posts, MAX_IMAGES);

	// Special users
	const specialUsers = [
		{
			name: "Mark Empty",
			email: "mark.empty@gmail.com",
		},
		{
			name: 'Sarah Troti',
			email: "sarah.troti@gmail.com",
		}
	];

	await prisma.user.create({
		data: specialUsers[0]
	});
	const sarah = await prisma.user.create({
		data: specialUsers[1]
	});

	const sarahPosts = await generatePosts(prisma, [sarah], 20);
	const sarahImages = await generatePostImages(prisma, [sarah], sarahPosts, 20);
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