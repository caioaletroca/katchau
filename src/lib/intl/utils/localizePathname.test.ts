import localizePathname from './localizePathname';

describe('localizePathname', () => {
	const locale = 'en-US';
	const path = '/test';
	const result = '\\en-US\\test';

	test('', () => {
		expect(localizePathname(locale, path)).toEqual(result);
	});
});
