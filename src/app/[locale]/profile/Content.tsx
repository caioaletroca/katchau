'use client';

import { usePosts } from '@/api/posts';
import { useRouter } from '@/lib/intl/client';
import { PostWithImage } from '@/types/posts';
import getStoragePath from '@/utils/storage/getStoragePath';
import { Button, Grid, Skeleton, Typography } from '@mui/material';
import Image from 'next/image';
import { useIntl } from 'react-intl';

type ContentProps = {
	user_id: string;
};

function ProfileContentLoading() {
	return (
		<Grid container spacing={0.5}>
			{Array(5)
				.fill(0)
				.map((_, index) => (
					<Grid key={index} item xs={4}>
						<Skeleton variant="rectangular" height={window.innerWidth / 3} />
					</Grid>
				))}
		</Grid>
	);
}

function ProfileContentEmpty() {
	const intl = useIntl();
	const router = useRouter();

	const handleClick = () => router.push('/new-post');

	return (
		<div className="flex h-full flex-col justify-center gap-4 p-10">
			<Typography variant="body2" color="grey" align="center">
				{intl.formatMessage({
					id: 'profile.emptyMessage',
					defaultMessage:
						"It's empty here, right? You can start by uploading pictures!",
				})}
			</Typography>
			<Button size="small" onClick={handleClick}>
				{intl.formatMessage({
					id: 'profile.emptyButton',
					defaultMessage: 'Create a post',
				})}
			</Button>
		</div>
	);
}

export default function ProfileContent({ user_id }: ContentProps) {
	const router = useRouter();
	const { data: posts, isLoading } = usePosts({ user_id });

	const handleClick = (post: PostWithImage) => {
		router.push(`/post/${post.user_id}/${post.id}`);
	};

	if (isLoading) {
		return <ProfileContentLoading />;
	}

	if (posts?.length === 0) {
		return <ProfileContentEmpty />;
	}

	return (
		<>
			<Grid container spacing={0.5}>
				{posts?.map((post) => (
					<Grid key={post.id} item xs={4}>
						<Image
							key={post.id}
							alt=""
							width={window.innerWidth / 3}
							height={window.innerWidth / 3}
							src={getStoragePath('posts', post?.images[0]?.url)}
							onClick={() => handleClick(post)}
						/>
					</Grid>
				))}
			</Grid>
		</>
	);
}
