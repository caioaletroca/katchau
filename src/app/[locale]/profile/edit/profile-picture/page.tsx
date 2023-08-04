'use client';

import { useProfileImage, useUploadProfileImage } from '@/api/profileImage';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import ProfilePictureUpload from '@/components/ProfilePictureUpload';
import useDownloadFile from '@/hooks/useDownloadFile';
import { useRouter } from '@/lib/intl/client';
import getStoragePath from '@/utils/storage/getStoragePath';
import { Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useIntl } from 'react-intl';

export default function ProfileEditPicture() {
	const intl = useIntl();
	const router = useRouter();
	const { data: session } = useSession();
	const { data: profileImage, isLoading: profileImageLoading } =
		useProfileImage();
	const currentFile = useDownloadFile(
		getStoragePath('profiles', profileImage?.url!)
	);
	const [payload, setPayload] = React.useState<{
		fileName: string;
		file: File;
	}>();
	const { trigger, isMutating } = useUploadProfileImage({
		onSuccess: () => router.push('/profile/edit'),
	});

	const handleChange = (fileName: string, file: File) =>
		setPayload({ fileName, file });

	const handleSave = () =>
		trigger({
			fileName: payload?.fileName,
			image: payload?.file,
		});

	if (profileImageLoading) {
		return null;
	}

	return (
		<PageMobile>
			<PageMobileHeader
				loading={isMutating}
				disabled={isMutating}
				onCancel={() => router.back()}
				confirmLabel={intl.formatMessage({
					id: 'common.save',
					defaultMessage: 'Save',
				})}
				onConfirm={handleSave}
			/>
			<div className="flex h-full flex-col p-4">
				<div className="mb-4 flex flex-col gap-2">
					<Typography variant="h5">
						{intl.formatMessage({
							id: 'profile.edit.profilePicture.title',
							defaultMessage: 'New profile picture',
						})}
					</Typography>
					<Typography variant="caption">
						{intl.formatMessage({
							id: 'profile.edit.profilePicture.subtitle',
							defaultMessage: 'Click below to upload a new profile picture.',
						})}
					</Typography>
				</div>
				<div className="mt-20 flex flex-col justify-center">
					<ProfilePictureUpload
						name={session?.user.name!}
						current={currentFile}
						onChange={handleChange}
					/>
				</div>
			</div>
		</PageMobile>
	);
}
