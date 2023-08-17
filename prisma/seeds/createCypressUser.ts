import actor from '../../cypress/fixtures/users/actor.json';
import cypressUser from '../../cypress/fixtures/users/cypress.json';
import supabase from '../../src/database/supabase';
import { createPostImage } from './utils/image';
import main from './utils/main';
import { createPost } from './utils/post';
import { createUser } from './utils/user';

main(async (prisma) => {
	const buckets = await supabase.storage.listBuckets();
	const bucketNames = buckets.data?.map((d) => d.name);
	console.log(buckets, bucketNames);
	if (bucketNames?.includes('posts')) {
		await supabase.storage.createBucket('posts', {
			public: true,
		});
	}

	if (bucketNames?.includes('profiles')) {
		await supabase.storage.createBucket('profiles', {
			public: true,
		});
	}

	await createUser(
		prisma,
		{
			name: cypressUser.name,
			username: cypressUser.username,
			email: cypressUser.email,
		},
		cypressUser.password
	);

	const { user: actorUser } = await createUser(
		prisma,
		{
			name: actor.name,
			username: actor.username,
			email: actor.email,
		},
		''
	);

	const post = await createPost(prisma, actorUser, actor.post);
	const postImage = await createPostImage(prisma, actorUser, post);
});
