import {
	getFetcher,
	getKeyCursorPagination,
	PaginationResponse,
	postFetcher,
	RequestSWROptions,
} from '@/lib/fetcher';
import { Message } from '@prisma/client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import useSWRInfinite from 'swr/infinite';
import useSWRMutation from 'swr/mutation';

export function useMessages({ user_id }: { user_id: string }) {
	const supabase = createClientComponentClient();
	const [messages, setMessages] = React.useState<Message[]>([]);
	const {
		data: serverMessages,
		size,
		setSize,
		isLoading,
	} = useSWRInfinite<PaginationResponse<Message>>(
		getKeyCursorPagination(`/chat/${user_id}`, { limit: 20 }),
		getFetcher
	);

	React.useEffect(() => {
		if (serverMessages?.length) {
			setMessages(serverMessages?.map((f) => f.data).flat());
		}
	}, [serverMessages]);

	React.useEffect(() => {
		const channel = supabase
			.channel('messages')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'messages',
				},
				(payload) => {
					if (!isEmpty(payload.new)) {
						setMessages([...messages, payload.new as Message]);
					}
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase, messages]);

	const handleFetchMore = () => {
		if (isLoading) {
			return;
		}

		setSize(size + 1);
	};

	return {
		fetchMore: handleFetchMore,
		messages,
	};
}

export function useCreateMessage(options?: RequestSWROptions) {
	return useSWRMutation('/chat', postFetcher, options);
}
