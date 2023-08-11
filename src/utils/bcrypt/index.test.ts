import hasher from '.';

describe('Hasher Utils', () => {
	const password = 'Test@123';

	test('Hash a password', async () => {
		const hashed = await hasher.hash(password);
		expect(hashed).not.toBe('');
	});

	test('Compare a password', async () => {
		const hashed = await hasher.hash(password);
		expect(hasher.compare(password, hashed)).toBeTruthy();
	});
});
