'use client';

import PageMobile from '@/components/Page/PageMobile';
import UsernameTextField from '@/components/UsernameTextField';
import { user } from '@/validation/user';
import { Form, FormikProvider, useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useIntl } from 'react-intl';
import { z } from 'zod';
import {
	RegisterMobileContent,
	RegisterMobileContentWrapper,
} from './RegisterMobileContent';
import RegisterMobileHeader from './RegisterMobileHeader';
import RegisterMobileLoginButton from './RegisterMobileLoginButton';
import RegisterMobileNextButton from './RegisterMobileNextButton';
import RegisterMobileTitle from './RegisterMobileTitle';

const initialValues = {
	username: '',
};

const RegisterUsernameSchema = z.object({
	username: z.string(user.username).min(1),
});

type RegisterUsernameFormData = z.infer<typeof RegisterUsernameSchema>;

type RegisterUserNameMobileProps = {
	onSubmit: ({ username }: { username: string }) => {};
};

export default function RegisterUsernameMobilePage({
	onSubmit,
}: RegisterUserNameMobileProps) {
	const intl = useIntl();

	// TODO: block user from submitting already used username
	const handleSubmit = (values: RegisterUsernameFormData) => {
		onSubmit?.(values);
	};

	const formik = useFormik({
		initialValues,
		validate: withZodSchema(RegisterUsernameSchema),
		onSubmit: handleSubmit,
	});

	return (
		<PageMobile>
			<RegisterMobileHeader />
			<RegisterMobileContentWrapper>
				<RegisterMobileContent>
					<RegisterMobileTitle
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
							<RegisterMobileNextButton />
						</Form>
					</FormikProvider>
				</RegisterMobileContent>
				<RegisterMobileLoginButton />
			</RegisterMobileContentWrapper>
		</PageMobile>
	);
}
