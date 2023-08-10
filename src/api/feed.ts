import { FeedPost } from '@/types/feed';
import useSWRInfinite from 'swr/infinite';
import {
	getFetcher,
	getKeyCursorPagination,
	PaginationResponse,
	RequestSWROptions,
} from '.';

export function useFeed(options?: RequestSWROptions) {
	return useSWRInfinite<PaginationResponse<FeedPost>>(
		getKeyCursorPagination,
		getFetcher,
		options
	);
}
