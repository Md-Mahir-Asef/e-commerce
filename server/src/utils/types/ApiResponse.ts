export interface ApiResponse<TData = void, TError = void> {
    success: boolean;
    message?: string;
    data?: TData;
    error?: TError;
}
