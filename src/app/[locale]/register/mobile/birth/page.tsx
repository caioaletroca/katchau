'use client';

import PageMobile from '@/components/Page/PageMobile';
import { user } from '@/validation/user';
import { Formik } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import { withZodSchema } from 'formik-validator-zod';
import { z } from 'zod';
import { useRegister } from '../../RegisterProvider';
import { Content, ContentWrapper } from '../Content';
import Header from '../Header';
import LoginButton from '../LoginButton';
import NextButton from '../NextButton';
import Title from '../Title';
import dayjs from 'dayjs';
import DateField from '@/components/DateField';

const initialValues = {
	birth: dayjs(null),
};

const RegisterBirthSchema = z.object({
	birth: user.birth,
});

type RegisterBirthFormData = z.infer<typeof RegisterBirthSchema>;

export default function RegisterMobilePage() {
	const intl = useIntl();
	const { setFormData, handleNext } = useRegister();

	const handleSubmit = (values: RegisterBirthFormData) => {
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
							id: 'register.birthTitle',
							defaultMessage: "What's your date of birth?",
						})}
						subtitle={intl.formatMessage({
							id: 'register.birthSubtitle',
							defaultMessage:
								'Use your own date of birth, even if this account is for a business, a pet or something else. No one will see this on your profile.',
						})}
					/>
					<Formik
						initialValues={initialValues}
						validate={withZodSchema(RegisterBirthSchema)}
						onSubmit={handleSubmit}>
						{({ values, handleSubmit }) => (
							<form onSubmit={handleSubmit} noValidate>
								<DateField
									label={
										values.birth.isValid()
											? intl.formatMessage(
													{
														id: 'common.birthWithAge',
														defaultMessage: 'Date of birth ({year} old)',
													},
													{
														year: dayjs().diff(values.birth, 'year'),
													}
											  )
											: intl.formatMessage({
													id: 'common.birth',
													defaultMessage: 'Date of birth',
											  })
									}
									name="birth"
									format="LL"
									disableFuture
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
