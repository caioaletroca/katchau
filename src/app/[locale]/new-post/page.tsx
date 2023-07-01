"use client";

import FileUpload from "@/components/FileUpload";
import PageMobile from "@/components/Page/PageMobile";
import PageMobileHeader from "@/components/Page/PageMobileHeader";
import useRouter from "@/lib/intl/client'";
import React from "react";
import { useNewPost } from "./NewPostContext";

export default function NewPost() {
	const router = useRouter();
	const { setFormData } = useNewPost();

	const handleBack = () => router.back();

	const handleChange = (files: File[]) => {
		setFormData({ originalFile: files[0] });
		router.push('/new-post/crop');
	}

	return (
		<PageMobile>
			<PageMobileHeader
				title='New Post'
				onBackClick={handleBack}
			/>
			<div className="flex flex-col p-2">
				<FileUpload
					name='file'
					onChange={handleChange}
				/>
			</div>
		</PageMobile>
	)
}
