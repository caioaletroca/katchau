/// <reference types="cypress" />
import { Given, Step } from '@badeball/cypress-cucumber-preprocessor';
import { getElement } from '../../utils';

const url = Cypress.config('baseUrl');

Given('I access app', () => {
	cy.visit(`${url}/en-US`);
});

Given('I navigate to Profile page', () => {
	Step(this, 'I access app');

	cy.wait(1000);

	getElement('navigation-profile').click();
});

Given('I navigate to Profile Edit page', () => {
	Step(this, 'I navigate to Profile page');
	getElement('profile-edit').click();
});

Given('I navigate to Configuration page', () => {
	Step(this, 'I navigate to Profile page');
	getElement('profile-menu').click();
	getElement('profile-drawer-configuration').click();
});
