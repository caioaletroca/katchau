import React from 'react';
import { useSession } from 'next-auth/react';
import {
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import SwipeableDrawer from '@/components/SwipeableDrawer';

export default function Header() {
	const { data: session } = useSession();
	const router = useRouter();

	const [open, setOpen] = React.useState(false);

	return (
		<>
			<div className="flex w-full flex-row items-center justify-between p-2">
				<Typography>{session?.user?.name}</Typography>
				<IconButton onClick={() => setOpen(true)}>
					<Icon name='menu' />
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
						<ListItemText primary="Configurations" />
					</ListItemButton>
				</List>
			</SwipeableDrawer>
		</>
	);
}
