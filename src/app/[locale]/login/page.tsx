'use client';

import TextField from '@/components/TextField';
import { useLocale } from '@/lib/intl/client';
import { user } from '@/validation/user';
import { Button, Divider } from '@mui/material';
import { Formik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useIntl } from 'react-intl';
import { z } from 'zod';

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
	const locale = useLocale();

	const handleSubmit = (values: LoginForm) => {
		console.log(values);
	};

	const handleGoogleLogin = () => {
		signIn('google', {
			callbackUrl: search.get('callbackUrl') ?? `/${locale}`,
		});
	};

	return (
		<div className="flex h-full flex-col justify-center">
			<div className="m-8 flex h-full flex-col items-center justify-center gap-2">
				{/* TODO: Proper Logo rendering */}
				<Image
					alt="Logo"
					src="/full-logo-inverted.svg"
					height={256}
					width={256}
				/>
				<Formik
					initialValues={initialValues}
					validate={withZodSchema(LoginSchema)}
					onSubmit={handleSubmit}>
					{({ handleBlur, handleChange, handleSubmit }) => (
						<form
							className="flex w-full flex-col gap-2"
							onSubmit={handleSubmit}>
							<TextField
								name="username"
								placeholder={intl.formatMessage({
									id: 'login.usernamePlaceholder',
									defaultMessage: 'Username',
								})}
								onChange={handleChange}
								onBlur={handleBlur}
								variant="outlined"
							/>
							<TextField
								type="password"
								name="password"
								placeholder={intl.formatMessage({
									id: 'login.passwordPlaceholder',
									defaultMessage: 'Password',
								})}
								onChange={handleChange}
								onBlur={handleBlur}
								variant="outlined"
							/>
							<Button type="submit" variant="outlined">
								{intl.formatMessage({
									id: 'login.loginButton',
									defaultMessage: 'Log In',
								})}
							</Button>
						</form>
					)}
				</Formik>
				<Divider>OR</Divider>
				<Button onClick={handleGoogleLogin}>
					{intl.formatMessage({
						id: 'login.loginWithGoogleButton',
						defaultMessage: 'Log In With Google',
					})}
				</Button>
			</div>
		</div>
	);
}
