import actor from '../../cypress/fixtures/users/actor.json';
import cypressUser from '../../cypress/fixtures/users/cypress.json';
import main from './utils/main';
import { deleteUser } from './utils/user';

main(async (prisma) => {
	await deleteUser(prisma, cypressUser.username);
	await deleteUser(prisma, actor.username);
});
