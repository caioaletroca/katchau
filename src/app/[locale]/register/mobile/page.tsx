'use client';

import Icon from '@/components/Icon';
import PageMobile from '@/components/Page/PageMobile';
import RegisterMobileHeader from '@/components/Register/Mobile/RegisterMobileHeader';
import RegisterMobileLoginButton from '@/components/Register/Mobile/RegisterMobileLoginButton';
import RegisterMobileNextButton from '@/components/Register/Mobile/RegisterMobileNextButton';
import RegisterMobileTitle from '@/components/Register/Mobile/RegisterMobileTitle';
import TextField from '@/components/TextField';
import { user } from '@/validation/user';
import { IconButton, InputAdornment } from '@mui/material';
import { Form, Formik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useIntl } from 'react-intl';
import { z } from 'zod';
import {
	RegisterMobileContent,
	RegisterMobileContentWrapper,
} from '../../../../components/Register/Mobile/RegisterMobileContent';
import { useRegister } from '../RegisterProvider';

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
			<RegisterMobileHeader />
			<RegisterMobileContentWrapper>
				<RegisterMobileContent>
					<Formik
						initialValues={initialValues}
						validate={withZodSchema(RegisterEmailSchema)}
						onSubmit={handleSubmit}>
						{({ handleSubmit, setFieldValue }) => (
							<Form onSubmit={handleSubmit}>
								<RegisterMobileTitle
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
								<RegisterMobileNextButton />
							</Form>
						)}
					</Formik>
				</RegisterMobileContent>
				<RegisterMobileLoginButton />
			</RegisterMobileContentWrapper>
		</PageMobile>
	);
}
