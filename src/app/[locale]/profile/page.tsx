"use client";

import React from 'react';
import Header from './Header';
import PageMobile from '@/components/Page/PageMobile';
import BottomNavigation from '@/components/BottomNavigation';
import Content from './Content';
import { useSession } from 'next-auth/react';
import Info from './Info';

export default async function ProfilePage() {
	const { data } = useSession();
	
	return (
		<PageMobile>
			<Header />
			<div className="flex-1">
				{
					data?.user &&
					<>
						<Info user_id={data?.user.id} />
						<Content user_id={data?.user.id} />
					</>
				}
			</div>
			<BottomNavigation />
		</PageMobile>
	);
}
