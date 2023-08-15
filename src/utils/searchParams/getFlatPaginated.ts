import { PaginationResponse } from '@/lib/fetcher';

export default function getFlatPaginated<T = any>(
	response?: PaginationResponse<T>[]
) {
	return response?.map((f) => f.data).flat();
}
