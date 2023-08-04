'use client';

import PageMobile from '@/components/Page/PageMobile';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useRegister } from '../../RegisterProvider';
import { Content, ContentWrapper } from '../Content';
import Header from '../Header';
import LoginButton from '../LoginButton';
import Title from '../Title';

export default function RegisterTermsMobilePage() {
	const intl = useIntl();
	const { handleRegister, isRegistering } = useRegister();

	return (
		<PageMobile>
			<Header />
			<ContentWrapper>
				<Content>
					<Title
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
							loading={isRegistering}
							onClick={handleRegister}>
							{intl.formatMessage({
								id: 'common.agree',
								defaultMessage: 'I agree',
							})}
						</LoadingButton>
					</div>
				</Content>
				<LoginButton />
			</ContentWrapper>
		</PageMobile>
	);
}
