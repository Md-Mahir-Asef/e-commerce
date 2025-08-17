import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        logger.info(
            `${res.statusCode} ${req.method} ${req.ip} ${req.originalUrl} - ${duration}ms`
        );
    });
    next();
};
