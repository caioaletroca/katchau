import { PostLike } from '@prisma/client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { postFetcher, RequestSWRParams } from '.';

export function usePostLike({ post_id }: RequestSWRParams) {
	return useSWR<PostLike>(`/posts/${post_id}/likes`, postFetcher);
}

export function usePostLikeUpdate({ post_id }: RequestSWRParams) {
	return useSWRMutation<PostLike>(`/posts/${post_id}/likes`, postFetcher);
}
