import {
	deleteFetcher,
	getFetcher,
	getKeyCursorPagination,
	PaginationResponse,
	postFetcher,
	RequestSWROptions,
	RequestSWRParams,
} from '@/lib/fetcher';
import { NotificationWithActor } from '@/types/notifications';
import { CursorPaginationSearchParams } from '@/utils/searchParams/types';
import useSWRInfinite from 'swr/infinite';
import useSWRMutation from 'swr/mutation';

type NotificationSearchParams = CursorPaginationSearchParams & {
	visualized?: boolean;
};

export function useNotifications(
	searchParams?: NotificationSearchParams,
	options?: RequestSWROptions
) {
	return useSWRInfinite<PaginationResponse<NotificationWithActor>>(
		getKeyCursorPagination('/auth/profile/notifications', searchParams),
		getFetcher,
		options
	);
}

export function useClearNotifications() {
	return useSWRMutation('/auth/profile/notifications', postFetcher);
}

export function useDeleteNotification(
	{ notification_id }: RequestSWRParams,
	options?: RequestSWROptions
) {
	return useSWRMutation(
		`/auth/profile/notifications/${notification_id}`,
		deleteFetcher,
		options
	);
}
