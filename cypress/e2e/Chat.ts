import {
	After,
	Before,
	Given,
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

Given('I start a chat with Other user', () => {
	getElement('profile-message').should('be.visible').click();
});

When('I type and send a message', () => {
	getElement('chat-input').should('be.visible').type('test');
	getElement('chat-send').should('be.visible').click();

	cy.wait(5000);
});

Then('I should see my message', () => {
	getElement('chat-message')
		.should('be.visible')
		.its('length')
		.should('be.greaterThan', 0);
});

When('I search for a no existing conversation', () => {
	getElement('search-input').should('be.visible').type('test');

	cy.wait(1000);
});

Then('I should see no results', () => {
	getElement('chat-conversation-results')
		.should('be.visible')
		.children()
		.should('have.length', 0);
});

When('I search for Other user', () => {
	cy.fixture('users/actor').then((user) => {
		getElement('search-input').should('be.visible').type(user.name);

		cy.wait(1000);

		getElement('chat-conversation-results')
			.should('be.visible')
			.children()
			.first()
			.click();
	});
});

Then('I should be on Other user chat page', () => {
	cy.url().should('contain', `${Cypress.config('baseUrl')}/en-US/chat/`);
});
