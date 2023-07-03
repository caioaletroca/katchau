import getStoragePath from "./getStoragePath"

describe('getStoragePath', () => {
	test('', () => {
		expect(
			getStoragePath('posts', 'test.png')
		).toEqual(`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PATH}/posts/test.png`);
	});
})
