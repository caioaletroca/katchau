export default function useShare() {
	const share = async (data: { url: string }) => {
		return navigator.share(data);
	};

	return {
		share,
	};
}
