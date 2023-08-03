import { checkBasePath } from './checkBasePath';

describe('checkBasePath', () => {
	const basePath = '/api';

	test('To be true', () => {
		expect(checkBasePath('/api', basePath)).toBeTruthy();
		expect(checkBasePath('/api/', basePath)).toBeTruthy();
		expect(checkBasePath('/api/test', basePath)).toBeTruthy();
		expect(checkBasePath('/api/test/test2', basePath)).toBeTruthy();
	});

	test('To be false', () => {
		expect(checkBasePath(basePath, '/')).toBeFalsy();
		expect(checkBasePath(basePath, '/test')).toBeFalsy();
	});
});
