'use client';

import { useFollows, useUpdateFollow } from '@/api/follows';
import { useDeleteNotification } from '@/api/notifications';
import Avatar from '@/components/Avatar';
import Icon from '@/components/Icon';
import { useRouter } from '@/lib/intl/client';
import {
	NotificationEvent,
	NotificationWithActor,
} from '@/types/notifications';
import { LoadingButton } from '@mui/lab';
import {
	Button,
	CircularProgress,
	IconButton,
	Skeleton,
	Typography,
} from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { useIntl } from 'react-intl';

export function NotificationLoading() {
	return (
		<div className="flex flex-row gap-2 px-2">
			<div className="flex py-4">
				<Skeleton variant="circular" width={32} height={32} />
			</div>
			<div className="flex flex-1 items-center">
				<Skeleton className="flex flex-1" variant="rectangular" height={16} />
			</div>
		</div>
	);
}

type NotificationProps = {
	notification: NotificationWithActor;
	onDelete?: (notification_id: string) => void;
};

export default function Notification({
	notification,
	onDelete,
}: NotificationProps) {
	const intl = useIntl();
	const router = useRouter();
	const {
		data: follows,
		isLoading,
		mutate,
	} = useFollows({ user_id: notification.actor.id });
	const { trigger: updateFollow, isMutating: updateFollowLoading } =
		useUpdateFollow(
			{ user_id: notification.actor.id },
			{
				onSuccess: () => mutate(),
			}
		);
	const { trigger: deleteNotification, isMutating: deleteNotificationLoading } =
		useDeleteNotification(
			{
				notification_id: notification.id,
			},
			{
				onSuccess: () => onDelete?.(notification.id),
			}
		);

	const generateMessage = (event: NotificationEvent, username: string) => {
		if (event === 'followed') {
			return intl.formatMessage(
				{
					id: 'notification.followedMessage',
					defaultMessage: '<bold>{username}</bold> started following you',
				},
				{
					username,
					bold: (str: React.ReactNode) => <b>{str}</b>,
				}
			);
		}

		if (event === 'liked_post') {
			return intl.formatMessage(
				{
					id: 'notification.likedPostMessage',
					defaultMessage: '<bold>{username}</bold> liked your post',
				},
				{
					username,
					bold: (str: React.ReactNode) => <b>{str}</b>,
				}
			);
		}

		if (event === 'liked_comment') {
			return intl.formatMessage(
				{
					id: 'notification.likedCommentMessage',
					defaultMessage:
						'<bold>{username}</bold> liked your comment on a post',
				},
				{
					username,
					bold: (str: React.ReactNode) => <b>{str}</b>,
				}
			);
		}

		if (event === 'commented') {
			return intl.formatMessage(
				{
					id: 'notification.commentedMessage',
					defaultMessage: '<bold>{username}</bold> commented on your post',
				},
				{
					username,
					bold: (str: React.ReactNode) => <b>{str}</b>,
				}
			);
		}

		return '';
	};

	const handleDelete = (event: React.MouseEvent) => {
		event.stopPropagation();
		deleteNotification();
	};

	const handleFollow = (event: React.MouseEvent) => {
		event.stopPropagation();
		updateFollow();
	};

	const handleClick = () => router.push(notification.url);

	return (
		<div className="flex flex-row gap-2 px-2" onClick={handleClick}>
			<div className="flex py-4">
				<Avatar
					name={notification.actor.name!}
					url={notification.actor.profile_picture?.[0]?.url}
					size="small"
				/>
			</div>
			<div className="flex flex-1 items-center">
				<Typography variant="body2">
					{generateMessage(
						notification.event as NotificationEvent,
						notification.actor.username!
					)}
				</Typography>
			</div>
			{notification.event === 'followed' && !isEmpty(follows) && (
				<div className="flex items-center">
					<LoadingButton
						loading={updateFollowLoading}
						variant="contained"
						size="small"
						onClick={handleFollow}>
						{intl.formatMessage({
							id: 'common.follow',
							defaultMessage: 'Follow',
						})}
					</LoadingButton>
				</div>
			)}
			{notification.event === 'followed' && isEmpty(follows) && (
				<div className="flex items-center">
					<Button
						disabled
						variant="contained"
						size="small"
						onClick={handleFollow}>
						{intl.formatMessage({
							id: 'common.followed',
							defaultMessage: 'Followed',
						})}
					</Button>
				</div>
			)}
			{!deleteNotificationLoading && (
				<div className="flex items-center">
					<IconButton size="small" onClick={handleDelete}>
						<Icon name="close" />
					</IconButton>
				</div>
			)}
			{deleteNotificationLoading && (
				<div className="flex items-center">
					<CircularProgress size={24} />
				</div>
			)}
		</div>
	);
}
