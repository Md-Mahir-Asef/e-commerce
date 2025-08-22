import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/types/ApiResponse";

declare global {
    namespace Express {
        interface Response {
            sendApi: <TData = void>(data?: TData, message?: string) => void;
            sendErr: <TError = string>(
                error: TError,
                message?: string,
                statusCode?: number
            ) => void;
        }
    }
}

export const responseWrapper = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.sendApi = <TData = void>(data?: TData, message?: string) => {
        const response: ApiResponse<TData> = {
            success: true,
            data,
            message,
        };
        res.json(response);
    };

    res.sendErr = <TError = string>(
        error: TError,
        message?: string,
        statusCode: number = 500
    ) => {
        const response: ApiResponse<void, TError> = {
            success: false,
            error,
            message,
        };
        res.status(statusCode).json(response);
    };

    next();
};
