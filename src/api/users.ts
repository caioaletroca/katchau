import { useLazySWR } from '@/hooks/useLazySWR';
import { User } from '@prisma/client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getFetcher, postFetcher, RequestSWRParams } from '.';

export function useUser({ user_id }: RequestSWRParams) {
	return useSWR<User>(`/users/${user_id}`, getFetcher);
}

export function useUserSearch() {
	return useLazySWR<User[]>(getFetcher);
}

export function useCheckUsername() {
	return useSWRMutation('/users/username', postFetcher);
}
