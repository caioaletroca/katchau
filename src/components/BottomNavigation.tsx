"use client";

import {
	BottomNavigation as MuiBottomNavigation,
	BottomNavigationAction,
} from '@mui/material';
import useRouter from '@/hooks/useRouter';
import usePathname from '@/hooks/usePathname';

const options = ['/', '/new-post', '/profile'];

export default function BottomNavigation() {
	const router = useRouter();
	const pathname = usePathname();

	const currentRouteIndex = options.indexOf(pathname);

	return (
		<MuiBottomNavigation value={currentRouteIndex}>
			<BottomNavigationAction
				onClick={() => router.push('/')}
				icon={<span className="material-symbols-outlined">home</span>}
			/>
			<BottomNavigationAction
				onClick={() => router.push('/new-post')}
				icon={<span className="material-symbols-outlined">add_box</span>}
			/>
			<BottomNavigationAction
				onClick={() => router.push('/profile')}
				icon={<span className="material-symbols-outlined">person</span>}
			/>
		</MuiBottomNavigation>
	);
}
