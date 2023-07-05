'use client';

import PageMobile from '@/components/Page/PageMobile';
import TextField from '@/components/TextField';
import { user } from '@/validation/user';
import { Form, Formik } from 'formik';
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
	name: '',
};

const RegisterNameSchema = z.object({
	name: z.string(user.name).min(1),
});

type RegisterNameFormData = z.infer<typeof RegisterNameSchema>;

export default function RegisterNameMobilePage() {
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
						validate={withZodSchema(RegisterNameSchema)}
						onSubmit={handleSubmit}>
						<Form>
							<Title
								title={intl.formatMessage({
									id: 'register.nameTitle',
									defaultMessage: "What's your name?",
								})}
								subtitle={intl.formatMessage({
									id: 'register.nameSubtitle',
									defaultMessage: 'Add your name so that friends can find you.',
								})}
							/>
							<TextField
								name="name"
								label={intl.formatMessage({
									id: 'common.name',
									defaultMessage: 'Full name',
								})}
								fullWidth
							/>
							<NextButton />
						</Form>
					</Formik>
				</Content>
				<LoginButton />
			</ContentWrapper>
		</PageMobile>
	);
}
