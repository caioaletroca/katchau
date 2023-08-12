// / <reference types="cypress" />
import {
	After,
	Before,
	Given,
	Then,
	When,
} from '@badeball/cypress-cucumber-preprocessor';
const url = Cypress.config('baseUrl');

Before(() => {
	cy.exec('npm run seed:e2e:runtime -- ./prisma/seeds/createCypressUser');
});

After(() => {
	cy.exec('npm run seed:e2e:runtime -- ./prisma/seeds/deleteCypressUser');
});

Given('I access app', () => {
	cy.visit(url!);
});

When('I type my credentials on the form', () => {
	cy.get("[data-cy='username']").type('cypress.user');
	cy.get("[data-cy='password']").type('Test@123');
});

When('I click the login button', () => {
	cy.get("[data-cy='submit']").click();
});

Then('I should be logged in', () => {
	cy.url().should('contain', url);
});
