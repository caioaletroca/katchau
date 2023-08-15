import getFlatPaginated from './getFlatPaginated';

describe('getFlatPaginated', () => {
	const items = [{ username: 'test' }, { username: 'test' }];

	const data = [
		{
			data: items,
			nextCursor: 'next',
		},
		{
			data: items,
			nextCursor: 'next',
		},
	];

	test('With undefined', () => {
		expect(getFlatPaginated()).toEqual(undefined);
	});

	test('With populated params', () => {
		expect(getFlatPaginated(data)).toEqual([...items, ...items]);
	});
});
