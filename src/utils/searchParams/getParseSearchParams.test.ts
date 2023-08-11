import getParseSearchParams from './getParseSearchParams';

describe('getParseSearchParams', () => {
	const cursor = 'test';
	const limit = 10;

	test('With both params', () => {
		expect(getParseSearchParams({ cursor, limit })).toMatchObject({
			cursor: {
				id: cursor,
			},
			take: limit,
			skip: 1,
		});
	});

	test('With only cursor', () => {
		expect(getParseSearchParams({ cursor })).toMatchObject({
			cursor: {
				id: cursor,
			},
			take: 10,
			skip: 1,
		});
	});

	test('With only limit', () => {
		expect(getParseSearchParams({ limit })).toMatchObject({
			take: limit,
			skip: 0,
		});
	});
});
