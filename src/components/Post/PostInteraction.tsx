import { useLike, useLikeUpdate } from "@/api/likes";
import { IconButton } from "@mui/material";
import { Post } from "@prisma/client";
import isEmpty from "lodash/isEmpty";
import Icon from "../Icon";

type PostInteractionProps = {
	post: Post;
}

export default function PostInteraction({ post }: PostInteractionProps) {
	const { data: like } = useLike({ post_id: post.id });
	const { trigger } = useLikeUpdate({ post_id: post.id });

	const handleLike = () => trigger();

	return (
		<div className="w-full flex flex-row">
			<IconButton onClick={handleLike}>
				<Icon name='favorite' fill={!isEmpty(like)} />
			</IconButton>
			<IconButton>
				<Icon name='chat_bubble' />
			</IconButton>
			<IconButton>
				<Icon name='send' />
			</IconButton>
		</div>
	)
}
