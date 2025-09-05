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
        logger.info(`AUTHENTICATED USER ${user["id"]}.`);
        next();
    } catch (err) {
        logger.error(`UNAUTHORIZED USER. \n ${err}`);
        res.sendErr({ err, authenticated: false }, "Invalid Token.", 401);
    }
};
