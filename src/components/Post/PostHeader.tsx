'use client';

import { useDeletePost } from '@/api/posts';
import { useRouter } from '@/lib/intl/client';
import {
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Skeleton,
	Typography,
} from '@mui/material';
import { ProfileImage, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useIntl } from 'react-intl';
import Avatar from '../Avatar';
import Icon from '../Icon';
import SwipeableDrawer from '../SwipeableDrawer';

export function PostHeaderLoading() {
	return (
		<div className="flex flex-row items-center p-2">
			<div className="flex w-full flex-1 flex-row items-center gap-3">
				<Skeleton variant="circular" height={32} width={32} />
				<Skeleton variant="rectangular" height={16} width={256} />
			</div>
		</div>
	);
}

type PostHeaderProps = {
	user: User;
	post_id: string;
	profileImage: ProfileImage;
	onDelete?: () => void;
};

export default function PostHeader({
	user,
	post_id,
	profileImage,
	onDelete,
}: PostHeaderProps) {
	const intl = useIntl();
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const { data: session } = useSession();
	const { trigger } = useDeletePost(
		{ user_id: user.id, post_id },
		{
			onSuccess: onDelete,
		}
	);

	const handleClick = () => {
		router.push(`/users/${user.id}`);
	};

	const handleDelete = () => trigger();

	const ownPost = session?.user.id === user.id;

	return (
		<div className="flex flex-row items-center justify-between p-2">
			<div className="flex flex-row items-center gap-3" onClick={handleClick}>
				<Avatar
					name={user.name!}
					alt={intl.formatMessage({
						id: 'post.userProfilePicture.alt',
						defaultMessage: 'Post profile picture',
					})}
					size="small"
					url={profileImage?.url}
				/>
				<Typography>{user.name}</Typography>
			</div>
			{ownPost && (
				<IconButton onClick={() => setOpen(true)}>
					<Icon name="more_vert" />
				</IconButton>
			)}
			<SwipeableDrawer
				open={open}
				disableSwipeToOpen
				anchor="bottom"
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}>
				<List>
					<ListItemButton className="text-red-500" onClick={handleDelete}>
						<ListItemIcon>
							<Icon className="text-red-500" name="delete" />
						</ListItemIcon>
						<ListItemText
							primary={intl.formatMessage({
								id: 'post.header.deleteButton',
								defaultMessage: 'Delete',
							})}
						/>
					</ListItemButton>
				</List>
			</SwipeableDrawer>
		</div>
	);
}
