'use client';

import { useRouter, useUnlocalizedPathname } from '@/lib/intl/client';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { RegisterCompleteProvider } from './RegisterCompleteProvider';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = useUnlocalizedPathname();

	React.useEffect(() => {
		if (isMobile && !pathname.startsWith('/register-complete/mobile')) {
			router.push(
				pathname.replace('/register-complete', '/register-complete/mobile')
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <RegisterCompleteProvider>{children}</RegisterCompleteProvider>;
}
