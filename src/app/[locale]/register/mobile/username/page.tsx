'use client';

import {
	default as Page,
	RegisterUsernameFormData,
} from '@/components/Register/Mobile/UsernamePage';
import { useRegister } from '../../RegisterProvider';

export default function RegisterUsernameMobilePage() {
	const { setFormData, handleNext } = useRegister();

	const handleSubmit = (values: RegisterUsernameFormData) => {
		setFormData(values);
		handleNext();
	};

	return <Page onSubmit={handleSubmit} />;
}
