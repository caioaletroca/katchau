'use client';

import { useMessages } from '@/api/messages';
import { useUser } from '@/api/users';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import { useRouter } from '@/lib/intl/client';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import React from 'react';
import { useIntl } from 'react-intl';
import Divider from './Divider';
import MessageBubble, { MessageBubbleLoading } from './MessageBubble';
import MessageTextField from './MessageTextField';

function UserChatPageLoading() {
	const router = useRouter();
	const { user_id } = useParams();

	const handleBack = () => router.back();

	return (
		<PageMobile>
			<PageMobileHeader onBackClick={handleBack} />
			<div className="flex flex-1 flex-col justify-end">
				<MessageBubbleLoading owner />
				<MessageBubbleLoading />
				<MessageBubbleLoading owner />
				<MessageBubbleLoading />
				<MessageBubbleLoading owner />
			</div>
			<MessageTextField user_id={user_id} />
		</PageMobile>
	);
}

function UserChatPageEmpty() {
	const intl = useIntl();
	const router = useRouter();
	const { user_id } = useParams();

	const handleBack = () => router.back();

	return (
		<PageMobile>
			<PageMobileHeader onBackClick={handleBack} />
			<div className="flex flex-1 flex-col items-center justify-center">
				<Typography className="text-neutral-700">
					{intl.formatMessage({
						id: 'chat.emptyMessage',
						defaultMessage: 'No messages on this conversation',
					})}
				</Typography>
			</div>
			<MessageTextField user_id={user_id} />
		</PageMobile>
	);
}

export default function UserChatPage() {
	const rootRef = React.useRef<HTMLDivElement>(null);
	const router = useRouter();
	const [scrollOnLoad, setScrollOnLoad] = React.useState(false);
	const { user_id } = useParams();
	const { data: user, isLoading: userLoading } = useUser({ user_id });
	const { messages } = useMessages({ user_id });

	const handleBack = () => router.back();

	const scrollBottom = () => {
		const maxScroll =
			rootRef.current?.scrollHeight! - rootRef.current?.clientHeight!;

		rootRef.current?.scrollTo(0, maxScroll);
	};

	if (userLoading) {
		return <UserChatPageLoading />;
	}

	if (messages.length === 0) {
		return <UserChatPageEmpty />;
	}

	function renderMessages() {
		let previousDate: dayjs.Dayjs | null = null;
		let result: React.ReactNode[] = [];

		messages?.map((message) => {
			const date = dayjs(message.created_at);

			// Assign first value into the previousDate
			if (previousDate === null) {
				previousDate = dayjs(message.created_at);

				result.push(
					<Divider
						key={message.created_at.toString()}
						date={message.created_at}
					/>
				);
			}

			// Check if this message has a one day different
			// than the last one
			if (date.isAfter(previousDate, 'day')) {
				// Add divider into DOM
				previousDate = dayjs(message.created_at);

				result.push(
					<Divider
						key={message.created_at.toString()}
						date={message.created_at}
					/>
				);
			}

			result.push(
				<MessageBubble
					key={message.id}
					owner={message.sender_id !== user_id}
					message={message}
				/>
			);
		});

		// Scroll view to the last message
		if (!scrollOnLoad) {
			setScrollOnLoad(true);
			scrollBottom();
		}

		return result;
	}

	return (
		<PageMobile>
			<PageMobileHeader title={user?.username!} onBackClick={handleBack} />
			<div
				ref={rootRef}
				className="mt-auto flex flex-1 flex-col overflow-y-auto">
				{renderMessages()}
			</div>
			<MessageTextField user_id={user_id} onSubmit={scrollBottom} />
		</PageMobile>
	);
}
