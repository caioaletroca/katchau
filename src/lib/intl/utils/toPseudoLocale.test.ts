import toPseudoLocale from './toPseudoLocale';

describe('toPseudoLocale', () => {
	const locale = 'pt-BR';
	const defaultLocale = 'en-US';

	test('Parse URL', () => {
		expect(toPseudoLocale(locale, defaultLocale)).toEqual('pt');
	});

	test('Return defaultLocale', () => {
		expect(toPseudoLocale('', defaultLocale)).toEqual('en');
	});
});
