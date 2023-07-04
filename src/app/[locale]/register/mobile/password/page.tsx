"use client";

import PageMobile from "@/components/Page/PageMobile";
import PageMobileHeader from "@/components/Page/PageMobileHeader";
import PasswordTextField from "@/components/PasswordTextField";
import { useRouter } from "@/lib/intl/client";
import { user } from "@/validation/user";
import { Button, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useIntl } from "react-intl";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRegister } from "../../RegisterProvider";

const initialValues = {
	password: ''
}

const RegisterPasswordSchema = z.object({
	password: user.password
});

type RegisterPasswordFormData = z.infer<typeof RegisterPasswordSchema>;

export default function RegisterMobilePage() {
	const router = useRouter();
	const intl = useIntl();
	const { setFormData, handleNext } = useRegister();

	const handleBack = () => router.back();

	const handleSubmit = (values: RegisterPasswordFormData) => {
		setFormData(values);
		handleNext();
	}

	return (
		<PageMobile>
			<PageMobileHeader
				onBackClick={handleBack}
			/>
			<div className='flex flex-col p-4 gap-2'>
				<Formik
					initialValues={initialValues}
					validationSchema={toFormikValidationSchema(RegisterPasswordSchema)}
					onSubmit={handleSubmit}>
					{({
						handleChange,
						handleBlur,
						handleSubmit
					}) => (
						<form onSubmit={handleSubmit} noValidate>
							<div className='flex flex-col mb-4'>
								<Typography variant='h5'>
									{intl.formatMessage({
										id: "register.passwordTitle",
										defaultMessage: "Create a password"
									})}
								</Typography>
								<Typography variant='caption'>
									{intl.formatMessage({
										id: "register.passwordSubtitle",
										defaultMessage: "Create a password with at least 8 letter and numbers. It should be something that others can't guess."
									})}
								</Typography>
							</div>
							<PasswordTextField
								name='password'
								label={intl.formatMessage({
									id: 'common.password',
									defaultMessage: "Password"
								})}
								onChange={handleChange}
								onBlur={handleBlur}
								fullWidth
							/>
							<div className="flex flex-col mt-8 w-full">
								<Button
									type="submit"
									variant='contained'>
									{intl.formatMessage({
										id: "common.nextButton",
										defaultMessage: "Next"
									})}
								</Button>
							</div>
						</form>
					)}
				</Formik>
			</div>
		</PageMobile>
	);
}
