"use client";

import {
	BottomNavigation as MuiBottomNavigation,
	BottomNavigationAction,
} from '@mui/material';
import { useRouter, useUnlocalizedPathname } from '@/lib/intl/client';
import Icon from './Icon';

const options = ['/', '/search', '/new-post', '/profile'];

export default function BottomNavigation() {
	const router = useRouter();
	const pathname = useUnlocalizedPathname();

	const currentRouteIndex = options.indexOf(pathname);

	return (
		<MuiBottomNavigation value={currentRouteIndex}>
			<BottomNavigationAction
				onClick={() => router.push('/')}
				icon={<Icon name='home' />}
			/>
			<BottomNavigationAction
				onClick={() => router.push('/search')}
				icon={<Icon name='search' />}
			/>
			<BottomNavigationAction
				onClick={() => router.push('/new-post')}
				icon={<Icon name='add_box' />}
			/>
			<BottomNavigationAction
				onClick={() => router.push('/profile')}
				icon={<Icon name='person' />}
			/>
		</MuiBottomNavigation>
	);
}
