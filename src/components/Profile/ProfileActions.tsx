import { useFollow, useUpdateFollow } from '@/api/follows';
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
	Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useIntl } from 'react-intl';
import Icon from '../Icon';
import SwipeableDrawer from '../SwipeableDrawer';

type ProfileActionsProps = {
	user_id: string;
};

export default function ProfileActions({ user_id }: ProfileActionsProps) {
	const intl = useIntl();
	const router = useRouter();
	const { data: session } = useSession();
	const { data: user } = useUser({ user_id });
	const { data: follow, mutate } = useFollow({ user_id });
	const { trigger, isMutating } = useUpdateFollow(
		{ user_id },
		{
			onSuccess: () => mutate(),
		}
	);
	const [open, setOpen] = React.useState(false);

	const handleFollow = () => trigger();

	const ownProfile = session?.user.id === user?.id;

	return (
		<>
			<Grid container className="mx-4 mb-4">
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
						{!ownProfile && follow && (
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
						{!ownProfile && !follow && (
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
			<SwipeableDrawer
				anchor="bottom"
				open={open}
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}>
				<Typography className="mb-2 font-bold" align="center">
					{user?.name}
				</Typography>
				<Divider />
				<List>
					<ListItemButton>
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
