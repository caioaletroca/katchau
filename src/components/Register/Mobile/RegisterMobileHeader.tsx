import PageMobileHeader from '@/components/Page/PageMobileHeader';
import { useRouter } from '@/lib/intl/client';

export default function RegisterMobileHeader() {
	const router = useRouter();

	const handleBack = () => router.back();

	return <PageMobileHeader onBackClick={handleBack} />;
}
