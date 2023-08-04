import { PostWithImage } from '@/types/posts';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { deleteFetcher, getFetcher } from '.';

export function usePost({
	user_id,
	post_id,
}: {
	user_id: string;
	post_id: string;
}) {
	return useSWR<PostWithImage>(
		`/users/${user_id}/posts/${post_id}`,
		getFetcher
	);
}

export function usePosts({ user_id }: { user_id: string }) {
	return useSWR<PostWithImage[]>(`/users/${user_id}/posts`, getFetcher);
}

export function useDeletePost(
	{ user_id, post_id }: { user_id: string; post_id: string },
	options?: any
) {
	return useSWRMutation(
		`/users/${user_id}/posts/${post_id}`,
		deleteFetcher,
		options
	);
}
