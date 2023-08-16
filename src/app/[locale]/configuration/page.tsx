'use client';

import Icon from '@/components/Icon';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import { useRouter } from '@/lib/intl/client';
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useIntl } from 'react-intl';

type SectionProps = React.PropsWithChildren & {
	title: string;
};

function Section({ title, children }: SectionProps) {
	return (
		<Paper
			classes={{
				root: 'p-2 mb-3',
			}}
			square
			elevation={1}>
			<Typography variant="body2" color="grey">
				{title}
			</Typography>
			{children}
		</Paper>
	);
}

export default function ConfigurationPage() {
	const intl = useIntl();
	const router = useRouter();
	const { locale } = useParams();

	const handleBack = () => router.push('/profile');

	return (
		<PageMobile>
			<PageMobileHeader
				title={intl.formatMessage({
					id: 'configurations.title',
					defaultMessage: 'Configurations',
				})}
				onBackClick={handleBack}
			/>
			<Section
				title={intl.formatMessage({
					id: 'configurations.appsAndMediaSectionTitle',
					defaultMessage: 'Apps and Medias',
				})}>
				<List dense>
					<ListItemButton
						data-cy="configuration-language"
						onClick={() => router.push('/configuration/language')}>
						<ListItemIcon>
							<Icon name="language" />
						</ListItemIcon>
						<ListItemText
							primary={intl.formatMessage({
								id: 'languageButtom',
								defaultMessage: 'Language',
							})}
						/>
					</ListItemButton>
				</List>
			</Section>
			<Section
				title={intl.formatMessage({
					id: 'logInSectionTitle',
					defaultMessage: 'Log In',
				})}>
				<List dense>
					<ListItemButton
						data-cy="configuration-logout"
						className="text-red-600"
						color="secondary"
						onClick={() => signOut({ callbackUrl: `/${locale}/login` })}>
						<ListItemText primary="Log off" />
					</ListItemButton>
				</List>
			</Section>
		</PageMobile>
	);
}
