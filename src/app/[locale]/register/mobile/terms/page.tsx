'use client';

import { default as Page } from '@/components/Register/Mobile/TermsPage';
import { useRegister } from '../../RegisterProvider';

export default function RegisterTermsMobilePage() {
	const { handleRegister, isRegistering } = useRegister();

	return <Page loading={isRegistering} onSubmit={handleRegister} />;
}
