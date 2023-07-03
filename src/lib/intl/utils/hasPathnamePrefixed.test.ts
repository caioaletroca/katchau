import { hasPathnamePrefixed } from "./hasPathnamePrefixed";

describe('hasPathnamePrefixed', () => {
	const locale = 'en-US';
	const unlocalizedPath = '/test'
	const localizedPath = "/en-US/test";

	test('succeeds', () => {
		expect(
			hasPathnamePrefixed(locale, localizedPath)
		).toBeTruthy();
	});

	test('fails', () => {
		expect(
			hasPathnamePrefixed(locale, unlocalizedPath)
		).toBeFalsy();
	})
});
