export class ApiError extends Error {
    statusCode: number;
    details?: any;

    constructor(message: string, statusCode = 500, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;

        if(Error.captureStackTrace) Error.captureStackTrace(this, ApiError);
    }

}