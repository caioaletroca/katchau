import { PostWithImage } from '@/types/posts';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
	deleteFetcher,
	getFetcher,
	RequestSWROptions,
	RequestSWRParams,
} from '.';

export function usePost({ user_id, post_id }: RequestSWRParams) {
	return useSWR<PostWithImage>(
		`/users/${user_id}/posts/${post_id}`,
		getFetcher
	);
}

export function usePosts({ user_id }: RequestSWRParams) {
	return useSWR<PostWithImage[]>(`/users/${user_id}/posts`, getFetcher);
}

export function useDeletePost(
	{ user_id, post_id }: RequestSWRParams,
	options?: RequestSWROptions
) {
	return useSWRMutation(
		`/users/${user_id}/posts/${post_id}`,
		deleteFetcher,
		options
	);
}
