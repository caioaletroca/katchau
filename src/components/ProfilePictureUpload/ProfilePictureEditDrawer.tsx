import PageMobileHeader from '@/components/Page/PageMobileHeader';
import useCropImage from '@/hooks/useCropImage';
import { Drawer, Slider } from '@mui/material';
import Cropper from 'react-easy-crop';
import { useIntl } from 'react-intl';

type Props = {
	open?: boolean;
	file?: File;
	onChange?: (file: File) => void;
	onClose?: () => void;
};

export default function ProfilePictureEditDrawer({
	open,
	file,
	onChange,
	onClose,
}: Props) {
	const intl = useIntl();

	const {
		fileUrl,
		zoom,
		step,
		minZoom,
		maxZoom,
		getCropperProps,
		handleSlideChange,
	} = useCropImage({
		file,
		onChange,
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
				onForwardClick={onClose}
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
				<Slider
					step={step}
					min={minZoom}
					max={maxZoom}
					value={zoom}
					onChange={handleSlideChange}
				/>
			</div>
		</Drawer>
	);
}
