'use client';

import {
	default as Page,
	RegisterBirthFormData,
} from '@/components/Register/Mobile/BirthPage';
import { useRegisterComplete } from '../RegisterCompleteProvider';

export default function RegisterBirthMobilePage() {
	const { setFormData, handleNext } = useRegisterComplete();

	const handleSubmit = (values: RegisterBirthFormData) => {
		setFormData(values);
		handleNext();
	};

	return <Page onSubmit={handleSubmit} />;
}
