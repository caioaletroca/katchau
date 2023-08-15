import toPseudoLocale from '@/lib/intl/utils/toPseudoLocale';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import React from 'react';
import App from './app';
import './globals.css';

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	display: 'swap',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Katchau',
	description: 'Be yourself',
	applicationName: 'yes',
	themeColor: '#FFFFFF',
	manifest: '/manifest.json',
};

export default function RootLayout({
	params: { locale },
	children,
}: {
	params: { locale: string };
	children: React.ReactNode;
}) {
	const loc = toPseudoLocale(locale, 'en');

	return (
		<html lang={loc}>
			<body className={roboto.className}>
				<App>{children}</App>
			</body>
		</html>
	);
}
