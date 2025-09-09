import { Request, Response } from "express";
import prisma from "../utils/prisma";
import logger from "../utils/logger";
import { hasher } from "../utils/hasher";
import { generateToken } from "../utils/token";
import { compareSync } from "bcrypt";
import { LogInUserDateSchema, UserDataSchema } from "../utils/zodSchemas";
import { AuthenticatedRequest } from "../utils/types/AuthenticatedRequest";
import { setTokenCookie, clearTokenCookie } from "../utils/cookies";
import { ZodError } from "zod";

export const register = async (req: Request, res: Response) => {
    try {
        const userData = UserDataSchema.parse(req.body.data);
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
            user_name: newUser.user_name,
            role: newUser.role,
        });
        logger.info(`NEW USER CREATED ${newUser.user_id} ${newUser.user_name}`);
        setTokenCookie(res, token);
        res.sendApi(
            { token: token, user: newUser },
            "Registered Successfully",
            201
        );
    } catch (err) {
        let error: any = err;
        if (err instanceof ZodError) {
            error = JSON.parse(err.message)[0].message;
        }
        logger.error(`FAILED USER CREATION ${req.body.user_name}. \n ${error}`);
        res.sendErr(error, "Failed to create user.");
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
        const userDate = LogInUserDateSchema.parse(req.body.data);
        const { email, password } = userDate;
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new Error("User Not Found.");
        }
        const isPassCorrect = compareSync(password, user?.password as string);
        if (isPassCorrect) {
            const token = generateToken({
                user_id: user.user_id,
                user_name: user.user_name,
                role: user.role,
            });
            setTokenCookie(res, token);
            logger.info(`USER ${user?.user_id} LOGGED IN.`);
            res.sendApi({ ...user, authenticated: true }, "Log in successful.");
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

export const getUserToken = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        if (!req.user) {
            throw new Error("Can't Get User Data.");
        }
        const user_id = req.user?.["user_id"];
        const user_name = req.user?.["user_name"];
        logger.info(`USER DATA FETCHED FOR ${user_name} ${user_id}.`);
        res.sendApi({ user_id, user_name }, "Got User Data.");
    } catch (err) {
        const error = err instanceof Error ? err.message : err;
        logger.error(`FAILED FETCHING USER DATA. \n ${error}`);
        res.sendErr(error, "Can't get user data.");
    }
};
