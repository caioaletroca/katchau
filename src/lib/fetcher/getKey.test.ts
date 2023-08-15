import { getKey } from './getKey';

describe('getKey', () => {
	const basePath = '/api/users';
	const params = {
		username: 'test',
	};

	test('Returns a string', () => {
		expect(typeof getKey(basePath)).toBe('string');
	});

	test('Return the basePath when no search params is used', () => {
		expect(getKey(basePath)).toEqual(basePath);
	});

	test('Returns params', () => {
		expect(getKey(basePath, params)).toEqual(`${basePath}?username=test`);
	});
});
