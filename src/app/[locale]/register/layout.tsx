"use client";

import { usePathname, useRouter } from '@/lib/intl/client';
import { isMobile } from 'react-device-detect';
import { RegisterProvider } from './RegisterProvider';

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const router = useRouter();
	const pathname = usePathname();

	if(isMobile && !pathname.startsWith('/register/mobile')) {
		router.push('/register/mobile');
	}

	return (
		<RegisterProvider>
			{children}
		</RegisterProvider>
	);
}
