'use client';

import PageMobile from '@/components/Page/PageMobile';
import PasswordTextField from '@/components/PasswordTextField';
import { user } from '@/validation/user';
import { Formik } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useRegister } from '../../RegisterProvider';
import { Content, ContentWrapper } from '../Content';
import Header from '../Header';
import LoginButton from '../LoginButton';
import NextButton from '../NextButton';
import Title from '../Title';

const initialValues = {
	password: '',
};

const RegisterPasswordSchema = z.object({
	password: user.password,
});

type RegisterPasswordFormData = z.infer<typeof RegisterPasswordSchema>;

export default function RegisterMobilePage() {
	const intl = useIntl();
	const { setFormData, handleNext } = useRegister();

	const handleSubmit = (values: RegisterPasswordFormData) => {
		setFormData(values);
		handleNext();
	};

	return (
		<PageMobile>
			<Header />
			<ContentWrapper>
				<Content>
					<Title
						title={intl.formatMessage({
							id: 'register.passwordTitle',
							defaultMessage: 'Create a password',
						})}
						subtitle={intl.formatMessage({
							id: 'register.passwordSubtitle',
							defaultMessage:
								"Create a password with at least 8 letter and numbers. It should be something that others can't guess.",
						})}
					/>
					<Formik
						initialValues={initialValues}
						validationSchema={toFormikValidationSchema(RegisterPasswordSchema)}
						onSubmit={handleSubmit}>
						{({ handleChange, handleBlur, handleSubmit }) => (
							<form onSubmit={handleSubmit} noValidate>
								<PasswordTextField
									name="password"
									label={intl.formatMessage({
										id: 'common.password',
										defaultMessage: 'Password',
									})}
									onChange={handleChange}
									onBlur={handleBlur}
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
