'use client';

import PageMobile from '@/components/Page/PageMobile';
import {
	RegisterMobileContent,
	RegisterMobileContentWrapper,
} from '@/components/Register/Mobile/RegisterMobileContent';
import RegisterMobileHeader from '@/components/Register/Mobile/RegisterMobileHeader';
import RegisterMobileLoginButton from '@/components/Register/Mobile/RegisterMobileLoginButton';
import RegisterMobileNextButton from '@/components/Register/Mobile/RegisterMobileNextButton';
import RegisterMobileTitle from '@/components/Register/Mobile/RegisterMobileTitle';
import TextField from '@/components/TextField';
import { user } from '@/validation/user';
import { Form, Formik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useIntl } from 'react-intl';
import { z } from 'zod';
import { useRegister } from '../../RegisterProvider';

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
			<RegisterMobileHeader />
			<RegisterMobileContentWrapper>
				<RegisterMobileContent>
					<Formik
						initialValues={initialValues}
						validate={withZodSchema(RegisterNameSchema)}
						onSubmit={handleSubmit}>
						<Form>
							<RegisterMobileTitle
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
							<RegisterMobileNextButton />
						</Form>
					</Formik>
				</RegisterMobileContent>
				<RegisterMobileLoginButton />
			</RegisterMobileContentWrapper>
		</PageMobile>
	);
}
