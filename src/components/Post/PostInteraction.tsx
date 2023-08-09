import { usePostLike, useUpdatePostLike } from '@/api/likes';
import { IconButton } from '@mui/material';
import { Post } from '@prisma/client';
import isEmpty from 'lodash/isEmpty';
import Icon from '../Icon';

type PostInteractionProps = {
	post: Post;
	onComment?: () => void;
};

export default function PostInteraction({
	post,
	onComment,
}: PostInteractionProps) {
	const { data: like } = usePostLike({ post_id: post.id });
	const { trigger } = useUpdatePostLike({ post_id: post.id });

	const handleLike = () => trigger();

	return (
		<div className="flex w-full flex-row">
			<IconButton onClick={handleLike}>
				<Icon name="favorite" fill={!isEmpty(like)} />
			</IconButton>
			<IconButton onClick={onComment}>
				<Icon name="chat_bubble" />
			</IconButton>
			<IconButton>
				<Icon name="send" />
			</IconButton>
		</div>
	);
}
