/// <reference types="cypress" />
import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { getElement } from '../../utils';

const url = Cypress.config('baseUrl');

When('I type my credentials on the form', () => {
	getElement('username').should('be.visible').type('cypress.user');
	getElement('password').should('be.visible').type('Test@123');
});

When('I click the login button', () => {
	getElement('submit').click();
});

Then('I should be logged in', () => {
	cy.url().should('equal', `${url}/en-US`);
	getElement('header-home').should('be.visible');
});
