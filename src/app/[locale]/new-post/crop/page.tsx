"use client";

import { Slider } from "@mui/material";
import React from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import clamp from "lodash/clamp";
import { useNewPost } from "../NewPostContext";
import cropImage from "@/utils/image/crop";
import PageMobileHeader from "@/components/Page/PageMobileHeader";
import PageMobile from "@/components/Page/PageMobile";
import { useRouter } from "@/lib/intl/client";

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const STEP = MIN_ZOOM / MAX_ZOOM / 100

export default function NewPostCrop() {
	const router = useRouter();
	const [crop, setCrop] = React.useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);

	const { formData, setFormData } = useNewPost();
	
	const originalImageUrl = React.useMemo(() => {
		return URL.createObjectURL(formData?.originalFile!);
	}, [formData?.originalFile]);

	const handleBack = () => router.back();

	const handleForward = () => router.push('/new-post/description');

	const handleCropComplete = React.useCallback(
    async (croppedArea: Area, croppedAreaPixels: Area) => {
      const newImage = await cropImage(formData?.originalFile!, croppedAreaPixels);
			setFormData({ file: newImage as File });
    },
    [formData?.originalFile, setFormData]
  );

	const handleSlideChange = (event: Event, value: number | number[]) => {
		setZoom(clamp(value as number, MIN_ZOOM, MAX_ZOOM));
	}

	return (
		<PageMobile>
			<PageMobileHeader
				title='New Post'
				onBackClick={handleBack}
				onForwardClick={handleForward}
			/>
			<div className='flex flex-col flex-1'>
				<div className='relative' style={{ height: "100vw" }}>
					<Cropper
						image={originalImageUrl}
						objectFit="vertical-cover"
						restrictPosition
						crop={crop}
						minZoom={1}
						zoom={zoom}
						aspect={1}
						onCropChange={setCrop}
						onCropComplete={handleCropComplete}
						onZoomChange={setZoom}
						style={{
							mediaStyle: {
								maxWidth: "initial"
							}
						}}
					/>
				</div>
				<Slider
					step={STEP}
					min={MIN_ZOOM}
					max={MAX_ZOOM}
					value={zoom}
					onChange={handleSlideChange}
				/>
			</div>
		</PageMobile>
	);
}
