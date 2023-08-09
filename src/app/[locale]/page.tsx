'use client';

import BottomNavigation from '@/components/BottomNavigation';
import Image from 'next/image';
import { useIntl } from 'react-intl';

function HomeHeader() {
	const intl = useIntl();

	return (
		<div className="flex flex-row">
			<div className="relative flex h-14 w-28">
				<Image
					alt={intl.formatMessage({
						id: 'home.logoAlt',
						defaultMessage: 'Katchau home logo',
					})}
					fill
					src="/text-inverted.svg"
				/>
			</div>
		</div>
	);
}

export default function Home() {
	const intl = useIntl();

	return (
		<div className="flex h-full flex-col">
			<HomeHeader />
			<div className="flex flex-1"></div>
			<BottomNavigation />
		</div>
	);
}
