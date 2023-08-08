'use client';

import DateField from '@/components/DateField';
import PageMobile from '@/components/Page/PageMobile';
import {
	RegisterMobileContent,
	RegisterMobileContentWrapper,
} from '@/components/Register/Mobile/RegisterMobileContent';
import RegisterMobileHeader from '@/components/Register/Mobile/RegisterMobileHeader';
import LoginButton from '@/components/Register/Mobile/RegisterMobileLoginButton';
import RegisterMobileNextButton from '@/components/Register/Mobile/RegisterMobileNextButton';
import RegisterMobileTitle from '@/components/Register/Mobile/RegisterMobileTitle';
import { user } from '@/validation/user';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useIntl } from 'react-intl';
import { z } from 'zod';
import { useRegister } from '../../RegisterProvider';

const initialValues = {
	birth: dayjs(null),
};

const RegisterBirthSchema = z.object({
	birth: user.birth,
});

type RegisterBirthFormData = z.infer<typeof RegisterBirthSchema>;

export default function RegisterBirthMobilePage() {
	const intl = useIntl();
	const { setFormData, handleNext } = useRegister();

	const handleSubmit = (values: RegisterBirthFormData) => {
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
						{({ values }) => (
							<Form>
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
								<RegisterMobileNextButton />
							</Form>
						)}
					</Formik>
				</RegisterMobileContent>
				<LoginButton />
			</RegisterMobileContentWrapper>
		</PageMobile>
	);
}
