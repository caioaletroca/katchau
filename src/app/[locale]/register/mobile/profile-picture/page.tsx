'use client';

import { useProfileImage, useUploadProfileImage } from '@/api/profileImage';
import PageMobile from '@/components/Page/PageMobile';
import ProfilePictureUpload from '@/components/ProfilePictureUpload';
import {
	RegisterMobileContent,
	RegisterMobileContentWrapper,
} from '@/components/Register/Mobile/RegisterMobileContent';
import RegisterMobileHeader from '@/components/Register/Mobile/RegisterMobileHeader';
import RegisterMobileTitle from '@/components/Register/Mobile/RegisterMobileTitle';
import useDownloadFile from '@/hooks/useDownloadFile';
import { useRouter } from '@/lib/intl/client';
import getStoragePath from '@/utils/storage/getStoragePath';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import { useRegister } from '../../RegisterProvider';

export default function RegisterProfilePictureMobilePage() {
	const intl = useIntl();
	const router = useRouter();
	const { data: profileImage, isLoading } = useProfileImage();
	const [fileName, setFileName] = React.useState<string>();
	const [file, setFile] = React.useState<File>();
	const currentFile = useDownloadFile(
		getStoragePath('profiles', profileImage?.url!)
	);
	const { trigger, isMutating } = useUploadProfileImage({
		onSuccess: () => {
			router.push('/profile');
		},
	});

	const { formData } = useRegister();

	const handleChange = (fileName: string, file: File) => {
		setFileName(fileName);
		setFile(file);
	};

	const handleSave = () => {
		trigger({
			fileName,
			image: file,
		});
	};

	const handleSkip = () => router.push('/profile');

	return (
		<PageMobile>
			<RegisterMobileHeader />
			<RegisterMobileContentWrapper>
				<RegisterMobileContent>
					<RegisterMobileTitle
						title={intl.formatMessage({
							id: 'register.profilePictureTitle',
							defaultMessage: 'Add a profile picture',
						})}
						subtitle={intl.formatMessage({
							id: 'register.profilePictureSubtitle',
							defaultMessage:
								"Add a profile picture so that your friends know it's you. Everyone will be able to see your picture.",
						})}
					/>
					{!isLoading && (
						<ProfilePictureUpload
							name={formData.name!}
							current={currentFile}
							onChange={handleChange}
						/>
					)}
				</RegisterMobileContent>
				<div className="flex flex-col gap-4">
					{file && (
						<LoadingButton
							variant="contained"
							loading={isMutating}
							onClick={handleSave}>
							{intl.formatMessage({
								id: 'common.save',
								defaultMessage: 'Save',
							})}
						</LoadingButton>
					)}
					<Button variant="outlined" disabled={isMutating} onClick={handleSkip}>
						{intl.formatMessage({
							id: 'common.skip',
							defaultMessage: 'Skip',
						})}
					</Button>
				</div>
			</RegisterMobileContentWrapper>
		</PageMobile>
	);
}
