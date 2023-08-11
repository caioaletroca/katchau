import { RequestSWROptions, getFetcher, postFetcher } from '@/lib/fetcher';
import { FollowedWithUser, FollowingWithUser } from '@/types/follows';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export function useFollows({ user_id }: { user_id: string }) {
	return useSWR<{
		followeds: FollowedWithUser[];
		followings: FollowingWithUser[];
	}>(`/users/${user_id}/follows`, getFetcher);
}

export function useUpdateFollow(
	{ user_id }: { user_id: string },
	options?: RequestSWROptions
) {
	return useSWRMutation(`/users/${user_id}/follows`, postFetcher, options);
}
