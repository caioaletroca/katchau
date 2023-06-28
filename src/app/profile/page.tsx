'use client';

import BottomNavigation from '@/components/BottomNavigation';
import Header from './Header';

export default function ProfilePage() {
	return (
		<div className="flex h-full flex-col">
			<Header />
			<div className="flex-1" />
			<BottomNavigation />
		</div>
	);
}
