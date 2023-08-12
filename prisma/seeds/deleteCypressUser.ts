import main from './utils/main';
import { deleteUser } from './utils/user';

main(async (prisma) => {
	await deleteUser(prisma, 'cypress.user');
});
