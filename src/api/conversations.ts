import {
	getFetcher,
	getKeyCursorPagination,
	PaginationResponse,
} from '@/lib/fetcher';
import { Conversation } from '@/types/conversations';
import { CursorPaginationSearchParams } from '@/utils/searchParams/types';
import useSWRInfinite from 'swr/infinite';

type ConversationSearchParams = CursorPaginationSearchParams & {
	name?: string;
	visualized?: boolean;
};

export function useConversation(params?: ConversationSearchParams) {
	return useSWRInfinite<PaginationResponse<Conversation>>(
		getKeyCursorPagination('/chat', params),
		getFetcher
	);
}
