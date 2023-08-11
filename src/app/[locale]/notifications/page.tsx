'use client';

import { useClearNotifications, useNotifications } from '@/api/notifications';
import BottomNavigation from '@/components/BottomNavigation';
import Icon from '@/components/Icon';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import PullToRefresh from '@/components/PullToRefresh';
import { useRouter } from '@/lib/intl/client';
import { Typography } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import Notification, { NotificationLoading } from './Notification';

function NotificationPageLoading() {
	const intl = useIntl();
	const router = useRouter();

	const handleBack = () => router.push('/');

	return (
		<PageMobile>
			<PageMobileHeader
				title={intl.formatMessage({
					id: 'notifications.title',
					defaultMessage: 'Notifications',
				})}
				onBackClick={handleBack}
			/>
			<div className="flex flex-1 flex-col">
				{Array(5)
					.fill(0)
					.map((_, index) => (
						<NotificationLoading key={index} />
					))}
			</div>
			<BottomNavigation />
		</PageMobile>
	);
}

function NotificationPageEmpty() {
	const intl = useIntl();
	const router = useRouter();

	const handleBack = () => router.push('/');

	return (
		<PageMobile>
			<PageMobileHeader
				title={intl.formatMessage({
					id: 'notifications.title',
					defaultMessage: 'Notifications',
				})}
				onBackClick={handleBack}
			/>
			<div className="flex flex-1 flex-col items-center justify-center gap-2">
				<Icon className="text-8xl text-neutral-700" name="notifications" />
				<Typography className="mb-2" color="grey" variant="body2">
					{intl.formatMessage({
						id: 'notification.empty',
						defaultMessage: 'No notifications for now',
					})}
				</Typography>
			</div>
			<BottomNavigation />
		</PageMobile>
	);
}

export default function NotificationsPage() {
	const intl = useIntl();
	const router = useRouter();
	const {
		data: notificationsResponse,
		isLoading,
		size,
		setSize,
		mutate,
	} = useNotifications();
	const { trigger } = useClearNotifications();

	React.useEffect(() => {
		trigger();
	}, [trigger]);

	const notifications = notificationsResponse?.map((f) => f.data).flat();

	const handleBack = () => router.push('/');

	const handleFetchMore = () => {
		if (isLoading) {
			return;
		}

		setSize(size + 1);
	};

	const handleDelete = (notification_id: string) => {
		mutate((response) => {
			return response?.map((notifications) => {
				return {
					...notifications,
					data: notifications.data.filter(
						(notification) => notification.id === notification_id
					),
				};
			});
		});
	};

	if ((!notifications || notifications?.length === 0) && isLoading) {
		return <NotificationPageLoading />;
	}

	if (notifications?.length === 0) {
		return <NotificationPageEmpty />;
	}

	return (
		<PageMobile>
			<PageMobileHeader
				title={intl.formatMessage({
					id: 'notifications.title',
					defaultMessage: 'Notifications',
				})}
				onBackClick={handleBack}
			/>
			<PullToRefresh
				onRefresh={() => mutate()}
				loadingFetchMore={isLoading}
				onFetchMore={handleFetchMore}>
				{notifications?.map((notification) => (
					<Notification
						key={notification.id}
						notification={notification}
						onDelete={handleDelete}
					/>
				))}
			</PullToRefresh>
			<BottomNavigation />
		</PageMobile>
	);
}
