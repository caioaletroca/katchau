import { Given } from '@badeball/cypress-cucumber-preprocessor';
import { getElement } from '../../utils';

const url = Cypress.config('baseUrl');

Given('I am logged in', () => {
	cy.session('cypress-session', () => {
		cy.visit('/');

		cy.wait(1000);

		getElement('username').should('be.visible').type('cypress.user');
		getElement('password').should('be.visible').type('Test@123');
		getElement('submit').click();

		cy.location().should((loc) => {
			expect(loc.pathname).to.eq('/en-US');
		});
		getElement('header-home').should('be.visible');
	});
});
