"use client";

import TextField from "@/components/TextField";
import useTranslation from "@/hooks/useTranslation";
import { user } from "@/validation/user";
import { Button, Divider } from "@mui/material";
import { Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const LoginSchema = z.object({
	username: user.username,
	password: user.password
})

const initialValues = {
	username: "",
	password: ""
}

export default function LoginPage() {
	const { t } = useTranslation('login');

	return (
		<div className="flex flex-col h-full">
			<div className='flex flex-col h-full justify-center gap-2 m-8'>
				<Formik
					initialValues={initialValues}
					validationSchema={toFormikValidationSchema(LoginSchema)}
					onSubmit={(data) => { console.log(data) }}>
						{({
							handleBlur,
							handleChange,
							handleSubmit
						}) => (
							<form
								className="flex flex-col gap-2"
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
				<Button>
					{t("loginWithGoogle", "Log In With Google")}
				</Button>
			</div>
		</div>
	);
}