import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getFetcher, postFetcher, RequestSWROptions } from '.';

export function useFollow({ user_id }: { user_id: string }) {
	return useSWR(`/users/${user_id}/follows`, getFetcher);
}

export function useUpdateFollow(
	{ user_id }: { user_id: string },
	options?: RequestSWROptions
) {
	return useSWRMutation(`/users/${user_id}/follows`, postFetcher, options);
}
