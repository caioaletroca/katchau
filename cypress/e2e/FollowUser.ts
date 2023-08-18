import {
	After,
	Before,
	Then,
	When,
} from '@badeball/cypress-cucumber-preprocessor';
import { exec, getElement } from '../utils';

Before({ tags: '@start' }, () => {
	exec('npm run seed:e2e:runtime -- ./prisma/seeds/createCypressUser');
});

After({ tags: '@end' }, () => {
	exec('npm run seed:e2e:runtime -- ./prisma/seeds/deleteCypressUser');
});

When('I follow the Other user', () => {
	getElement('profile-follow').click();
});

Then('I should be following the other user', () => {
	getElement('profile-following').should('be.visible');
});

When('I unfollow the Other user', () => {
	getElement('profile-following').click();
	getElement('profile-unfollow').click();
});

Then('I should not be following the other user', () => {
	getElement('profile-follow').should('be.visible');
});
