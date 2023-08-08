'use client';

import { useRouter, useUnlocalizedPathname } from '@/lib/intl/client';
import { isMobile } from 'react-device-detect';
import { RegisterProvider } from './RegisterProvider';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = useUnlocalizedPathname();

	if (isMobile && !pathname.startsWith('/register/mobile')) {
		router.push(pathname.replace('/register', '/register/mobile'));
	}

	return <RegisterProvider>{children}</RegisterProvider>;
}
