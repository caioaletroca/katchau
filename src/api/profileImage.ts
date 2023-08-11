import {
	deleteFetcher,
	getFetcher,
	postFormDataFetcher,
	RequestSWROptions,
} from '@/lib/fetcher';
import { ProfileImage } from '@prisma/client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export function useUserProfileImage({ user_id }: { user_id: string }) {
	return useSWR<ProfileImage>(`/users/${user_id}/profile/image`, getFetcher);
}

export function useProfileImage() {
	return useSWR<ProfileImage>('/auth/profile/image', getFetcher);
}

export function useUploadProfileImage(options?: RequestSWROptions) {
	return useSWRMutation('/auth/profile/image', postFormDataFetcher, options);
}

export function useDeleteProfileImage(options?: RequestSWROptions) {
	return useSWRMutation('/auth/profile/image', deleteFetcher, options);
}
