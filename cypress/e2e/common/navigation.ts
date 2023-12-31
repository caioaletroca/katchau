/// <reference types="cypress" />
import { Given, Step } from '@badeball/cypress-cucumber-preprocessor';
import { getElement } from '../../utils';

const url = Cypress.config('baseUrl');

Given('I access app', () => {
	cy.visit(`${url}/en-US`);
});

Given('I navigate to Search page', () => {
	Step(this, 'I access app');

	cy.wait(1000);

	getElement('navigation-search').click();
});

Given('I navigate to Other user page', () => {
	Step(this, 'I navigate to Search page');

	cy.fixture('users/actor').then((user) => {
		getElement('search-input').type('{selectAll}{backspace}').type(user.name);

		cy.wait(1000);

		getElement('search-results')
			.should('be.visible')
			.children()
			.first()
			.click();

		cy.wait(1000);

		getElement('profile-message').should('be.visible');
	});
});

Given('I navigate to Post page of Other user', () => {
	Step(this, 'I navigate to Other user page');

	cy.get('[data-cy^=profile-post-').first().click();
});

Given('I navigate to comments on Post page of Other user', () => {
	Step(this, 'I navigate to Post page of Other user');

	getElement('post-comment').should('be.visible').click();
});

Given('I navigate to Profile page', () => {
	Step(this, 'I access app');

	cy.wait(1000);

	getElement('navigation-profile').should('be.visible').click();
});

Given('I navigate to Profile Edit page', () => {
	Step(this, 'I navigate to Profile page');
	getElement('profile-edit').should('be.visible').click();
});

Given('I navigate to Configuration page', () => {
	Step(this, 'I navigate to Profile page');
	getElement('profile-menu').should('be.visible').click();
	getElement('profile-drawer-configuration').should('be.visible').click();
});

Given('I navigate to Language page', () => {
	Step(this, 'I navigate to Configuration page');
	getElement('configuration-language').should('be.visible').click();
});

Given('I navigate to Conversation page', () => {
	Step(this, 'I access app');
	getElement('home-chat').should('be.visible').click();
});
