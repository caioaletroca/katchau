"use client";

import PageMobile from "@/components/Page/PageMobile";
import PageMobileHeader from "@/components/Page/PageMobileHeader";
import { useRouter } from "@/lib/intl/client";
import { useParams } from "next/navigation";
import Content from "../../profile/Content";

export default function UserPage() {
	const router = useRouter();
	const { user_id } = useParams();

	const handleBack = () => router.back();

	return (
		<PageMobile>
			<PageMobileHeader
				onBackClick={handleBack}
			/>
			<Content user_id={user_id} />
		</PageMobile>
	);
}
