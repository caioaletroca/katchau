import { PostLike } from '@prisma/client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
	getFetcher,
	postFetcher,
	RequestSWROptions,
	RequestSWRParams,
} from '.';

export function usePostLike({ post_id }: RequestSWRParams) {
	return useSWR<PostLike>(`/posts/${post_id}/likes`, getFetcher);
}

export function useUpdatePostLike(
	{ post_id }: RequestSWRParams,
	options?: RequestSWROptions
) {
	return useSWRMutation<PostLike>(
		`/posts/${post_id}/likes`,
		postFetcher,
		options
	);
}

export function useUpdateCommentLike(
	{ comment_id }: RequestSWRParams,
	options?: RequestSWROptions
) {
	return useSWRMutation<PostLike>(
		`/comments/${comment_id}/likes`,
		postFetcher,
		options
	);
}
