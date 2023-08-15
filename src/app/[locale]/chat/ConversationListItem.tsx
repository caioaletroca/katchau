'use client';

import Avatar from '@/components/Avatar';
import { useRouter } from '@/lib/intl/client';
import { Conversation } from '@/types/conversations';
import {
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Skeleton,
} from '@mui/material';

export function ConversationLoading() {
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

type ConversationListItemProps = {
	conversation: Conversation;
};

export default function ConversationListItem({
	conversation,
}: ConversationListItemProps) {
	const router = useRouter();

	const handleClick = () => router.push(`/chat/${conversation.sender.id}`);

	return (
		<ListItemButton onClick={handleClick}>
			<ListItemAvatar>
				<Avatar
					name={conversation.sender.name!}
					url={conversation.sender.profile_picture[0]?.url}
					size="small"
				/>
			</ListItemAvatar>
			<ListItemText
				secondaryTypographyProps={{
					className: 'text-ellipsis',
				}}
				primary={conversation.sender.name}
				secondary={conversation.content}
			/>
		</ListItemButton>
	);
}
