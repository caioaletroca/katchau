import main from './utils/main';
import { createUser } from './utils/user';

main(async (prisma) => {
	await createUser(
		prisma,
		{
			name: 'Cypress User',
			username: 'cypress.user',
			email: 'cypress.user@email.com',
		},
		'Test@123'
	);
});
