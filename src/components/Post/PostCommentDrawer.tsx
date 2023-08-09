'use client';

import { useComments, useCreateComment } from '@/api/comments';
import { useUpdateCommentLike } from '@/api/likes';
import { useProfileImage } from '@/api/profileImage';
import { useUser } from '@/api/users';
import { CommentWithUserAndLike } from '@/types/comments';
import {
	CircularProgress,
	IconButton,
	InputAdornment,
	TextField,
	TextFieldProps,
	Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React from 'react';
import { useIntl } from 'react-intl';
import Avatar from '../Avatar';
import Icon from '../Icon';
import PullToRefresh from '../PullToRefresh';
import SwipeableDrawer, { SwipeableDrawerProps } from '../SwipeableDrawer';

type CommentTextFieldProps = TextFieldProps & {
	user_id: string;
	post_id: string;
	loading?: boolean;
	onSubmit?: () => void;
};

export function CommentTextField({
	user_id,
	post_id,
	loading,
	onSubmit,
	...others
}: CommentTextFieldProps) {
	const intl = useIntl();
	const { data: user } = useUser({ user_id });
	const { data: profilePicture } = useProfileImage();
	const { trigger: createComment, isMutating: createCommentLoading } =
		useCreateComment(
			{ post_id },
			{
				onSuccess: () => setComment(''),
			}
		);
	const [comment, setComment] = React.useState('');

	const handleSubmit = () => {
		createComment({ content: comment });
		onSubmit?.();
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setComment(event.target.value);
	};

	return (
		<div className="flex w-full p-2">
			<TextField
				name="comment"
				variant="standard"
				value={comment}
				onChange={handleChange}
				placeholder={intl.formatMessage({
					id: 'post.comment.commentFieldPlaceholder',
					defaultMessage: 'Add a comment...',
				})}
				InputProps={{
					disableUnderline: true,
					startAdornment: (
						<InputAdornment position="start">
							<Avatar
								name={user?.name!}
								url={profilePicture?.url}
								size="small"
							/>
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							{createCommentLoading ? (
								<CircularProgress size={16} />
							) : (
								<IconButton onClick={handleSubmit}>
									<Icon name="send" />
								</IconButton>
							)}
						</InputAdornment>
					),
				}}
				size="small"
				fullWidth
				{...others}
			/>
		</div>
	);
}

type CommentProps = {
	comment: CommentWithUserAndLike;
};

var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export function Comment({ comment }: CommentProps) {
	const { data: session } = useSession();
	const { trigger } = useUpdateCommentLike({ comment_id: comment.id });

	const ownLike = React.useMemo(() => {
		return comment.likes.find(({ user_id }) => user_id === session?.user.id);
	}, [comment, session]);

	const handleLike = () => trigger();

	return (
		<div className="flex w-full gap-2 px-2">
			<div className="flex py-4">
				<Avatar
					name={comment.user.name!}
					url={comment.user.profile_picture[0].url}
					size="small"
				/>
			</div>
			<div className="flex flex-1 flex-col py-2">
				<div className="flex gap-2">
					<Typography className="text-bold" variant="caption">
						{comment.user.username}
					</Typography>
					<Typography className="text-neutral-400" variant="caption">
						{dayjs(comment.created_at).fromNow(true)}
					</Typography>
				</div>
				<Typography variant="body2">{comment.content}</Typography>
			</div>
			<div className="flex flex-col items-center">
				<IconButton size="small" onClick={handleLike}>
					<Icon
						className="text-red text-base text-neutral-400"
						fill={!isEmpty(ownLike)}
						name="favorite"
					/>
				</IconButton>
				{comment.likes.length > 0 && (
					<Typography className="text-neutral-400" variant="caption">
						{comment.likes.length}
					</Typography>
				)}
			</div>
		</div>
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

	if (isLoading) {
		return null;
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
					<Comment key={comment.id} comment={comment} />
				))}
			</PullToRefresh>
			<CommentTextField user_id={session?.user.id!} post_id={post_id} />
		</SwipeableDrawer>
	);
}
