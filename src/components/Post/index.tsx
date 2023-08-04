'use client';

import { PostWithImage } from '@/types/posts';
import getStoragePath from '@/utils/storage/getStoragePath';
import { Typography } from '@mui/material';
import { ProfileImage, User } from '@prisma/client';
import Image from 'next/image';
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
	return (
		<div className="flex w-full flex-col">
			<PostHeader
				user={user}
				post_id={post.id}
				profileImage={profileImage}
				onDelete={onDelete}
			/>
			<Image
				alt=""
				width={window.innerWidth}
				height={window.innerWidth}
				src={getStoragePath('posts', post.images[0].url)}
			/>
			<PostInteraction post={post} />
			<Typography>{post.description}</Typography>
		</div>
	);
}
