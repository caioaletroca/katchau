import { PostWithImage } from '@/types/posts';
import useSWR from 'swr';
import api from '.';

export function usePosts({ user_id }: { user_id: string }) {
	return useSWR<PostWithImage[]>(
		`/users/${user_id}/posts`,
		async (url) => (await api.get(url)).data
	);
}
