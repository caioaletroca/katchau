import { usePostLike, usePostLikeCount, useUpdatePostLike } from '@/api/likes';
import { IconButton, Typography } from '@mui/material';
import { Post } from '@prisma/client';
import isEmpty from 'lodash/isEmpty';
import { useSession } from 'next-auth/react';
import { useIntl } from 'react-intl';
import Icon from '../Icon';

type PostInteractionProps = {
	post: Post;
	onComment?: () => void;
	onShare?: () => void;
};

export default function PostInteraction({
	post,
	onComment,
	onShare,
}: PostInteractionProps) {
	const intl = useIntl();
	const { data: session } = useSession();
	const { data: like, mutate } = usePostLike({
		post_id: post.id,
	});
	const { data: likeCount } = usePostLikeCount({
		// Only fetch if user owns post
		post_id: post.user_id === session?.user.id ? post.id : undefined,
	});
	const { trigger } = useUpdatePostLike(
		{ post_id: post.id },
		{
			onSuccess: () => mutate(),
		}
	);

	const handleLike = () => trigger();

	return (
		<div className="flex flex-col">
			<div className="flex w-full flex-row">
				<IconButton
					data-cy="post-like"
					data-state={!isEmpty(like)}
					onClick={handleLike}>
					<Icon name="favorite" fill={!isEmpty(like)} />
				</IconButton>
				<IconButton data-cy="post-comment" onClick={onComment}>
					<Icon name="chat_bubble" />
				</IconButton>
				<IconButton onClick={onShare}>
					<Icon name="send" />
				</IconButton>
				{post.user_id === session?.user.id && (
					<div className="ml-auto mr-2 mt-1">
						<Typography className="text-neutral-500" variant="caption">
							{intl.formatMessage(
								{
									id: 'post.likedBy',
									defaultMessage: 'Liked by {number} people',
								},
								{
									number: likeCount?.data.likes,
								}
							)}
						</Typography>
					</div>
				)}
			</div>
		</div>
	);
}
