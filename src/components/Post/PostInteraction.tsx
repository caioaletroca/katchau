import { usePostLike, useUpdatePostLike } from '@/api/likes';
import { IconButton } from '@mui/material';
import { Post } from '@prisma/client';
import isEmpty from 'lodash/isEmpty';
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
	const { data: like, mutate } = usePostLike({ post_id: post.id });
	const { trigger } = useUpdatePostLike(
		{ post_id: post.id },
		{
			onSuccess: () => mutate(),
		}
	);

	const handleLike = () => trigger();

	return (
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
		</div>
	);
}
