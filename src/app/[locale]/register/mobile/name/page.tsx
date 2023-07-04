'use client';

import PageMobile from '@/components/Page/PageMobile';
import TextField from '@/components/TextField';
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
	name: '',
};

const RegisterNameSchema = z.object({
	name: z.string(user.name).min(1),
});

type RegisterNameFormData = z.infer<typeof RegisterNameSchema>;

export default function RegisterMobilePage() {
	const intl = useIntl();
	const { setFormData, handleNext } = useRegister();

	const handleSubmit = (values: RegisterNameFormData) => {
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
						validationSchema={toFormikValidationSchema(RegisterNameSchema)}
						onSubmit={handleSubmit}>
						{({ handleChange, handleBlur, handleSubmit }) => (
							<form onSubmit={handleSubmit} noValidate>
								<Title
									title={intl.formatMessage({
										id: 'register.nameTitle',
										defaultMessage: "What's your name?",
									})}
									subtitle={intl.formatMessage({
										id: 'register.nameSubtitle',
										defaultMessage:
											'Add your name so that friends can find you.',
									})}
								/>
								<TextField
									name="name"
									label={intl.formatMessage({
										id: 'common.name',
										defaultMessage: 'Full name',
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
