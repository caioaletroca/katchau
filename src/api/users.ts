import { useLazySWR } from '@/hooks/useLazySWR';
import { getFetcher, postFetcher, RequestSWRParams } from '@/lib/fetcher';
import { UserWithProfilePicture } from '@/types/users';
import { User } from '@prisma/client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export function useUser({ user_id }: RequestSWRParams) {
	return useSWR<User>(user_id ? `/users/${user_id}` : null, getFetcher);
}

export function useUserSearch() {
	return useLazySWR<UserWithProfilePicture[]>(getFetcher);
}

export function useCheckUsername() {
	return useSWRMutation('/users/username', postFetcher);
}
