"use client";

import Icon from "@/components/Icon";
import PageMobile from "@/components/Page/PageMobile";
import PageMobileHeader from "@/components/Page/PageMobileHeader";
import { useRouter } from "@/lib/intl/client";
import { Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useIntl } from "react-intl";

const initialValues = {
	email: ''
}

export default function RegisterMobilePage() {
	const router = useRouter();
	const intl = useIntl();
	const [email, setEmail] = React.useState("");

	const handleBack = () => router.back();

	const handleSubmit = (values) => {

	}

	return (
		<PageMobile>
			<PageMobileHeader
				onBackClick={handleBack}
			/>
			<div className='flex flex-col p-4 gap-2'>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}>
					{({
						handleSubmit
					}) => (
						<>
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
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={() => setEmail("")}>
												<Icon name='close' />
											</IconButton>
										</InputAdornment>
									)
								}}
								fullWidth
							/>
							<div className="flex flex-col mt-8 w-full">
								<Button
									variant='contained'>
									{intl.formatMessage({
										id: "common.nextButton",
										defaultMessage: "Next"
									})}
								</Button>
							</div>
						</>
					)}
				</Formik>
			</div>
		</PageMobile>
	);
}
