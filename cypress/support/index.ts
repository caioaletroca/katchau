declare global {
	namespace Cypress {
		interface Chainable {
			longClick(
				options?: Partial<{ duration: number }>
			): Chainable<JQuery<HTMLElement>>;
		}
	}
}

export {};
