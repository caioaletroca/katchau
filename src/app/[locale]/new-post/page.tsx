'use client';

import FileUpload from '@/components/FileUpload';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import { useRouter } from '@/lib/intl/client';
import { useNewPost } from './NewPostContext';

export default function NewPost() {
	const router = useRouter();
	const { setFormData } = useNewPost();

	const handleBack = () => router.back();

	const handleChange = (files: File[]) => {
		setFormData({ originalFile: files[0] });
		router.push('/new-post/crop');
	};

	return (
		<PageMobile>
			<PageMobileHeader title="New Post" onBackClick={handleBack} />
			<div className="flex h-full flex-col items-center justify-center p-2">
				<FileUpload name="file" onChange={handleChange} />
			</div>
		</PageMobile>
	);
}
