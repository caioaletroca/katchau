"use client";

import Icon from "@/components/Icon";
import PageMobile from "@/components/Page/PageMobile";
import PageMobileHeader from "@/components/Page/PageMobileHeader";
import TextField from "@/components/TextField";
import { useRouter } from "@/lib/intl/client";
import { user } from "@/validation/user";
import { Button, IconButton, InputAdornment, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useIntl } from "react-intl";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRegister } from "../RegisterProvider";

const initialValues = {
	email: ''
}

const RegisterEmailSchema = z.object({
	email: user.email.min(1)
});

type RegisterEmailFormData = z.infer<typeof RegisterEmailSchema>;

export default function RegisterMobilePage() {
	const router = useRouter();
	const intl = useIntl();
	const { setFormData, handleNext } = useRegister();

	const handleBack = () => router.back();

	const handleSubmit = (values: RegisterEmailFormData) => {
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
					validationSchema={toFormikValidationSchema(RegisterEmailSchema)}
					onSubmit={handleSubmit}>
					{({
						handleChange,
						handleBlur,
						handleSubmit,
						setFieldValue
					}) => (
						<form onSubmit={handleSubmit}>
							<div className='flex flex-col mb-4'>
								<Typography variant='h5'>
									{intl.formatMessage({
										id: "register.emailTitle",
										defaultMessage: "What's your email address?"
									})}
								</Typography>
								<Typography variant='caption'>
									{intl.formatMessage({
										id: "register.emailSubtitle",
										defaultMessage: "Enter the email address at which you can be contacted. No one will see this on your profile."
									})}
								</Typography>
							</div>
							<TextField
								type='email'
								name='email'
								label={intl.formatMessage({
									id: 'common.email',
									defaultMessage: "Email"
								})}
								onChange={handleChange}
								onBlur={handleBlur}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={() => setFieldValue("email", "")}>
												<Icon name='close' />
											</IconButton>
										</InputAdornment>
									)
								}}
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
