import {
	After,
	Before,
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

When('I like the post', () => {
	getElement('post-like').click();

	cy.wait(1000);
});

Then('The post should contain a like', () => {
	getElement('post-like').should('have.attr', 'data-state', 'true');
});

When('I leave a comment in the post', () => {
	getElement('post-comment').click();
	getElement('post-comment-field').type('Test comment');
	getElement('post-comment-send').click();
});

Then('The post should contain a comment', () => {
	getElement('post-comments-view').children().its('length').should('be.gt', 1);
});

When('I like a comment', () => {
	getElement('post-comment-like').first().click();
});

Then('The comment should contain a like', () => {
	getElement('post-comment-like')
		.first()
		.should('have.attr', 'data-state', 'true');
});

When('I delete my comment', () => {
	getElement('post-comments-view').children().eq(1).longClick();
	// getElement('post-comments-view').children().eq(1).trigger('mousedown');
	// cy.wait(1000);
	// getElement('post-comments-view').children().eq(1).trigger('mousedown');

	// cy.wait(1000);

	getElement('post-comment-delete').click();
});

Then('The comment should be deleted', () => {
	getElement('post-comments-view').children().its('length').should('be', 1);
});
