"use client";

import React from "react";
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone'
import { Button, Typography } from "@mui/material";

type FileUploadProps = {
	id?: string;
	name?: string;
	onChange?: (files: File[]) => void;
}

export default function FileUpload({ id, name, onChange }: FileUploadProps) {
	const [files, setFiles] = React.useState<File[]>();

	const handleDropAccepted = (acceptedFiles: File[], nativeEvent: DropEvent) => {
		setFiles(acceptedFiles);
		onChange?.(acceptedFiles);
	};
	
	const {getRootProps, getInputProps, isDragActive, open } = useDropzone({
		onDropAccepted: handleDropAccepted,
		noClick: true
	});

	return (
		<div
			className="flex flex-col justify-center items-center border-white p-2 py-6 h-60 border-dashed border rounded-lg gap-4"
			{...getRootProps()}
		>
			<input
				id={id}
				name={name}
				type="file"
				accept="image/*"
				{...getInputProps()}
			/>
			<div className='flex flex-col flex-1 items-center justify-center'>
				<Typography>
					Drag and Drop here
				</Typography>
			</div>
			<Button
				variant="outlined"
				onClick={open}>
				Upload image
			</Button>
		</div>
	);
}
