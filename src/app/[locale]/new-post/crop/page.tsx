'use client';

import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import useCropImage from '@/hooks/useCropImage';
import { useRouter } from '@/lib/intl/client';
import cropImage from '@/utils/image/crop';
import React from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import { useNewPost } from '../NewPostContext';

export default function NewPostCrop() {
	const router = useRouter();
	const [croppedArea, setCroppedArea] = React.useState<Area>({
		width: 0,
		height: 0,
		x: 0,
		y: 0,
	});

	const { formData, setFormData } = useNewPost();

	const handleBack = () => router.back();

	const handleForward = async () => {
		const newImage = await cropImage(formData?.originalFile!, croppedArea);
		setFormData({ file: newImage as File });

		router.push('/new-post/description');
	};

	const handleChange = (croppedArea: Area) => {
		setCroppedArea(croppedArea);
	};

	const { fileUrl, getCropperProps } = useCropImage({
		file: formData?.originalFile,
		onChange: handleChange,
	});

	return (
		<PageMobile>
			<PageMobileHeader
				title="New Post"
				onBackClick={handleBack}
				onForwardClick={handleForward}
			/>
			<div className="flex flex-1 flex-col">
				<div className="relative" style={{ height: '100vw' }}>
					{fileUrl && (
						<Cropper
							objectFit="vertical-cover"
							restrictPosition
							aspect={1}
							style={{
								mediaStyle: {
									maxWidth: 'initial',
								},
							}}
							{...getCropperProps()}
						/>
					)}
				</div>
				{/* <Slider
					step={STEP}
					min={MIN_ZOOM}
					max={MAX_ZOOM}
					value={zoom}
					onChange={handleSlideChange}
				/> */}
			</div>
		</PageMobile>
	);
}
