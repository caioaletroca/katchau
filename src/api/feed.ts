import {
	getFetcher,
	getKeyCursorPagination,
	PaginationResponse,
	RequestSWROptions,
} from '@/lib/fetcher';
import { FeedPost } from '@/types/feed';
import useSWRInfinite from 'swr/infinite';

export function useFeed(options?: RequestSWROptions) {
	return useSWRInfinite<PaginationResponse<FeedPost>>(
		getKeyCursorPagination('/feed'),
		getFetcher,
		options
	);
}
