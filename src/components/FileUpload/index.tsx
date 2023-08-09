'use client';

import { Typography } from '@mui/material';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { DropEvent, useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';

type FileUploadProps = {
	id?: string;
	name?: string;
	onChange?: (files: File[]) => void;
};

export default function FileUpload({ id, name, onChange }: FileUploadProps) {
	const intl = useIntl();
	const [files, setFiles] = React.useState<File[]>();

	const handleDropAccepted = (
		acceptedFiles: File[],
		nativeEvent: DropEvent
	) => {
		setFiles(acceptedFiles);
		onChange?.(acceptedFiles);
	};

	const { getRootProps, getInputProps, open } = useDropzone({
		onDropAccepted: handleDropAccepted,
		noClick: true,
	});

	return (
		<div
			className="flex h-60 w-60 flex-col items-center justify-center gap-4 rounded-full border border-dashed border-neutral-500 p-2 py-6"
			{...getRootProps()}
			onClick={open}>
			<input
				id={id}
				name={name}
				type="file"
				accept="image/*"
				{...getInputProps()}
			/>
			<div className="flex flex-1 flex-col items-center justify-center">
				<Typography className="text-neutral-500">
					{isMobile
						? intl.formatMessage({
								id: 'fileUpload.mobile',
								defaultMessage: 'Tap to select an image',
						  })
						: intl.formatMessage({
								id: 'fileUpload.desktop',
								defaultMessage: 'Click or drap and drop to select an image',
						  })}
				</Typography>
			</div>
		</div>
	);
}
