'use client';

import { PostWithImage } from '@/types/posts';
import getStoragePath from '@/utils/storage/getStoragePath';
import { Skeleton, Typography } from '@mui/material';
import { ProfileImage, User } from '@prisma/client';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { useIntl } from 'react-intl';
import { PostCommentDrawer } from './PostCommentDrawer';
import PostHeader, { PostHeaderLoading } from './PostHeader';
import PostInteraction from './PostInteraction';
import { PostShareDrawer } from './PostShareDrawer';

export function PostLoading() {
	return (
		<div className="flex w-full flex-col">
			<PostHeaderLoading />
			<Skeleton className="h-full-w mb-2 w-full" variant="rectangular" />
			<div className="mb-2 flex flex-col gap-2 px-2">
				<Skeleton className="w-full" variant="rectangular" height={16} />
				<Skeleton className="w-full" variant="rectangular" height={16} />
				<Skeleton className="w-2/3" variant="rectangular" height={16} />
			</div>
		</div>
	);
}

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
	const [openCommentDrawer, setOpenCommentDrawer] = React.useState(false);
	const [openShareDrawer, setOpenShareDrawer] = React.useState(false);

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
			<PostInteraction
				post={post}
				onComment={() => setOpenCommentDrawer(true)}
				onShare={() => setOpenShareDrawer(true)}
			/>
			<div className="mb-2 flex flex-col px-2">
				<Typography>{post.description}</Typography>
			</div>
			<div className="flex flex-col px-2">
				<Typography className="text-neutral-500" variant="caption">
					{dayjs(post.created_at).format('LL')}
				</Typography>
			</div>
			<PostCommentDrawer
				post_id={post.id}
				open={openCommentDrawer}
				title={intl.formatMessage({
					id: 'post.comment.title',
					defaultMessage: 'Comments',
				})}
				onOpen={() => setOpenCommentDrawer(true)}
				onClose={() => setOpenCommentDrawer(false)}
			/>
			<PostShareDrawer
				post_id={post.id}
				open={openShareDrawer}
				onOpen={() => setOpenShareDrawer(true)}
				onClose={() => setOpenShareDrawer(false)}
			/>
		</div>
	);
}
