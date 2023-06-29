import { Button, Typography } from "@mui/material";
import React from "react";
import { useDropzone } from 'react-dropzone'

export default function FileUpload() {
	const [files, setFiles] = React.useState();

	const handleDrop = (files: any) => {
		console.log(files)
	}
	
	const {getRootProps, getInputProps, isDragActive, open } = useDropzone({
		onDrop: handleDrop,
		noClick: true
	})


	return (
		<div
			className="flex flex-col justify-center items-center border-white p-2 py-6 h-60 border-dashed border rounded-lg gap-4"
			{...getRootProps()}>
			<input
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
