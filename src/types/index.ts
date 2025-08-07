export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    statusCode: number;
}
export interface RegisterBody {
    username: string;
    email: string;
    password: string;
    userPublicId?: string;
}
export interface LogMessagesResponse<T = any> {
    status: "sucess" | "error" | "warning" | "log";
    message: string;
    data?: T;
}