export default function useClipboard() {
	const copy = (text: string) => {
		if (!navigator) {
			throw Error('Navigator is not defined yet');
		}

		return navigator.clipboard.writeText(text);
	};

	return {
		copy,
	};
}
