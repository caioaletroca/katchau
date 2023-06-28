'use client';

import Header from './Header';
import PageMobile from '@/components/Page/PageMobile';
import BottomNavigation from '@/components/BottomNavigation';

export default function ProfilePage() {
	return (
		<PageMobile>
			<Header />
			<div className="flex-1" />
			<BottomNavigation />
		</PageMobile>
	);
}
