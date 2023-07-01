'use client';

import TextField from '@/components/TextField';
import { user } from '@/validation/user';
import { Button, Divider } from '@mui/material';
import { Formik } from 'formik';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useParams, useSearchParams } from 'next/navigation';
import { useIntl } from 'react-intl';

const LoginSchema = z.object({
	username: user.username,
	password: user.password,
});

type LoginForm = z.infer<typeof LoginSchema>;

const initialValues = {
	username: '',
	password: '',
};

export default function LoginPage() {
	const search = useSearchParams();
	const intl = useIntl();
	const { locale } = useParams();

	const handleSubmit = (values: LoginForm) => {
		console.log(values);
	};

	const handleGoogleLogin = () => {
		signIn('google', {
			callbackUrl: search.get('callbackUrl') ?? `/${locale}`
		});
	};

	return (
		<div className="flex h-full flex-col justify-center">
			<div className="m-8 flex h-full flex-col items-center justify-center gap-2">
				{/* TODO: Proper Logo rendering */}
				<Image alt="Logo" src="/full-logo-inverted.svg" height={256} width={256} />
				<Formik
					initialValues={initialValues}
					validationSchema={toFormikValidationSchema(LoginSchema)}
					onSubmit={handleSubmit}>
					{({ handleBlur, handleChange, handleSubmit }) => (
						<form
							className="flex w-full flex-col gap-2"
							onSubmit={handleSubmit}>
							<TextField
								name="username"
								placeholder={intl.formatMessage({
									id: 'username',
									defaultMessage: 'Username'
								})}
								onChange={handleChange}
								onBlur={handleBlur}
								variant="outlined"
							/>
							<TextField
								type="password"
								name="password"
								placeholder={intl.formatMessage({
									id: 'password',
									defaultMessage: 'Password'
								})}
								onChange={handleChange}
								onBlur={handleBlur}
								variant="outlined"
							/>
							<Button type="submit" variant="outlined">
								{intl.formatMessage({
									id: 'login',
									defaultMessage: 'Log In'
								})}
							</Button>
						</form>
					)}
				</Formik>
				<Divider>OR</Divider>
				<Button onClick={handleGoogleLogin}>
					{intl.formatMessage({
						id: 'loginWithGoogle',
						defaultMessage: 'Log In With Google'
					})}
				</Button>
			</div>
		</div>
	);
}
