/// <reference types="cypress" />
import {
	After,
	Before,
	Then,
	When,
} from '@badeball/cypress-cucumber-preprocessor';
import { getElement } from '../utils';

Before({ tags: '@start' }, () => {
	cy.exec('npm run seed:e2e:runtime -- ./prisma/seeds/createCypressUser', {
		failOnNonZeroExit: false,
	}).then((result) => {
		if (result.code) {
			throw new Error(`
				Execution Failed Exit code ${result.code}\n
				Stdout:\n${result.stdout}\n
				Stderr:\n${result.stderr}\n
			`);
		}
	});
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

When('I select another language', () => {
	getElement('language-locale-pt-BR').click();
});

Then('I should see the application in another language', () => {
	cy.url().should('contain', 'pt-BR');
});

When('I try to log off', () => {
	getElement('configuration-logout').click();

	cy.wait(2000);
});

Then('I should be in Login page', () => {
	cy.url().should('contain', '/login');
});
