/// <reference types="cypress" />
import {
	After,
	Before,
	Then,
	When,
} from '@badeball/cypress-cucumber-preprocessor';
import { getElement } from '../utils';

Before({ tags: '@start' }, () => {
	cy.exec('npm run seed:e2e:runtime -- ./prisma/seeds/createCypressUser');
});

After({ tags: '@end' }, () => {
	cy.exec('npm run seed:e2e:runtime -- ./prisma/seeds/deleteCypressUser');
});

When('I change my name and bio', () => {
	cy.fixture('users/cypressEdit.json').then((user) => {
		getElement('profile-edit-fullname')
			.type('{selectAll}{backspace}')
			.type(user.name);
		getElement('profile-edit-bio')
			.type('{selectAll}{backspace}')
			.type(user.bio);

		getElement('header-confirm').click();
	});
});

Then('I should see the changes in Profile page', () => {
	cy.fixture('users/cypressEdit.json').then((user) => {
		getElement('profile-name').should('have.text', user.name);
		getElement('profile-bio').should('have.text', user.bio);
	});
});
