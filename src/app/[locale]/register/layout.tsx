'use client';

import { useRouter, useUnlocalizedPathname } from '@/lib/intl/client';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { RegisterProvider } from './RegisterProvider';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = useUnlocalizedPathname();

	React.useEffect(() => {
		if (isMobile && !pathname.startsWith('/register/mobile')) {
			router.push(pathname.replace('/register', '/register/mobile'));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <RegisterProvider>{children}</RegisterProvider>;
}
