"use client";

import './globals.css';
import React from 'react';
import { Roboto } from 'next/font/google';
import ThemeRegistry from '@/components/Theme/ThemeRegistry/ThemeRegistry';
import NextAuthProvider from '@/components/Auth/NextAuthProvider';
import LocalizationProvider from '@/lib/intl/components/LocalizationProvider';
import toPseudoLocale from '@/lib/intl/utils/toPseudoLocale';
import ZodSchemaProvider from '@/lib/zod/components/ZodSchemaProvider';

const roboto = Roboto({
	weight: [ "300", "400", "500", "700" ],
	display: "swap",
	subsets: ['latin']
});

export const metadata = {
	title: 'Katchau',
	description: 'Generated by create next app',
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
				<React.Suspense>
					{/* @ts-expect-error Server Component */}
					<LocalizationProvider>
						<ZodSchemaProvider>
							<NextAuthProvider>
								<ThemeRegistry>{children}</ThemeRegistry>
							</NextAuthProvider>
						</ZodSchemaProvider>
					</LocalizationProvider>
				</React.Suspense>
			</body>
		</html>
	);
}
