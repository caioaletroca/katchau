'use client';

import api from '@/api';
import { useComments } from '@/api/comments';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useIntl } from 'react-intl';
import PullToRefresh from '../PullToRefresh';
import SwipeableDrawer, { SwipeableDrawerProps } from '../SwipeableDrawer';
import PostComment, { PostCommentLoading } from './PostComment';
import PostCommentTextField from './PostCommentTextField';

type PostCommentDrawerLoadingProps = SwipeableDrawerProps & {};

export function PostCommentDrawerLoading({
	...others
}: PostCommentDrawerLoadingProps) {
	return (
		<SwipeableDrawer
			anchor="bottom"
			classes={{
				paper: 'h-full rounded-t-xl overflow-hidden',
			}}
			disableDiscovery
			{...others}>
			{Array(5)
				.fill(0)
				.map((_, index) => (
					<PostCommentLoading key={index} />
				))}
		</SwipeableDrawer>
	);
}

type PostCommentDrawerProps = SwipeableDrawerProps & {};

export function PostCommentDrawer({ ...others }: PostCommentDrawerProps) {
	const intl = useIntl();
	const { post_id } = useParams();
	const { data: session } = useSession();

	const { data: comments, isLoading, mutate } = useComments({ post_id });

	const handleRefresh = () => {
		mutate();
	};

	const handleLike = async (comment_id: string) => {
		mutate(async (comments) => {
			const { data } = await api.get(`/comments/${comment_id}`);

			return comments?.map((comment) =>
				comment.id === data.id ? data : comment
			);
		});
	};

	const handleDelete = async (comment_id: string) => {
		mutate((comments) =>
			comments?.filter((comment) => comment.id === comment_id)
		);
	};

	if (isLoading) {
		return (
			<PostCommentDrawerLoading
				anchor="bottom"
				classes={{
					paper: 'h-full rounded-t-xl overflow-hidden',
				}}
				disableDiscovery
				{...others}
			/>
		);
	}

	return (
		<SwipeableDrawer
			anchor="bottom"
			classes={{
				paper: 'h-full rounded-t-xl overflow-hidden',
			}}
			disableDiscovery
			{...others}>
			<PullToRefresh onRefresh={handleRefresh}>
				{comments?.map((comment) => (
					<PostComment
						key={comment.id}
						comment={comment}
						onLike={handleLike}
						onDelete={handleDelete}
					/>
				))}
			</PullToRefresh>
			<PostCommentTextField user_id={session?.user.id!} post_id={post_id} />
		</SwipeableDrawer>
	);
}
