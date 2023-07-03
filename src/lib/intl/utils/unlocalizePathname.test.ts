import { unlocalizePathname } from "./unlocalizePathname";

describe('unlocalizePathname', () => {
	const locale = 'en-US';
	const path = `/${locale}/test`;

	test('', () => {
		expect(
			unlocalizePathname(locale, path)
		).toEqual('/test')
	});
})
