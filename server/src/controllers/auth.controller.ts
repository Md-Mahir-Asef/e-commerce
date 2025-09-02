import { Request, Response } from "express";
import prisma from "../utils/prisma";
import logger from "../utils/logger";
import { hasher } from "../utils/hasher";
import { generateToken } from "../utils/token";
import { compareSync } from "bcrypt";
import { LogInUserDateSchema, UserDataSchema } from "../utils/zodSchemas";
import { AuthenticatedRequest } from "../utils/types/AuthenticatedRequest";
import { setTokenCookie, clearTokenCookie } from "../utils/cookies";

export const register = async (req: Request, res: Response) => {
    try {
        const userData = UserDataSchema.parse(req.body);
        const { user_name, email, password } = userData;
        const hashedPass = hasher(password);
        const newUser = await prisma.user.create({
            data: {
                user_name,
                email,
                password: hashedPass,
            },
        });
        const token = generateToken({
            user_id: newUser.user_id,
        });
        logger.info(`NEW USER CREATED ${newUser.user_id} ${newUser.user_name}`);
        setTokenCookie(res, token);
        res.sendApi({ token: token, user: newUser }, "Registered Successfully");
    } catch (err) {
        logger.error(`FAILED USER CREATION ${req.body.user_name}. \n ${err}`);
        res.sendErr(err, "Failed to create user.");
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        logger.info(`Successfully got all ${users.length} users.`);
        res.sendApi(users, "Successfully got all users");
    } catch (err) {
        logger.error(`FAILED GET USERS QUERY. \n ${err}`);
        res.sendErr(err, "Failed Get Users Query.");
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params["userId"];
        const deletedUser = await prisma.user.delete({
            where: {
                user_id: userId,
            },
        });
        logger.info(
            `DELETED USER ${deletedUser.user_id} ${deletedUser.user_name}`
        );
        res.sendApi(
            {
                user_id: deletedUser.user_id,
                user_name: deletedUser.user_name,
            },
            "User deleted successfully."
        );
    } catch (err) {
        logger.error(`USER DELETION FAILED ${req.params["userId"]}. \n ${err}`);
        res.sendErr(err, "Failed to Delete user.");
    }
};

export const logIn = async (req: Request, res: Response) => {
    try {
        const userDate = LogInUserDateSchema.parse(req.body);
        const { email, password } = userDate;
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        const isPassCorrect = compareSync(password, user?.password as string);
        if (isPassCorrect) {
            const token = generateToken({
                id: user?.user_id,
            });
            setTokenCookie(res, token);
            logger.info(`USER ${user?.user_id} LOGGED IN.`);
            res.sendApi({ authenticated: true }, "Log in successful.");
        } else {
            throw new Error("Password Incorrect.");
        }
    } catch (err) {
        const error = err instanceof Error ? err.message : err;
        logger.error(`LOGIN FAILED FOR ${req.body?.email}. \n ${error}`);
        res.sendErr({ error, authenticated: false }, "Log in failed.");
    }
};

export const logOut = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            throw new Error("Log Out failed.");
        }
        const userId = req.user?.["user_id"];
        clearTokenCookie(res);
        logger.info(`USER ${userId} LOGGED OUT.`);
        res.sendApi({ userId }, "Logged Out Successfully.");
    } catch (err) {
        const error = err instanceof Error ? err.message : err;
        logger.error(
            `LOGOUT FAILED FOR USER ${req.user?.["userId"]}. \n ${error}`
        );
        res.sendErr(error, "Logout Failed.");
    }
};
