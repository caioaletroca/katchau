import { CircularProgress } from '@mui/material';
import React from 'react';

type PullToRefresh = React.PropsWithChildren & {
	loading?: boolean;
	disabled?: boolean;
	maxPull?: number;
	distanceToRefresh?: number;
	onRefresh?: () => void;
};

export default function PullToRefresh({
	loading,
	maxPull = 128,
	distanceToRefresh = 76,
	disabled: globalDisabled,
	onRefresh,
	children,
}: PullToRefresh) {
	const loadingSize = 64;
	const rootRef = React.useRef<HTMLDivElement>(null);
	const [scroll, setScroll] = React.useState(0);
	const [start, setStart] = React.useState(false);
	const [startPoint, setStartPoint] = React.useState(0);
	const [pullChange, setPullChange] = React.useState(0);
	const [disabled, setDisabled] = React.useState(true);

	const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
		if (globalDisabled) {
			return;
		}

		// Prevent user to start the refresh event
		// straight in by just pulling when scroll is at the top
		if (scroll === 0) {
			setDisabled(true);
		}

		const { screenY } = event.targetTouches[0];
		setStartPoint(screenY);
	};

	const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
		const { screenY } = event.targetTouches[0];
		const diff = screenY - startPoint;

		if (globalDisabled) {
			return;
		}

		// If we're not in refresh event
		if (!start) {
			// If user scrolled down a little bit, re-enable refresh event
			if (scroll > 0) {
				setDisabled(false);
			}

			// Start refresh event if user reached the top again
			if (!disabled && diff > 0 && scroll === 0) {
				setStart(true);
				setStartPoint(screenY);
			}

			// Skip logic, since react state isn't updated by now
			return;
		}

		// Do nothing if refresh event is disabled
		if (disabled) {
			return;
		}

		// If we are in refresh event
		// Should stop if user returned to original state
		if (diff < 0) {
			setStart(false);
			setPullChange(0);

			// Reset root scroll value
			rootRef.current?.scrollTo(0, 0);

			// Skip logic, since react state isn't updated by now
			return;
		}

		// Stop if reached max
		if (diff > maxPull) {
			// Drags the startPoint along keeping the diff
			// So the user doesn't have to drag all the way back
			// to cancel the refresh event
			setStartPoint(startPoint + diff - maxPull);

			// Reset root scroll value
			rootRef.current?.scrollTo(0, 0);

			return;
		}

		setPullChange(diff);

		// Reset root scroll value
		rootRef.current?.scrollTo(0, 0);
	};

	const handleTouchEnd = () => {
		setDisabled(true);
		setStart(false);
		setStartPoint(0);
		setPullChange(0);

		if (pullChange > distanceToRefresh) {
			onRefresh?.();
		}
	};

	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		setScroll(event.currentTarget.scrollTop);
	};

	const rootPaddingTop = React.useMemo(() => {
		if (loading) {
			return loadingSize;
		}

		return pullChange;
	}, [loading, pullChange]);

	const rootTransition = React.useMemo(
		() => (!start ? 'padding 200ms ease' : ''),
		[start]
	);

	const loadingTop = React.useMemo(() => {
		if (loading) {
			return 0;
		}

		return pullChange < loadingSize ? pullChange - loadingSize : 0;
	}, [loading, pullChange]);

	return (
		<div
			ref={rootRef}
			className="relative flex flex-1 flex-col overflow-y-auto"
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			onScroll={handleScroll}
			style={{
				paddingTop: rootPaddingTop,
				transition: rootTransition,
			}}>
			{
				<div
					className="absolute flex w-full justify-center py-4"
					style={{
						top: loadingTop,
					}}>
					<CircularProgress size={32} />
				</div>
			}
			{children}
		</div>
	);
}
