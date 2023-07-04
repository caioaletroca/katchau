'use client';

import Icon from '@/components/Icon';
import PageMobile from '@/components/Page/PageMobile';
import TextField from '@/components/TextField';
import { user } from '@/validation/user';
import { IconButton, InputAdornment } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useRegister } from '../RegisterProvider';
import { Content, ContentWrapper } from './Content';
import Header from './Header';
import LoginButton from './LoginButton';
import NextButton from './NextButton';
import Title from './Title';

const initialValues = {
	email: '',
};

const RegisterEmailSchema = z.object({
	email: user.email.min(1),
});

type RegisterEmailFormData = z.infer<typeof RegisterEmailSchema>;

export default function RegisterMobilePage() {
	const intl = useIntl();
	const { setFormData, handleNext } = useRegister();

	const handleSubmit = (values: RegisterEmailFormData) => {
		setFormData(values);
		handleNext();
	};

	return (
		<PageMobile>
			<Header />
			<ContentWrapper>
				<Content>
					<Formik
						initialValues={initialValues}
						validationSchema={toFormikValidationSchema(RegisterEmailSchema)}
						onSubmit={handleSubmit}>
						{({ handleChange, handleBlur, handleSubmit, setFieldValue }) => (
							<form onSubmit={handleSubmit}>
								<Title
									title={intl.formatMessage({
										id: 'register.emailTitle',
										defaultMessage: "What's your email address?",
									})}
									subtitle={intl.formatMessage({
										id: 'register.emailSubtitle',
										defaultMessage:
											'Enter the email address at which you can be contacted. No one will see this on your profile.',
									})}
								/>
								<TextField
									type="email"
									name="email"
									label={intl.formatMessage({
										id: 'common.email',
										defaultMessage: 'Email',
									})}
									onChange={handleChange}
									onBlur={handleBlur}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={() => setFieldValue('email', '')}>
													<Icon name="close" />
												</IconButton>
											</InputAdornment>
										),
									}}
									fullWidth
								/>
								<NextButton />
							</form>
						)}
					</Formik>
				</Content>
				<LoginButton />
			</ContentWrapper>
		</PageMobile>
	);
}
