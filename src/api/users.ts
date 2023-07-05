import { useLazySWR } from '@/hooks/useLazySWR';
import { User } from '@prisma/client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getFetcher, postFetcher } from '.';

export function useUser({ user_id }: { user_id: string }) {
	return useSWR<User>(`/users/${user_id}`, getFetcher);
}

export function useUserSearch() {
	return useLazySWR<User[]>(getFetcher);
}

export function useCheckUsername() {
	return useSWRMutation('/users/username', postFetcher);
}
