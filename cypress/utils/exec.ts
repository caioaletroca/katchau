export function exec(command: string, options?: Partial<Cypress.ExecOptions>) {
	return cy.exec(command, { failOnNonZeroExit: false }).then((result) => {
		if (result.code) {
			throw new Error(`
					Execution of ${command} failed with exit code ${result.code}\n
					Stdout:\n${result.stdout}\n
					Stderr:\n${result.stderr}\n
				`);
		}
	});
}
