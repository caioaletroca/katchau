export default function getStoragePath(bucket: string, filePath?: string) {
	if (!filePath) {
		return undefined;
	}

	return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PATH}/${bucket}/${filePath}`;
}
