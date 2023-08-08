'use client';

import PageMobile from '@/components/Page/PageMobile';
import UsernameTextField from '@/components/UsernameTextField';
import { user } from '@/validation/user';
import { Form, FormikProvider, useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useIntl } from 'react-intl';
import { z } from 'zod';
import { useRegister } from '../../RegisterProvider';
import { Content, ContentWrapper } from '../Content';
import Header from '../Header';
import LoginButton from '../LoginButton';
import NextButton from '../NextButton';
import Title from '../Title';

const initialValues = {
	username: '',
};

const RegisterUsernameSchema = z.object({
	username: z.string(user.username).min(1),
});

type RegisterUsernameFormData = z.infer<typeof RegisterUsernameSchema>;

export default function RegisterUsernameMobilePage() {
	const intl = useIntl();
	const { setFormData, handleNext } = useRegister();

	// TODO: block user from submitting already used username
	const handleSubmit = (values: RegisterUsernameFormData) => {
		setFormData(values);
		handleNext();
	};

	const formik = useFormik({
		initialValues,
		validate: withZodSchema(RegisterUsernameSchema),
		onSubmit: handleSubmit,
	});

	return (
		<PageMobile>
			<Header />
			<ContentWrapper>
				<Content>
					<Title
						title={intl.formatMessage({
							id: 'register.usernameTitle',
							defaultMessage: 'Create a username',
						})}
						subtitle={intl.formatMessage({
							id: 'register.usernameSubtitle',
							defaultMessage:
								'Add a username or use our sugestion. You can change this at any time.',
						})}
					/>
					<FormikProvider value={formik}>
						<Form>
							<UsernameTextField
								name="username"
								label={intl.formatMessage({
									id: 'common.username',
									defaultMessage: 'Username',
								})}
								fullWidth
							/>
							<NextButton />
						</Form>
					</FormikProvider>
				</Content>
				<LoginButton />
			</ContentWrapper>
		</PageMobile>
	);
}
