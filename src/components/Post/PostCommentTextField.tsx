'use client';

import { useCreateComment } from '@/api/comments';
import { useProfileImage } from '@/api/profileImage';
import { useUser } from '@/api/users';
import {
	CircularProgress,
	IconButton,
	InputAdornment,
	TextField,
	TextFieldProps,
} from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import Avatar from '../Avatar';
import Icon from '../Icon';

type PostCommentTextFieldProps = TextFieldProps & {
	user_id: string;
	post_id: string;
	loading?: boolean;
	onSubmit?: () => void;
};

export default function PostCommentTextField({
	user_id,
	post_id,
	loading,
	onSubmit,
	...others
}: PostCommentTextFieldProps) {
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
								<CircularProgress size={24} />
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
