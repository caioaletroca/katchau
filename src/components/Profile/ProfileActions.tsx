'use client';

import { useFollows, useUpdateFollow } from '@/api/follows';
import { useUser } from '@/api/users';
import { useRouter } from '@/lib/intl/client';
import { LoadingButton } from '@mui/lab';
import {
	Button,
	Divider,
	Grid,
	List,
	ListItemButton,
	ListItemText,
	Skeleton,
	Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useIntl } from 'react-intl';
import Icon from '../Icon';
import SwipeableDrawer from '../SwipeableDrawer';

export function ProfileActionsLoading() {
	return (
		<Grid container className="mx-4 mb-4" spacing={1}>
			<Grid item xs={5}>
				<Skeleton variant="rectangular" height={30} />
			</Grid>
			<Grid item xs={5}>
				<Skeleton variant="rectangular" height={30} />
			</Grid>
		</Grid>
	);
}

type ProfileActionsProps = {
	user_id: string;
};

export default function ProfileActions({ user_id }: ProfileActionsProps) {
	const intl = useIntl();
	const router = useRouter();
	const { data: session } = useSession();
	const { data: user, isLoading: userLoading } = useUser({ user_id });
	const {
		data: follows,
		mutate,
		isLoading: followsLoading,
	} = useFollows({ user_id });
	const { trigger, isMutating } = useUpdateFollow(
		{ user_id },
		{
			onSuccess: () => mutate(),
		}
	);
	const [open, setOpen] = React.useState(false);

	const handleFollow = () => {
		setOpen(false);
		trigger();
	};

	const ownProfile = session?.user.id === user?.id;
	const ownFollow = React.useMemo(() => {
		return follows?.followeds.find(
			({ following_id }) => following_id === session?.user.id
		);
	}, [follows, session]);

	if (userLoading || followsLoading) {
		return <ProfileActionsLoading />;
	}

	return (
		<>
			<div className="mx-4 mb-4 flex flex-col">
				<Grid container className="" spacing={1}>
					<Grid item xs={5}>
						<div className="flex flex-col">
							{ownProfile && (
								<Button
									variant="outlined"
									size="small"
									onClick={() => router.push('/profile/edit')}>
									{intl.formatMessage({
										id: 'common.editProfile',
										defaultMessage: 'Edit profile',
									})}
								</Button>
							)}
							{!ownProfile && ownFollow && (
								<LoadingButton
									loading={isMutating}
									variant="outlined"
									size="small"
									endIcon={<Icon name="expand_more" />}
									onClick={() => setOpen(true)}>
									{intl.formatMessage({
										id: 'common.following',
										defaultMessage: 'Following',
									})}
								</LoadingButton>
							)}
							{!ownProfile && !ownFollow && (
								<LoadingButton
									loading={isMutating}
									variant="contained"
									size="small"
									onClick={handleFollow}>
									{intl.formatMessage({
										id: 'common.follow',
										defaultMessage: 'Follow',
									})}
								</LoadingButton>
							)}
						</div>
					</Grid>
				</Grid>
			</div>
			<SwipeableDrawer
				anchor="bottom"
				open={open}
				disableDiscovery
				disableSwipeToOpen
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}>
				{/* TODO: Use inbuilt title */}
				<Typography className="mb-2 font-bold" align="center">
					{user?.name}
				</Typography>
				<Divider />
				<List>
					<ListItemButton onClick={handleFollow}>
						<ListItemText
							primary={intl.formatMessage({
								id: 'common.unfollow',
								defaultMessage: 'Unfollow',
							})}
						/>
					</ListItemButton>
				</List>
			</SwipeableDrawer>
		</>
	);
}
