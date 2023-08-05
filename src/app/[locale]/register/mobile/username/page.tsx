'use client';

import { useCheckUsername } from '@/api/users';
import Icon from '@/components/Icon';
import PageMobile from '@/components/Page/PageMobile';
import TextField from '@/components/TextField';
import { useDebounce } from '@/hooks/useDebounce';
import { user } from '@/validation/user';
import { Alert, CircularProgress, InputAdornment } from '@mui/material';
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
	username: user.username,
});

type RegisterUsernameFormData = z.infer<typeof RegisterUsernameSchema>;

export default function RegisterUsernameMobilePage() {
	const intl = useIntl();
	const { setFormData, handleNext } = useRegister();
	const { data, isMutating, trigger } = useCheckUsername();

	const handleSubmit = (values: RegisterUsernameFormData) => {
		setFormData(values);
		handleNext();
	};

	const formik = useFormik({
		initialValues,
		validate: withZodSchema(RegisterUsernameSchema),
		onSubmit: handleSubmit,
	});

	// TODO: Update here to use hooks
	useDebounce(
		() => {
			if (formik.values.username === '') {
				return;
			}

			trigger({
				username: formik.values.username,
			});
		},
		500,
		[formik.values.username]
	);

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
							<TextField
								name="username"
								label={intl.formatMessage({
									id: 'common.username',
									defaultMessage: 'Username',
								})}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											{isMutating ? (
												<CircularProgress size={24} />
											) : data ? (
												data?.valid ? (
													<Icon
														className="text-success-main"
														name="check_circle"
														fill
													/>
												) : (
													<Icon
														className="text-error-main"
														name="cancel"
														fill
													/>
												)
											) : null}
										</InputAdornment>
									),
								}}
								fullWidth
							/>
							{data && !data?.valid && !isMutating && (
								<div className="mt-4">
									<Alert severity="warning">
										{intl.formatMessage({
											id: 'register.usernameUniqueWarning',
											defaultMessage: 'Your username needs to be unique.',
										})}
									</Alert>
								</div>
							)}
							<NextButton disabled={!data?.valid} />
						</Form>
					</FormikProvider>
				</Content>
				<LoginButton />
			</ContentWrapper>
		</PageMobile>
	);
}
