import getFormikValues from './getFormikValues';

describe('getFormikValues', () => {
	const username = 'Test';
	const email = 'test@email.com';

	const initialValues = {
		username: '',
		email: '',
	};

	test('Parse all empty', () => {
		expect(getFormikValues({}, {}, [])).toMatchObject({});
	});

	test('Returns empty if no filter keys are used', () => {
		expect(getFormikValues(initialValues, {}, [])).toMatchObject({});
	});

	test('Parse with incomplete data', () => {
		expect(
			getFormikValues(initialValues, { username }, ['username', 'email'])
		).toMatchObject({
			username,
			email: '',
		});
	});

	test('Parse with complete data', () => {
		expect(
			getFormikValues(initialValues, { username, email }, ['username', 'email'])
		).toMatchObject({
			username,
			email,
		});
	});

	test('Filter keys from object', () => {
		expect(
			getFormikValues(initialValues, { username, email }, ['username'])
		).toMatchObject({
			username,
		});
	});
});
