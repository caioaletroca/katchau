'use client';

import NextAuthProvider from '@/components/Auth/NextAuthProvider';
import ThemeRegistry from '@/components/Theme/ThemeRegistry/ThemeRegistry';
import LocalizationProvider from '@/lib/intl/components/LocalizationProvider';
import ZodSchemaProvider from '@/lib/zod/components/ZodSchemaProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';

export default function App({ children }: React.PropsWithChildren) {
	return (
		<React.Suspense>
			<LocalizationProvider>
				<MuiLocalizationProvider dateAdapter={AdapterDayjs}>
					<ZodSchemaProvider>
						<NextAuthProvider>
							<ThemeRegistry>{children}</ThemeRegistry>
						</NextAuthProvider>
					</ZodSchemaProvider>
				</MuiLocalizationProvider>
			</LocalizationProvider>
		</React.Suspense>
	);
}
