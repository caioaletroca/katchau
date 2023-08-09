import React from 'react';

export default function useTimeout(timeout: number, callback?: Function) {
	const [running, setRunning] = React.useState(false);

	const triggerCallback = () => {
		setRunning(false);
		callback?.();
	};

	const trigger = () => {
		setRunning(true);
		setTimeout(triggerCallback, timeout);
	};

	return {
		trigger,
		running,
	};
}
