"use client";

import FileUpload from "@/components/FileUpload";
import PageMobile from "@/components/Page/PageMobile";
import PageMobileHeader from "@/components/Page/PageMobileHeader";

export default function NewPost() {
	return (
		<PageMobile>
			<PageMobileHeader backButton title='New Post' />
			<div className="flex flex-col p-2">
				<FileUpload />
			</div>
		</PageMobile>
	)
}
