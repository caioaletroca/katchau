'use client';

import { PostWithImage } from '@/types/posts';
import getStoragePath from '@/utils/storage/getStoragePath';
import { Typography } from '@mui/material';
import { ProfileImage, User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import { useIntl } from 'react-intl';
import { PostCommentDrawer } from './PostCommentDrawer';
import PostHeader from './PostHeader';
import PostInteraction from './PostInteraction';

type PostProps = {
	user: User;
	post: PostWithImage;
	profileImage: ProfileImage;
	onDelete?: () => void;
};

export default function Post({
	user,
	post,
	profileImage,
	onDelete,
}: PostProps) {
	const intl = useIntl();
	const [open, setOpen] = React.useState(false);

	return (
		<div className="flex w-full flex-col">
			<PostHeader
				user={user}
				post_id={post.id}
				profileImage={profileImage}
				onDelete={onDelete}
			/>
			<Image
				alt={intl.formatMessage({
					id: 'post.imageAlt',
					defaultMessage: 'Main post image',
				})}
				width={window.innerWidth}
				height={window.innerWidth}
				src={getStoragePath('posts', post.images[0].url)!}
			/>
			<PostInteraction post={post} onComment={() => setOpen(true)} />
			<div className="flex flex-col px-2">
				<Typography>{post.description}</Typography>
			</div>
			<PostCommentDrawer
				open={open}
				title={intl.formatMessage({
					id: 'post.comment.title',
					defaultMessage: 'Comments',
				})}
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}
			/>
		</div>
	);
}
