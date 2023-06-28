'use client';

import BottomNavigation from '@/components/BottomNavigation';
import IconButton from '@mui/material/IconButton';

export default function Home() {
	return (
		<div className="flex h-full flex-col">
			<div>
				<p>Logo</p>
				<IconButton>
					<span className="material-symbols-outlined">favorite</span>
				</IconButton>
			</div>
			<div className="flex flex-1" />
			<BottomNavigation />
		</div>
	);
}
