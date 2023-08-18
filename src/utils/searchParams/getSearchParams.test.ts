import { NextRequest } from 'next/server';
import getSearchParams from './getSearchParams';

describe('getSearchParams', () => {
	const noParamsUrl = 'http://localhost:3000/test';
	const url = 'http://localhost:3000/test?username=test';
	const moreUrl = 'http://localhost:3000/test?username=test&password=test';

	test('With no params on URL', () => {
		expect(getSearchParams(new NextRequest(noParamsUrl))).toMatchObject({});
	});

	test('With params on URL', () => {
		expect(getSearchParams(new NextRequest(url))).toMatchObject({
			username: 'test',
		});
	});

	test('With params on URL', () => {
		expect(getSearchParams(new NextRequest(moreUrl))).toMatchObject({
			username: 'test',
			password: 'test',
		});
	});
});
