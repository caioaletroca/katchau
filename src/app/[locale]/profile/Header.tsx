'use client';

import Icon from '@/components/Icon';
import SwipeableDrawer from '@/components/SwipeableDrawer';
import { useRouter } from '@/lib/intl/client';
import {
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useIntl } from 'react-intl';

export default function ProfileHeader() {
	const intl = useIntl();
	const router = useRouter();
	const { data: session } = useSession();

	const [open, setOpen] = React.useState(false);

	return (
		<>
			<div className="flex w-full flex-row items-center justify-between p-2">
				<Typography>{session?.user?.name}</Typography>
				<IconButton onClick={() => setOpen(true)}>
					<Icon name="menu" />
				</IconButton>
			</div>
			<SwipeableDrawer
				open={open}
				disableSwipeToOpen
				anchor="bottom"
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}>
				<List dense>
					<ListItemButton onClick={() => router.push('/configuration')}>
						<ListItemIcon>
							<span className="material-symbols-outlined">settings</span>
						</ListItemIcon>
						<ListItemText
							primary={intl.formatMessage({
								id: 'profile.configurationButton',
								defaultMessage: 'Configurations',
							})}
						/>
					</ListItemButton>
				</List>
			</SwipeableDrawer>
		</>
	);
}
