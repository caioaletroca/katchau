import PageMobileHeader from '@/components/Page/PageMobileHeader';
import useCropImage from '@/hooks/useCropImage';
import cropImage from '@/utils/image/crop';
import { Drawer } from '@mui/material';
import React from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { useIntl } from 'react-intl';

type Props = {
	open?: boolean;
	file?: File;
	onChange?: (croppedArea: Area) => void;
	onCropped?: (file: File) => void;
	onClose?: () => void;
};

export default function ProfilePictureEditDrawer({
	open,
	file,
	onChange,
	onCropped,
	onClose,
}: Props) {
	const intl = useIntl();
	const [croppedArea, setCroppedArea] = React.useState<Area>({
		width: 0,
		height: 0,
		x: 0,
		y: 0,
	});

	const handleChange = (croppedArea: Area) => {
		setCroppedArea(croppedArea);
		onChange?.(croppedArea);
	};

	const handleForward = async () => {
		const newImage = await cropImage(file!, croppedArea);
		onCropped?.(newImage as File);
		onClose?.();
	};

	const { fileUrl, getCropperProps } = useCropImage({
		file,
		onChange: handleChange,
	});

	return (
		<Drawer
			variant="persistent"
			anchor="bottom"
			open={open}
			onClose={onClose}
			PaperProps={{
				sx: {
					height: '100%',
				},
			}}>
			<PageMobileHeader
				title={intl.formatMessage({
					id: 'profilePicture.drawerTitle',
					defaultMessage: 'Edit profile picture',
				})}
				onBackClick={onClose}
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
					step={step}
					min={minZoom}
					max={maxZoom}
					value={zoom}
					onChange={handleSlideChange}
				/> */}
			</div>
		</Drawer>
	);
}
