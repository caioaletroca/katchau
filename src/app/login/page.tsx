"use client";

import TextField from "@/components/TextField";
import { auth, googleProvider } from "@/database/auth";
import useTranslation from "@/hooks/useTranslation";
import { user } from "@/validation/user";
import { Button, Divider } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { Formik } from "formik";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const LoginSchema = z.object({
	username: user.username,
	password: user.password
})

type LoginForm = z.infer<typeof LoginSchema>;

const initialValues = {
	username: "",
	password: ""
}

export default function LoginPage() {
	const { t } = useTranslation('login');

	const handleSubmit = (values: LoginForm) => {
		console.log(values);
	}

	const handleGoogleLogin = () => {
		signIn("google", { callbackUrl: '/' });
	}

	return (
		<div className="flex flex-col h-full justify-center">
			<div className='flex flex-col h-full items-center justify-center gap-2 m-8'>
				<Image alt="" src='/full-logo-inverted.svg' height={256} width={256} />
				<Formik
					initialValues={initialValues}
					validationSchema={toFormikValidationSchema(LoginSchema)}
					onSubmit={handleSubmit}>
						{({
							handleBlur,
							handleChange,
							handleSubmit
						}) => (
							<form
								className="flex flex-col gap-2 w-full"
								onSubmit={handleSubmit}>
								<TextField
									name='username'
									placeholder={t("username", "Username")}
									onChange={handleChange}
									onBlur={handleBlur}
									variant='outlined'
								/>
								<TextField
									type='password'
									name='password'
									placeholder={t("password", "Password")}
									onChange={handleChange}
									onBlur={handleBlur}
									variant='outlined'
								/>
								<Button
									type='submit'
									variant="outlined">
									{t("login", "Log In")}
								</Button>
							</form>
						)}
				</Formik>
				<Divider>OR</Divider>
				<Button
					onClick={handleGoogleLogin}>
					{t("loginWithGoogle", "Log In With Google")}
				</Button>
			</div>
		</div>
	);
}