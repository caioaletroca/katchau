import { ProfileImage } from '@prisma/client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getFetcher, postFormDataFetcher } from '.';

export function useUserProfileImage({ user_id }: { user_id: string }) {
	return useSWR<ProfileImage>(`/users/${user_id}/profile/image`, getFetcher);
}

export function useProfileImage() {
	return useSWR<ProfileImage>('/auth/profile/image', getFetcher);
}

// TODO: revisit this any
export function useUploadProfileImage(options?: any) {
	return useSWRMutation('/auth/profile/image', postFormDataFetcher, options);
}
