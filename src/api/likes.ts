import { PostLike } from '@prisma/client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { postFetcher, RequestSWRParams } from '.';

export function usePostLike({ post_id }: RequestSWRParams) {
	return useSWR<PostLike>(`/posts/${post_id}/likes`, postFetcher);
}

export function useUpdatePostLike({ post_id }: RequestSWRParams) {
	return useSWRMutation<PostLike>(`/posts/${post_id}/likes`, postFetcher);
}

export function useUpdateCommentLike({ comment_id }: RequestSWRParams) {
	return useSWRMutation<PostLike>(`/comments/${comment_id}/likes`, postFetcher);
}
