'use client';

import {
	default as Page,
	RegisterUsernameFormData,
} from '@/components/Register/Mobile/UsernamePage';
import { useRegisterComplete } from '../../RegisterCompleteProvider';

export default function RegisterUsernameMobilePage() {
	const { setFormData, handleNext } = useRegisterComplete();

	const handleSubmit = (values: RegisterUsernameFormData) => {
		setFormData(values);
		handleNext();
	};

	return <Page onSubmit={handleSubmit} />;
}
