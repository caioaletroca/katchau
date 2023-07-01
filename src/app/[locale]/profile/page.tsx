import React from 'react';
import Header from './Header';
import PageMobile from '@/components/Page/PageMobile';
import BottomNavigation from '@/components/BottomNavigation';
import Content from './Content';

export default async function ProfilePage() {
	return (
		<PageMobile>
			<Header />
			<div className="flex-1">
				<React.Suspense>
					{/* @ts-expect-error Server Component */}
					<Content />
				</React.Suspense>
			</div>
			<BottomNavigation />
		</PageMobile>
	);
}
