'use client';

import PageMobile from '@/components/Page/PageMobile';
import PasswordTextField from '@/components/PasswordTextField';
import {
	RegisterMobileContent,
	RegisterMobileContentWrapper,
} from '@/components/Register/Mobile/RegisterMobileContent';
import RegisterMobileHeader from '@/components/Register/Mobile/RegisterMobileHeader';
import LoginButton from '@/components/Register/Mobile/RegisterMobileLoginButton';
import RegisterMobileNextButton from '@/components/Register/Mobile/RegisterMobileNextButton';
import RegisterMobileTitle from '@/components/Register/Mobile/RegisterMobileTitle';
import { user } from '@/validation/user';
import { Formik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useIntl } from 'react-intl';
import { z } from 'zod';
import { useRegister } from '../../RegisterProvider';

const initialValues = {
	password: '',
};

const RegisterPasswordSchema = z.object({
	password: user.password,
});

type RegisterPasswordFormData = z.infer<typeof RegisterPasswordSchema>;

export default function RegisterPasswordMobilePage() {
	const intl = useIntl();
	const { setFormData, handleNext } = useRegister();

	const handleSubmit = (values: RegisterPasswordFormData) => {
		setFormData(values);
		handleNext();
	};

	return (
		<PageMobile>
			<RegisterMobileHeader />
			<RegisterMobileContentWrapper>
				<RegisterMobileContent>
					<RegisterMobileTitle
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
						validate={withZodSchema(RegisterPasswordSchema)}
						onSubmit={handleSubmit}>
						{({ handleSubmit }) => (
							<form onSubmit={handleSubmit} noValidate>
								<PasswordTextField
									name="password"
									label={intl.formatMessage({
										id: 'common.password',
										defaultMessage: 'Password',
									})}
									fullWidth
								/>
								<RegisterMobileNextButton />
							</form>
						)}
					</Formik>
				</RegisterMobileContent>
				<LoginButton />
			</RegisterMobileContentWrapper>
		</PageMobile>
	);
}
