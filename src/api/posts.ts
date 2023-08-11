import {
	deleteFetcher,
	getFetcher,
	postFormDataFetcher,
	RequestSWROptions,
	RequestSWRParams,
} from '@/lib/fetcher';
import { PostWithImage } from '@/types/posts';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export function usePost({ user_id, post_id }: RequestSWRParams) {
	return useSWR<PostWithImage>(
		`/users/${user_id}/posts/${post_id}`,
		getFetcher
	);
}

export function usePosts({ user_id }: RequestSWRParams) {
	return useSWR<PostWithImage[]>(`/users/${user_id}/posts`, getFetcher);
}

export function useCreatePost(options?: RequestSWROptions) {
	return useSWRMutation('/posts', postFormDataFetcher, options);
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
