import {
	getFetcher,
	postFetcher,
	RequestSWROptions,
	RequestSWRParams,
	Response,
} from '@/lib/fetcher';
import { PostLike } from '@prisma/client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

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

export function usePostLikeCount({ post_id }: RequestSWRParams) {
	return useSWR<Response<{ likes: number }>>(
		post_id ? `/posts/${post_id}/like-count` : null,
		getFetcher
	);
}
