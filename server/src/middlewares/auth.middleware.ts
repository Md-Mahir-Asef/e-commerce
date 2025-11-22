import { Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { config } from "../config/config";
import logger from "../utils/logger";
import { AuthenticatedRequest } from "../utils/types/AuthenticatedRequest";

export const authUserMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            throw new Error("Invalid Token");
        }
        const user = verify(
            token,
            config.SERVER_JWT_SECRET as string
        ) as JwtPayload;
        req.user = user;
        logger.info(
            `AUTHENTICATED USER ${user["user_name"]} ${user["user_id"]}.`
        );
        next();
    } catch (err) {
        logger.error(`UNAUTHORIZED USER. \n${err}`);
        res.sendErr({ err, authenticated: false }, "Invalid Token.", 401);
    }
}; // Only Users

export const authAdminMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            throw new Error("Invalid Token");
        }
        const admin = verify(
            token,
            config.SERVER_JWT_SECRET as string
        ) as JwtPayload;
        if (admin["role"] !== "admin") {
            throw new Error("Not An Admin.");
        }
        req.user = admin;
        logger.info(
            `AUTHENTICATED ADMIN ${admin["user_name"]} ${admin["user_id"]}.`
        );
        next();
    } catch (err) {
        const error = err instanceof Error ? err.message : err;
        logger.error(`UNAUTHORIZED ADMIN. \n${error}`);
        res.sendErr({ error, authenticated: false }, "Invalid Token.", 401);
    }
}; // Only Admins

export const authVisitorMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            throw new Error("Invalid Token");
        }
        const visitor = verify(
            token,
            config.SERVER_JWT_SECRET as string
        ) as JwtPayload;
        if (visitor["role"] !== "admin" || visitor["role"] !== "visitor") {
            throw new Error("Not An Visitor.");
        }
        req.user = visitor;
        logger.info(
            `AUTHENTICATED VISITOR ${visitor["user_name"]} ${visitor["user_id"]}.`
        );
        next();
    } catch (err) {
        const error = err instanceof Error ? err.message : err;
        logger.error(`UNAUTHORIZED VISITOR. \n${error}`);
        res.sendErr({ error, authenticated: false }, "Invalid Token.", 401);
    }
}; // Admins and Visitors
