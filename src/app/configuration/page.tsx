'use client';

import Icon from '@/components/Icon';
import PageMobile from '@/components/Page/PageMobile';
import useTranslation from '@/hooks/useTranslation';
import {
	AppBar,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Paper,
	Toolbar,
	Typography,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ConfigurationPage() {
	const router = useRouter();
	const { t } = useTranslation('configurations');

	return (
		<PageMobile>
			<AppBar position="static">
				<Toolbar>
					<IconButton onClick={() => router.back()}>
						<Icon name="arrow_back" />
					</IconButton>
					<Typography variant="h6">{t('title', 'Configurations')}</Typography>
				</Toolbar>
			</AppBar>
			<Paper
				classes={{
					root: 'p-2',
				}}
				square
				elevation={1}>
				<Typography variant="body2" color="grey">
					Log In
				</Typography>
				<List dense>
					<ListItemButton color="secondary" onClick={() => signOut()}>
						<ListItemText primary="Log off" />
					</ListItemButton>
				</List>
			</Paper>
		</PageMobile>
	);
}
