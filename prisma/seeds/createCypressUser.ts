import actor from '../../cypress/fixtures/users/actor.json';
import cypressUser from '../../cypress/fixtures/users/cypress.json';
import { createPostImage } from './utils/image';
import main from './utils/main';
import { createPost } from './utils/post';
import { createUser } from './utils/user';

main(async (prisma) => {
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
	console.log('postImage', postImage);
});
