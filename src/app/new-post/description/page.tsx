"use client";

import Image from 'next/image';
import PageMobile from "@/components/Page/PageMobile";
import PageMobileHeader from "@/components/Page/PageMobileHeader";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useNewPost } from "../NewPostContext";

export default function NewPostDescription() {
	const router = useRouter();
	const { formData, setFormData } = useNewPost();
	const [description, setDescription] = React.useState("");

	const imageUrl = React.useMemo(() => {
		return URL.createObjectURL(formData?.file!);
	}, [formData?.file])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);

	const handleBack = () => router.back();

	const handleForward = () => {
		setFormData({ description });
		router.push('/new-post/loading');
	};

	return (
		<PageMobile>
			<PageMobileHeader
				title='New Post'
				onBackClick={handleBack}
				onForwardClick={handleForward}
			/>
			<div className='relative h-full-w'>
				<Image
					alt=""
					src={imageUrl}
					layout="fill"
				/>
			</div>
			<div className='flex flex-col p-2'>
				<TextField
					name='description'
					value={description}
					onChange={handleChange}
					placeholder="Write a caption..."
					multiline
				/>
			</div>
		</PageMobile>
	)
}
