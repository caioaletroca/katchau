'use client';

import { default as Page } from '@/components/Register/Mobile/TermsPage';
import { useIntl } from 'react-intl';
import { useRegister } from '../../RegisterProvider';

export default function RegisterTermsMobilePage() {
	const intl = useIntl();
	const { handleRegister, isRegistering } = useRegister();

	return <Page loading={isRegistering} onSubmit={handleRegister} />;
}
