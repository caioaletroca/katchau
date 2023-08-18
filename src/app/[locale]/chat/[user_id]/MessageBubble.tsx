'use client';

import { Skeleton, Typography } from '@mui/material';
import { Message } from '@prisma/client';
import classNames from 'classnames';
import dayjs from 'dayjs';

type MessageBubbleLoadingProps = {
	owner?: boolean;
};

export function MessageBubbleLoading({ owner }: MessageBubbleLoadingProps) {
	return (
		<div
			className={classNames('mb-4 flex flex-col px-2', {
				'items-end': owner,
			})}>
			<Skeleton className="h-10 w-2/3 rounded-2xl" variant="rectangular" />
		</div>
	);
}

type MessageBubbleProps = {
	owner?: boolean;
	message: Message;
};

export default function MessageBubble({ owner, message }: MessageBubbleProps) {
	return (
		<div
			data-cy="chat-message"
			className={classNames('mb-4 flex flex-col px-2', {
				'items-end': owner,
			})}>
			<div
				className={classNames('max-w-2/3 flex w-fit flex-col rounded-2xl p-2', {
					'bg-neutral-500': !owner,
					'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500': owner,
				})}>
				<Typography variant="body2">{message.content}</Typography>
				<Typography variant="caption" align={owner ? 'right' : 'left'}>
					{dayjs(message.created_at).format('LT')}
				</Typography>
			</div>
		</div>
	);
}
