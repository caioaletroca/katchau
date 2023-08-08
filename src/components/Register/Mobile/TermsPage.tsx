'use client';

import PageMobile from '@/components/Page/PageMobile';
import {
	RegisterMobileContent,
	RegisterMobileContentWrapper,
} from '@/components/Register/Mobile/RegisterMobileContent';
import RegisterMobileHeader from '@/components/Register/Mobile/RegisterMobileHeader';
import RegisterMobileLoginButton from '@/components/Register/Mobile/RegisterMobileLoginButton';
import RegisterMobileTitle from '@/components/Register/Mobile/RegisterMobileTitle';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { useIntl } from 'react-intl';

type RegisterTermsMobilePageProps = {
	loading?: boolean;
	onSubmit?: () => void;
};

export default function RegisterTermsMobilePage({
	loading,
	onSubmit,
}: RegisterTermsMobilePageProps) {
	const intl = useIntl();

	return (
		<PageMobile>
			<RegisterMobileHeader />
			<RegisterMobileContentWrapper>
				<RegisterMobileContent>
					<RegisterMobileTitle
						title={intl.formatMessage({
							id: 'register.termsTitle',
							defaultMessage: "Agree to Katchau's terms and policies",
						})}
						subtitle=""
					/>
					<Typography variant="caption">
						{intl.formatMessage({
							id: 'register.termsText1',
							defaultMessage:
								'People who use our service may have uploaded your contact information to Katchau',
						})}
					</Typography>
					<Typography variant="caption">
						{intl.formatMessage(
							{
								id: 'register.termsText2',
								defaultMessage:
									"By tapping {buttonLabel}, you agree to create an account and to Katchau's Terms, Privacy Policy and Cookie Policy.",
							},
							{
								buttonLabel: (
									<b>
										{intl.formatMessage({
											id: 'common.agree',
											defaultMessage: 'I agree',
										})}
									</b>
								),
							}
						)}
					</Typography>
					<div className="mt-8 flex w-full flex-col">
						<LoadingButton
							type="submit"
							variant="contained"
							loading={loading}
							onClick={onSubmit}>
							{intl.formatMessage({
								id: 'common.agree',
								defaultMessage: 'I agree',
							})}
						</LoadingButton>
					</div>
				</RegisterMobileContent>
				<RegisterMobileLoginButton />
			</RegisterMobileContentWrapper>
		</PageMobile>
	);
}
