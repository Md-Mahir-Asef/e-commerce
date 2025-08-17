import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Response {
            sendRes: <T>(data: T, message?: string) => void;
        }
    }
}
