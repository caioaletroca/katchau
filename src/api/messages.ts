import {
	getFetcher,
	getKeyCursorPagination,
	PaginationResponse,
	patchFetcher,
	postFetcher,
	RequestSWROptions,
	RequestSWRParams,
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
		error,
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
					console.log(payload);
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
		error,
	};
}

export function useCreateMessage(
	{ user_id }: RequestSWRParams,
	options?: RequestSWROptions
) {
	return useSWRMutation(`/chat/${user_id}`, postFetcher, options);
}

export function useClearMessages({ user_id }: RequestSWRParams) {
	return useSWRMutation(`/chat/${user_id}`, patchFetcher);
}
