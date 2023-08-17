import {
	After,
	Before,
	Given,
	Then,
	When,
} from '@badeball/cypress-cucumber-preprocessor';
import { exec, getElement } from '../utils';

const url = Cypress.config('baseUrl');

Before({ tags: '@start' }, () => {
	exec('npm run seed:e2e:runtime -- ./prisma/seeds/createCypressUser');
});

After({ tags: '@end' }, () => {
	exec('npm run seed:e2e:runtime -- ./prisma/seeds/deleteCypressUser');
});

When('I search for test', () => {
	getElement('search-input').type('{selectAll}{backspace}').type('test');
});

Then('I should see no results', () => {
	getElement('search-empty').should('be.visible');
});

Given('I search for Other user', () => {
	cy.fixture('users/actor').then((user) => {
		getElement('search-input').type('{selectAll}{backspace}').type(user.name);
	});
});

When('I click on the Other user', () => {
	getElement('search-results').children().first().click();
});

Then('I should be on Other user page', () => {
	cy.url().should('contain', `${url}/en-US/users/`);
});
