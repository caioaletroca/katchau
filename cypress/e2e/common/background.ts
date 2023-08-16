import { Given } from '@badeball/cypress-cucumber-preprocessor';
import { getElement } from '../../utils';

const url = Cypress.config('baseUrl');

Given('I am logged in', () => {
	cy.session('cypress-session', () => {
		cy.visit(url!);

		getElement('username').should('be.visible').type('cypress.user');
		getElement('password').should('be.visible').type('Test@123');
		getElement('submit').click();

		cy.url().should('equal', `${url}/en-US`);
		getElement('header-home').should('be.visible');
	});
});
