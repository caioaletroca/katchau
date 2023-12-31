'use client';

import { default as Page } from '@/components/Register/Mobile/ProfilePicturePage';
import { useRegister } from '../../RegisterProvider';

export default function RegisterProfilePictureMobilePage() {
	const { formData } = useRegister();

	return <Page name={formData.name!} />;
}
