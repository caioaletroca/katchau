export type RequestSWRParams = {
	user_id?: string;
	post_id?: string;
	comment_id?: string;
	notification_id?: string;
};

export type RequestSWROptions<T = any> = {
	onSuccess?: (data: T) => void;
	onError?: () => void;
};

export type Response<T = any> = {
	data: T;
};

export type PaginationResponse<T = any> = {
	data: T[];
	nextCursor: string;
};
