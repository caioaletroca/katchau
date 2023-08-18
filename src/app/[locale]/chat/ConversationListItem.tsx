'use client';

import Avatar from '@/components/Avatar';
import Icon from '@/components/Icon';
import { useRouter } from '@/lib/intl/client';
import { Conversation } from '@/types/conversations';
import {
	ListItemAvatar,
	ListItemButton,
	ListItemSecondaryAction,
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

	const ownMessage = Boolean(conversation.sender);
	const user = conversation.user || conversation.sender;

	const handleClick = () => router.push(`/chat/${user.id}`);

	return (
		<ListItemButton onClick={handleClick}>
			<ListItemAvatar>
				<Avatar
					name={user.name!}
					url={user.profile_picture[0]?.url}
					size="small"
				/>
			</ListItemAvatar>
			<ListItemText
				secondaryTypographyProps={{
					className: 'text-ellipsis',
				}}
				primary={user.name}
				secondary={conversation.content}
			/>
			{ownMessage && !conversation.visualized && (
				<ListItemSecondaryAction>
					<Icon className="text-katchau" name="fiber_manual_record" fill />
				</ListItemSecondaryAction>
			)}
		</ListItemButton>
	);
}
