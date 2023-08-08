'use client';

import { default as Page } from '@/components/Register/Mobile/ProfilePicturePage';
import { useSession } from 'next-auth/react';

export default function RegisterProfilePictureMobilePage() {
	const { data: session } = useSession();

	return <Page name={session?.user.name!} />;
}
