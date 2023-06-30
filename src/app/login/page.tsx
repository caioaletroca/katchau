'use client';

import TextField from '@/components/TextField';
import useTranslation from 'next-translate/useTranslation';
import { user } from '@/validation/user';
import { Button, Divider } from '@mui/material';
import { Formik } from 'formik';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useSearchParams } from 'next/navigation';

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
	const { t } = useTranslation('login');

	const handleSubmit = (values: LoginForm) => {
		console.log(values);
	};

	const handleGoogleLogin = () => {
		signIn('google', {
			callbackUrl: search.get('callbackUrl') ?? '/'
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
								placeholder={t('username', { default: 'Username' })}
								onChange={handleChange}
								onBlur={handleBlur}
								variant="outlined"
							/>
							<TextField
								type="password"
								name="password"
								placeholder={t('password', { default: 'Password' })}
								onChange={handleChange}
								onBlur={handleBlur}
								variant="outlined"
							/>
							<Button type="submit" variant="outlined">
								{t('login', { default: 'Log In' })}
							</Button>
						</form>
					)}
				</Formik>
				<Divider>OR</Divider>
				<Button onClick={handleGoogleLogin}>
					{t('loginWithGoogle', { default: 'Log In With Google' })}
				</Button>
			</div>
		</div>
	);
}
