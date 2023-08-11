import getQueryString from './getQueryString';

describe('getQueryString', () => {
	const params = {
		name: 'test',
	};

	test('With params', () => {
		expect(getQueryString(params)).toEqual('?name=test');
	});

	test('With empty params', () => {
		expect(getQueryString(undefined)).toEqual('');
	});

	test('With params but empty object', () => {
		expect(getQueryString({})).toEqual('');
	});
});
