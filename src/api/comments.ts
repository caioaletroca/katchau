import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
	getFetcher,
	postFetcher,
	RequestSWROptions,
	RequestSWRParams,
} from '.';

export function useComments({ post_id }: RequestSWRParams) {
	return useSWR(`/posts/${post_id}/comments`, getFetcher);
}

export function useCreateComment(
	{ post_id }: RequestSWRParams,
	options?: RequestSWROptions
) {
	return useSWRMutation(`/posts/${post_id}/comments`, postFetcher, options);
}
