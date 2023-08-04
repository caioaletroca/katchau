'use client';

import { useProfileImage, useUploadProfileImage } from '@/api/profileImage';
import PageMobile from '@/components/Page/PageMobile';
import ProfilePictureUpload from '@/components/ProfilePictureUpload';
import { useRouter } from '@/lib/intl/client';
import downloadImage from '@/utils/image/downloadImage';
import getStoragePath from '@/utils/storage/getStoragePath';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import { useRegister } from '../../RegisterProvider';
import { Content, ContentWrapper } from '../Content';
import Header from '../Header';
import Title from '../Title';

export default function RegisterProfilePictureMobilePage() {
	const intl = useIntl();
	const router = useRouter();
	const { data: profileImage, isLoading } = useProfileImage();
	const [currentFile, setCurrentFile] = React.useState<File>();
	const [fileName, setFileName] = React.useState<string>();
	const [file, setFile] = React.useState<File>();
	const { trigger, isMutating } = useUploadProfileImage({
		onSuccess: () => {
			router.push('/profile');
		},
	});

	const { formData } = useRegister();

	React.useEffect(() => {
		(async () => {
			if (profileImage && !currentFile) {
				const file = await downloadImage(
					getStoragePath('profiles', profileImage.url!)
				);
				setCurrentFile(file);
			}
		})();
	}, [profileImage, currentFile]);

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
			<Header />
			<ContentWrapper>
				<Content>
					<Title
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
				</Content>
				<div className="flex flex-col gap-4">
					{file && (
						<LoadingButton
							variant="contained"
							loading={isMutating}
							onClick={handleSave}>
							{intl.formatMessage({
								id: 'commons.save',
								defaultMessage: 'Save',
							})}
						</LoadingButton>
					)}
					<Button variant="outlined" disabled={isMutating} onClick={handleSkip}>
						{intl.formatMessage({
							id: 'commons.skip',
							defaultMessage: 'Skip',
						})}
					</Button>
				</div>
			</ContentWrapper>
		</PageMobile>
	);
}
