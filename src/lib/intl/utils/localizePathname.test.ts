import localizePathname from './localizePathname';

describe('localizePathname', () => {
	const locale = 'en-US';
	const path = 'test';
	const result = '/en-US/test';

	test('with slashes', () => {
		expect(localizePathname(`/${locale}`, `/${path}`)).toEqual(result);
	});

	test('without slashes', () => {
		expect(localizePathname(locale, path)).toEqual(result);
	});
});
