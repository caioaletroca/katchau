/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add(
	'longClick',
	{ prevSubject: 'element' },
	(subject, options) => {
		const duration = options?.duration ?? 1000;

		cy.wrap(subject).trigger('mousedown');

		cy.wait(duration);

		cy.wrap(subject).trigger('mouseup');

		return cy.wrap(subject);
	}
);

export {};
