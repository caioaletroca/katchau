'use client';

import { useUser } from '@/api/users';
import Icon from '@/components/Icon';
import SwipeableDrawer from '@/components/SwipeableDrawer';
import { useRouter } from '@/lib/intl/client';
import {
	AppBar,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Skeleton,
	Toolbar,
	Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useIntl } from 'react-intl';

type ProfileHeaderBackButtonProps = {
	onBack?: () => void;
};

function ProfileHeaderBackButton({ onBack }: ProfileHeaderBackButtonProps) {
	return (
		<IconButton onClick={onBack}>
			<Icon name="arrow_back" />
		</IconButton>
	);
}

type ProfileHeaderLoadingProps = {
	onBack?: () => void;
};

export function ProfileHeaderLoading({ onBack }: ProfileHeaderLoadingProps) {
	return (
		<div className="flex w-full flex-row items-center gap-2 p-2 px-4">
			{onBack && <ProfileHeaderBackButton onBack={onBack} />}
			<Skeleton variant="rectangular" width={128} />
		</div>
	);
}

type ProfileHeaderProps = {
	user_id: string;
	onBack?: () => void;
};

export default function ProfileHeader({ user_id, onBack }: ProfileHeaderProps) {
	const intl = useIntl();
	const router = useRouter();
	const { data: session } = useSession();
	const { data: user, isLoading } = useUser({ user_id });

	const [open, setOpen] = React.useState(false);

	if (isLoading) {
		return <ProfileHeaderLoading onBack={onBack} />;
	}

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					{onBack && <ProfileHeaderBackButton onBack={onBack} />}
					<Typography className="flex-1">{user?.username}</Typography>
					{session?.user.id === user_id && (
						<IconButton data-cy="profile-menu" onClick={() => setOpen(true)}>
							<Icon name="menu" />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
			<SwipeableDrawer
				open={open}
				disableDiscovery
				disableSwipeToOpen
				anchor="bottom"
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}>
				<List dense>
					<ListItemButton
						data-cy="profile-drawer-configuration"
						onClick={() => router.push('/configuration')}>
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
