'use client';

import Icon from '@/components/Icon';
import PageMobile from '@/components/Page/PageMobile';
import useTranslation from 'next-translate/useTranslation';
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import { useRouter } from 'next/navigation';

type SectionProps = React.PropsWithChildren & {
	title: string;
}

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
	const { t } = useTranslation('configuration');
	const router = useRouter();

	return (
		<PageMobile>
			<PageMobileHeader backButton title={t('title', { default: 'Configurations' })} />
			<Section title={t('appsAndMediaSectionTitle', { default: "Apps and Medias" })}>
				<List dense>
					<ListItemButton onClick={() => router.push('/configuration/language')}>
						<ListItemIcon>
							<Icon name='language' />
						</ListItemIcon>
						<ListItemText primary={t('languageButtom', { default: "Language" })} />
					</ListItemButton>
				</List>
			</Section>
			<Section title={t('logInSectionTitle', { default: "Log In" })}>
				<List dense>
					<ListItemButton color="secondary" onClick={() => signOut()}>
						<ListItemText primary="Log off" />
					</ListItemButton>
				</List>
			</Section>
		</PageMobile>
	);
}
