import { FeedPost } from '@/types/feed';
import useSWRInfinite from 'swr/infinite';
import { getFetcher, RequestSWROptions } from '.';

type FeedResponse = {
	data: FeedPost[];
	nextCursor: string;
};

function getKeyCursorPagination(index: number, previousPageData: FeedResponse) {
	if (previousPageData && !previousPageData.data) {
		return null;
	}

	if (index === 0) {
		return `/feed`;
	}

	return `/feed?cursor=${previousPageData.nextCursor}`;
}

export function useFeed(options?: RequestSWROptions) {
	return useSWRInfinite<FeedResponse>(
		getKeyCursorPagination,
		getFetcher,
		options
	);
}
