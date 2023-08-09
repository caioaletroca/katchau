'use client';

import { useDeleteComment } from '@/api/comments';
import { useUpdateCommentLike } from '@/api/likes';
import { CommentWithUserAndLike } from '@/types/comments';
import {
	CircularProgress,
	IconButton,
	Skeleton,
	Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useLongPress } from 'use-long-press';
import Avatar from '../Avatar';
import Icon from '../Icon';

export function PostCommentLoading() {
	return (
		<div className="flex w-full gap-2 px-2">
			<div className="flex py-4">
				<Skeleton variant="circular" height={32} width={32} />
			</div>
			<div className="flex flex-1 flex-col py-2">
				<div className="mt-2 flex gap-2">
					<Skeleton variant="rectangular" height={32} width="100%" />
				</div>
			</div>
		</div>
	);
}

type PostCommentProps = {
	comment: CommentWithUserAndLike;
	onLike?: (comment_id: string) => void;
	onDelete?: (comment_id: string) => void;
};

var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function PostComment({
	comment,
	onLike,
	onDelete,
}: PostCommentProps) {
	const { data: session } = useSession();
	const [selected, setSelected] = React.useState(false);
	const { trigger: updateCommentLike } = useUpdateCommentLike(
		{ comment_id: comment.id },
		{
			onSuccess: () => onLike?.(comment.id),
		}
	);
	const { trigger: deleteComment, isMutating: deleteCommentLoading } =
		useDeleteComment(
			{ comment_id: comment.id },
			{
				onSuccess: () => onDelete?.(comment.id),
			}
		);

	const ownComment = session?.user.id === comment.user_id;
	const ownLike = React.useMemo(() => {
		return comment.likes.find(({ user_id }) => user_id === session?.user.id);
	}, [comment, session]);

	const bind = useLongPress(() => setSelected((s) => !s), {
		onStart: () => {
			if (selected) {
				setSelected(false);
			}
		},
	});

	const handleLike = () => updateCommentLike();

	const handleDelete = (event: React.MouseEvent) => {
		event.stopPropagation();
		deleteComment();
	};

	return (
		<div
			className={`flex w-full gap-2 px-2 ${selected ? 'bg-blue-900' : ''}`}
			{...bind()}>
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
			{!selected && (
				<div className="flex flex-col items-center">
					<IconButton size="small" onClick={handleLike}>
						<Icon
							className="text-base text-neutral-400"
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
			)}
			{ownComment && selected && (
				<div className="flex flex-col items-center justify-center">
					{deleteCommentLoading ? (
						<CircularProgress className="mr-2" size={24} />
					) : (
						<IconButton
							onClick={handleDelete}
							// Needed to disable bubble up to long press
							onPointerDown={(event) => event.stopPropagation()}>
							<Icon className="text-base text-neutral-400" name="delete" />
						</IconButton>
					)}
				</div>
			)}
		</div>
	);
}
