import { useParams } from 'next/navigation';

export function useLocale() {
	const { locale } = useParams();
	return locale;
}
