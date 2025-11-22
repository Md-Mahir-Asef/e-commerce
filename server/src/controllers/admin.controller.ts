import { Request, Response } from "express";
import { LogInUserDateSchema } from "../utils/zodSchemas";
import prisma from "../utils/prisma";
import { compareSync } from "bcrypt";
import { generateToken } from "../utils/token";
import logger from "../utils/logger";
import { setTokenCookie, clearTokenCookie } from "../utils/cookies";
import { AuthenticatedRequest } from "../utils/types/AuthenticatedRequest";

export const adminLogin = async (req: Request, res: Response) => {
    try {
        const userDate = LogInUserDateSchema.parse(req.body.data);
        const { email, password } = userDate;
        const user = await prisma.user.findUnique({
            where: {
                email,
                role: { in: ["admin", "visitor"] },
            },
        });
        if (!user) {
            throw new Error("Not an admin.");
        }
        const isPassCorrect = compareSync(password, user.password as string);
        if (!isPassCorrect) {
            throw new Error("Password Incorrect.");
        }
        const token = generateToken({
            user_id: user.user_id,
            user_name: user.user_name,
            role: user.role,
        });
        setTokenCookie(res, token, { maxAge: 1000 * 60 * 60 });
        logger.info(`ADMIN ${user?.user_id} LOGGED IN.`);
        res.sendApi(
            { ...user, authenticated: true, token },
            "Log in successful."
        );
    } catch (err) {
        const error = err instanceof Error ? err.message : err;
        logger.error(`LOGIN FAILED FOR ADMIN ${req.body?.email}. \n ${error}`);
        res.sendErr({ error, authenticated: false }, "Log in failed.");
    }
};

export const adminLogout = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            throw new Error("Admin Log Out failed.");
        }
        const userId = req.user?.["user_id"];
        clearTokenCookie(res);
        logger.info(`ADMIN USER ${userId} LOGGED OUT.`);
        res.sendApi({ userId }, "Logged Out Successfully.");
    } catch (err) {
        const error = err instanceof Error ? err.message : err;
        logger.error(
            `LOGOUT FAILED FOR USER ${req.user?.["userId"]}. \n ${error}`
        );
        res.sendErr(error, "Logout Failed.");
    }
};
