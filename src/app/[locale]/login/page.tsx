'use client';

import TextField from '@/components/TextField';
import { useLocale, useRouter } from '@/lib/intl/client';
import { user } from '@/validation/user';
import { Button, Divider, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
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
	const router = useRouter();

	const handleSubmit = (values: LoginForm) => {
		signIn('credentials', {
			...values,
			callbackUrl: search.get('callbackUrl') ?? `/${locale}`,
		});
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
						<Form
							className="flex w-full flex-col gap-2"
							onSubmit={handleSubmit}>
							<TextField
								name="username"
								placeholder={intl.formatMessage({
									id: 'login.usernamePlaceholder',
									defaultMessage: 'Username',
								})}
								variant="outlined"
							/>
							<TextField
								type="password"
								name="password"
								placeholder={intl.formatMessage({
									id: 'login.passwordPlaceholder',
									defaultMessage: 'Password',
								})}
								variant="outlined"
							/>
							<Button type="submit" variant="outlined">
								{intl.formatMessage({
									id: 'login.loginButton',
									defaultMessage: 'Log In',
								})}
							</Button>
						</Form>
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
			<div
				className="flex justify-center border-t-2 border-neutral-800 bg-neutral-900 p-4"
				onClick={() => router.push('/register')}>
				<Typography color="gray">
					{intl.formatMessage({
						id: 'login.registerButton',
						defaultMessage: "Don't have an account? Sign up.",
					})}
				</Typography>
			</div>
		</div>
	);
}
