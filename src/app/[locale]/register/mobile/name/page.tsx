"use client";

import PageMobile from "@/components/Page/PageMobile";
import PageMobileHeader from "@/components/Page/PageMobileHeader";
import TextField from "@/components/TextField";
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
	name: ''
}

const RegisterNameSchema = z.object({
	name: user.name.min(1)
});

type RegisterNameFormData = z.infer<typeof RegisterNameSchema>;

export default function RegisterMobilePage() {
	const router = useRouter();
	const intl = useIntl();
	const { setFormData, handleNext } = useRegister();

	const handleBack = () => router.back();

	const handleSubmit = (values: RegisterNameFormData) => {
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
					validationSchema={toFormikValidationSchema(RegisterNameSchema)}
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
										id: "register.nameTitle",
										defaultMessage: "What's your name?"
									})}
								</Typography>
								<Typography variant='caption'>
									{intl.formatMessage({
										id: "register.nameSubtitle",
										defaultMessage: "Add your name so that friends can find you."
									})}
								</Typography>
							</div>
							<TextField
								name='name'
								label={intl.formatMessage({
									id: 'common.name',
									defaultMessage: "Full name"
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
