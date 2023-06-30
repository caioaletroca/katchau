export default function getStoragePath(bucket: string, filePath: string) {
	return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PATH}/${bucket}/${filePath}`;
}
