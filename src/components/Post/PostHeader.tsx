'use client';

import api from '@/api';
import {
	Avatar,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { User } from '@prisma/client';
import React from 'react';
import { useIntl } from 'react-intl';
import Icon from '../Icon';
import SwipeableDrawer from '../SwipeableDrawer';

type PostHeaderProps = {
	user: User;
	post_id: string;
	onDelete?: () => void;
};

export default function PostHeader({
	user,
	post_id,
	onDelete,
}: PostHeaderProps) {
	const intl = useIntl();
	const [open, setOpen] = React.useState(false);

	const handleDelete = async () => {
		await api.delete(`/users/${user.id}/posts/${post_id}`);

		onDelete?.();
	};

	return (
		<div className="flex flex-row items-center justify-between p-2">
			<div className="flex flex-row items-center gap-3">
				<Avatar
					alt="Profile picture"
					sx={{ width: 24, height: 24 }}
					src="https://img.freepik.com/vetores-premium/avatar-de-jovem-sorridente-homem-com-bigode-de-barba-castanha-e-cabelo-vestindo-sueter-ou-moletom-amarelo-ilustracao-de-personagem-de-pessoas-em-vetor-3d-estilo-minimalista-de-desenho-animado_365941-860.jpg?w=2000"
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
