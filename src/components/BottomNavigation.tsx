'use client';

import { useRouter, useUnlocalizedPathname } from '@/lib/intl/client';
import {
	BottomNavigationAction,
	BottomNavigation as MuiBottomNavigation,
} from '@mui/material';
import Icon from './Icon';

const options = ['/', '/search', '/new-post', '/profile'];

export default function BottomNavigation() {
	const router = useRouter();
	const pathname = useUnlocalizedPathname();

	const currentRouteIndex = options.indexOf(pathname);

	return (
		<MuiBottomNavigation value={currentRouteIndex}>
			<BottomNavigationAction
				data-cy="navigation-home"
				onClick={() => router.push('/')}
				icon={<Icon name="home" />}
			/>
			<BottomNavigationAction
				data-cy="navigation-search"
				onClick={() => router.push('/search')}
				icon={<Icon name="search" />}
			/>
			<BottomNavigationAction
				data-cy="navigation-new-post"
				onClick={() => router.push('/new-post')}
				icon={<Icon name="add_box" />}
			/>
			<BottomNavigationAction
				data-cy="navigation-profile"
				onClick={() => router.push('/profile')}
				icon={<Icon name="person" />}
			/>
		</MuiBottomNavigation>
	);
}
