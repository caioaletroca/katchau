'use client';

import { useComments, useCreateComment } from '@/api/comments';
import { useProfileImage } from '@/api/profileImage';
import { useUser } from '@/api/users';
import {
	CircularProgress,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useIntl } from 'react-intl';
import Avatar from '../Avatar';
import Icon from '../Icon';
import PullToRefresh from '../PullToRefresh';
import SwipeableDrawer, { SwipeableDrawerProps } from '../SwipeableDrawer';

type CommentTextFieldProps = {
	user_id: string;
	loading?: boolean;
	onSubmit?: () => void;
};

export function CommentTextField({
	user_id,
	loading,
	onSubmit,
}: CommentTextFieldProps) {
	const intl = useIntl();
	const { data: user } = useUser({ user_id });
	const { data: profilePicture } = useProfileImage();

	return (
		<div className="flex w-full p-2">
			<TextField
				name="comment"
				variant="standard"
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
							{loading ? (
								<CircularProgress size={16} />
							) : (
								<IconButton onClick={onSubmit}>
									<Icon name="send" />
								</IconButton>
							)}
						</InputAdornment>
					),
				}}
				size="small"
				fullWidth
			/>
		</div>
	);
}

type CommentProps = {
	comment: {};
};

export function Comment() {
	return (
		<div className="flex w-full gap-2 px-2">
			<div className="flex py-4">
				<Avatar name="Caio Troti" size="small" />
			</div>
			<div className="flex flex-1 flex-col py-2">
				<div className="flex gap-2">
					<Typography className="text-bold" variant="caption">
						user_name
					</Typography>
					<Typography className="text-neutral-400" variant="caption">
						2 weeks
					</Typography>
				</div>
				<Typography variant="body2">comment</Typography>
			</div>
			<div className="flex flex-col items-center">
				<IconButton size="small">
					<Icon className="text-base text-neutral-400" name="favorite" />
				</IconButton>
				<Typography className="text-neutral-400" variant="caption">
					2
				</Typography>
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
	const { trigger: createComment, isMutating: createCommentLoading } =
		useCreateComment({ post_id });

	console.log(comments);

	const handleSubmit = () => {
		createComment();
	};

	const handleRefresh = () => {
		mutate();
	};

	return (
		<SwipeableDrawer
			anchor="bottom"
			classes={{
				paper: 'h-full rounded-t-xl overflow-hidden',
			}}
			disableDiscovery
			{...others}>
			<PullToRefresh onRefresh={handleRefresh}>
				<Comment />
			</PullToRefresh>
			<CommentTextField
				user_id={session?.user.id!}
				loading={createCommentLoading}
				onSubmit={handleSubmit}
			/>
		</SwipeableDrawer>
	);
}
