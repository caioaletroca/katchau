'use client';

import {
	default as Page,
	RegisterBirthFormData,
} from '@/components/Register/Mobile/BirthPage';
import { useIntl } from 'react-intl';
import { useRegister } from '../../RegisterProvider';

export default function RegisterBirthMobilePage() {
	const intl = useIntl();
	const { setFormData, handleNext } = useRegister();

	const handleSubmit = (values: RegisterBirthFormData) => {
		setFormData(values);
		handleNext();
	};

	return <Page onSubmit={handleSubmit} />;
}
