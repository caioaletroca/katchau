import cropImage from '@/utils/image/crop';
import clamp from 'lodash/clamp';
import React from 'react';
import { Area, Point } from 'react-easy-crop';
import useFileURL from './useFileURL';

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const STEP = MIN_ZOOM / MAX_ZOOM / 100;

type UseCropImageProps = {
	file?: File;
	minZoom?: number;
	maxZoom?: number;
	step?: number;
	onChange?: (file: File) => void;
};

export default function useCropImage({
	file,
	minZoom = MIN_ZOOM,
	maxZoom = MAX_ZOOM,
	step = STEP,
	onChange,
}: UseCropImageProps) {
	const fileUrl = useFileURL(file);
	const [croppedFile, setCroppedFile] = React.useState<File>();
	const [cropArea, setCropArea] = React.useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);

	const handleCropComplete = React.useCallback(
		async (croppedArea: Area, croppedAreaPixels: Area) => {
			const newImage = await cropImage(file!, croppedAreaPixels);
			setCroppedFile(newImage as File);
			onChange?.(newImage as File);
		},
		[file, onChange]
	);

	const handleSlideChange = (event: Event, value: number | number[]) => {
		setZoom(clamp(value as number, minZoom, maxZoom));
	};

	const getCropperProps = () => ({
		image: fileUrl,
		zoom,
		minZoom,
		crop: cropArea,
		onCropChange: setCropArea,
		onCropComplete: handleCropComplete,
		onZoomChange: setZoom,
	});

	return {
		fileUrl,
		step,
		minZoom,
		maxZoom,
		croppedFile,
		zoom,
		getCropperProps,
		handleSlideChange,
	};
}
