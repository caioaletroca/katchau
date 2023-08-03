'use client';

import Icon from '@/components/Icon';
import PageMobile from '@/components/Page/PageMobile';
import TextField from '@/components/TextField';
import { user } from '@/validation/user';
import { IconButton, InputAdornment } from '@mui/material';
import { Form, Formik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useIntl } from 'react-intl';
import { z } from 'zod';
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
						validate={withZodSchema(RegisterEmailSchema)}
						onSubmit={handleSubmit}>
						{({ handleSubmit, setFieldValue }) => (
							<Form onSubmit={handleSubmit}>
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
							</Form>
						)}
					</Formik>
				</Content>
				<LoginButton />
			</ContentWrapper>
		</PageMobile>
	);
}
