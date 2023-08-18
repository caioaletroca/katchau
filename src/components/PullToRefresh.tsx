import { CircularProgress } from '@mui/material';
import React from 'react';

type PullToRefresh = React.HTMLProps<HTMLDivElement> &
	React.PropsWithChildren & {
		loading?: boolean;
		disabled?: boolean;
		maxPull?: number;
		loadingFetchMore?: boolean;
		distanceToFetchPercentage?: number;
		distanceToRefresh?: number;
		onRefresh?: () => void;
		onFetchMore?: () => void;
	};

export default function PullToRefresh({
	loading,
	maxPull = 128,
	loadingFetchMore,
	distanceToFetchPercentage = 20,
	distanceToRefresh = 76,
	disabled: globalDisabled,
	onRefresh,
	onFetchMore,
	children,
	...others
}: PullToRefresh) {
	const loadingSize = 64;
	const rootRef = React.useRef<HTMLDivElement>(null);
	const [scroll, setScroll] = React.useState(0);
	const [scrollTriggered, setScrollTriggered] = React.useState(false);
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
		const currentScroll = event.currentTarget.scrollTop;

		// Only enable infinite scroll behavior if the event is passed
		if (onFetchMore) {
			// Calculate max scroll value
			const maxScroll =
				rootRef.current?.scrollHeight! - rootRef.current?.clientHeight!;

			// Percentage to reach the end
			const scrollPercentage = ((maxScroll - currentScroll) / maxScroll) * 100;

			// Re-enable event when the user went back above the trigger point
			if (scrollTriggered && scrollPercentage > distanceToFetchPercentage) {
				setScrollTriggered(false);
			}

			// Trigger event when reached the point
			if (!scrollTriggered && scrollPercentage < distanceToFetchPercentage) {
				onFetchMore?.();
				setScrollTriggered(true);
			}
		}

		setScroll(currentScroll);
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
			}}
			{...others}>
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
			{loadingFetchMore && (
				<div className="flex w-full justify-center py-4">
					<CircularProgress size={32} />
				</div>
			)}
		</div>
	);
}
