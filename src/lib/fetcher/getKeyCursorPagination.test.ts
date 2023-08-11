import { getKeyCursorPagination } from './getKeyCursorPagination';

describe('checkBasePath', () => {
	const basePath = '/api/users';
	const params = {
		username: 'test',
	};
	const emptyPreviousPageData = {
		data: [],
		nextCursor: '',
	};

	test('Returns a function', () => {
		expect(typeof getKeyCursorPagination(basePath)).toBe('function');
	});

	test('Return the basePath when on first page and no additional params used', () => {
		expect(getKeyCursorPagination(basePath)(0, emptyPreviousPageData)).toEqual(
			basePath
		);
	});

	test('Returns custom params', () => {
		expect(
			getKeyCursorPagination(basePath, params)(0, emptyPreviousPageData)
		).toEqual(`${basePath}?username=test`);
	});

	test('Returns cursor pagination params', () => {
		expect(
			getKeyCursorPagination(basePath)(1, {
				data: [],
				nextCursor: '123',
			})
		).toEqual(`${basePath}?cursor=123`);
	});
});
