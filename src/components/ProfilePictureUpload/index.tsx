import useFileURL from '@/hooks/useFileURL';
import { useUIAvatar } from '@/hooks/useUIAvatar';
import { Button } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { DropEvent, useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';
import ProfilePictureEditDrawer from './ProfilePictureEditDrawer';

type ProfilePictureAvatarProps = {
	src: string;
	onClick: React.MouseEventHandler;
};

function ProfilePictureAvatar({ src, onClick }: ProfilePictureAvatarProps) {
	const intl = useIntl();

	return (
		<div
			className="flex flex-col items-center justify-center rounded-full border p-1"
			onClick={onClick}>
			<div className="relative flex h-32 w-32 flex-col overflow-hidden rounded-full">
				<Image
					alt={intl.formatMessage({
						id: 'profilePicture.alt',
						defaultMessage: 'Current selected profile picture',
					})}
					width={128}
					height={128}
					src={src}
				/>
			</div>
		</div>
	);
}

type ProfilePictureUploadProps = {
	name: string;
	current?: File;
	onChange?: (fileName: string, file: File) => void;
};

export default function ProfilePictureUpload({
	name,
	current,
	onChange,
}: ProfilePictureUploadProps) {
	const intl = useIntl();
	const [open, setOpen] = React.useState(false);
	const [fileName, setFileName] = React.useState<string>();
	const [file, setFile] = React.useState<File>();
	const [cropped, setCropped] = React.useState<File>();
	const defaultUrl = useUIAvatar({ name });
	const currentImageUrl = useFileURL(current);
	const croppedImageUrl = useFileURL(cropped);

	const handleCropped = (file: File) => {
		setCropped(file);
		onChange?.(fileName!, file);
	};

	const handleDropAccepted = (
		acceptedFiles: File[],
		nativeEvent: DropEvent
	) => {
		setFile(acceptedFiles[0]);
		setFileName(acceptedFiles[0].name);
		setOpen(true);
	};

	const {
		getRootProps,
		getInputProps,
		open: openFileInput,
	} = useDropzone({
		onDropAccepted: handleDropAccepted,
		noClick: true,
	});

	return (
		<div {...getRootProps()}>
			<input type="file" accept="image/*" {...getInputProps()} />
			{
				// UI Avatar
				!file && defaultUrl && !current && (
					<div className="flex justify-center">
						<ProfilePictureAvatar src={defaultUrl} onClick={openFileInput} />
					</div>
				)
			}
			{
				// Current profile picture
				!file && currentImageUrl && (
					<div className="flex flex-col gap-4">
						<div className="flex justify-center">
							<ProfilePictureAvatar
								src={currentImageUrl}
								onClick={openFileInput}
							/>
						</div>
						<Button
							variant="outlined"
							onClick={() => setOpen(true)}
							sx={{
								margin: 'auto',
							}}>
							{intl.formatMessage({
								id: 'common.edit',
								defaultMessage: 'Edit',
							})}
						</Button>
					</div>
				)
			}
			{
				// Uploaded and Cropped image
				file && cropped && (
					<div className="flex flex-col gap-4">
						<div className="flex justify-center">
							<ProfilePictureAvatar
								src={croppedImageUrl}
								onClick={openFileInput}
							/>
						</div>
						<Button
							variant="outlined"
							onClick={() => setOpen(true)}
							sx={{
								margin: 'auto',
							}}>
							{intl.formatMessage({
								id: 'common.edit',
								defaultMessage: 'Edit',
							})}
						</Button>
					</div>
				)
			}
			<ProfilePictureEditDrawer
				open={open}
				file={file}
				onCropped={handleCropped}
				onClose={() => setOpen(false)}
			/>
		</div>
	);
}
