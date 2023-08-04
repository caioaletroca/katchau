'use client';

import { useDeletePost } from '@/api/posts';
import {
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { ProfileImage, User } from '@prisma/client';
import React from 'react';
import { useIntl } from 'react-intl';
import Avatar from '../Avatar';
import Icon from '../Icon';
import SwipeableDrawer from '../SwipeableDrawer';

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
	const [open, setOpen] = React.useState(false);
	const { trigger } = useDeletePost(
		{ user_id: user.id, post_id },
		{
			onSuccess: onDelete,
		}
	);

	const handleDelete = () => trigger();

	return (
		<div className="flex flex-row items-center justify-between p-2">
			<div className="flex flex-row items-center gap-3">
				<Avatar
					name={user.name!}
					alt={intl.formatMessage({
						id: 'post.userProfilePicture.alt',
						defaultMessage: 'Post profile picture',
					})}
					size="small"
					src={profileImage?.url}
				/>
				<Typography>{user.name}</Typography>
			</div>
			<IconButton onClick={() => setOpen(true)}>
				<Icon name="more_vert" />
			</IconButton>
			<SwipeableDrawer
				open={open}
				disableSwipeToOpen
				anchor="bottom"
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}>
				<List>
					<ListItemButton onClick={handleDelete}>
						<ListItemIcon>
							<Icon name="delete" />
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
