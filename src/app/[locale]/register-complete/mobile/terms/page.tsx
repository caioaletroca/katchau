'use client';

import { default as Page } from '@/components/Register/Mobile/TermsPage';
import { useRegisterComplete } from '../../RegisterCompleteProvider';

export default function RegisterTermsMobilePage() {
	const { handleSubmit, isSubmitting } = useRegisterComplete();

	return <Page loading={isSubmitting} onSubmit={handleSubmit} />;
}
