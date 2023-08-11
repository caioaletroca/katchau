import {
	deleteFetcher,
	getFetcher,
	postFetcher,
	RequestSWROptions,
	RequestSWRParams,
} from '@/lib/fetcher';
import { CommentWithUserAndLike } from '@/types/comments';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export function useComment({ comment_id }: RequestSWRParams) {
	return useSWR<CommentWithUserAndLike>(`/comments/${comment_id}`, getFetcher);
}

export function useComments({ post_id }: RequestSWRParams) {
	return useSWR<CommentWithUserAndLike[]>(
		`/posts/${post_id}/comments`,
		getFetcher
	);
}

export function useCreateComment(
	{ post_id }: RequestSWRParams,
	options?: RequestSWROptions
) {
	return useSWRMutation(`/posts/${post_id}/comments`, postFetcher, options);
}

export function useDeleteComment(
	{ comment_id }: RequestSWRParams,
	options?: RequestSWROptions
) {
	return useSWRMutation(`/comments/${comment_id}`, deleteFetcher, options);
}
