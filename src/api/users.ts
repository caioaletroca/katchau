import {
	getFetcher,
	getKeyCursorPagination,
	PaginationResponse,
	postFetcher,
	RequestSWRParams,
} from '@/lib/fetcher';
import { UserWithProfilePicture } from '@/types/users';
import { User } from '@prisma/client';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import useSWRMutation from 'swr/mutation';

export function useUser({ user_id }: RequestSWRParams) {
	return useSWR<User>(user_id ? `/users/${user_id}` : null, getFetcher);
}

type UserSearchParams = {
	name?: string;
	limit?: number;
};

export function useUserSearch(searchParams: UserSearchParams) {
	return useSWRInfinite<PaginationResponse<UserWithProfilePicture>>(
		getKeyCursorPagination('/users', searchParams),
		getFetcher
	);
}

export function useCheckUsername() {
	return useSWRMutation('/users/username', postFetcher);
}
