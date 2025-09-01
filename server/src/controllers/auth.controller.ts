import { Request, Response } from "express";
import prisma from "../utils/prisma";
import logger from "../utils/logger";
import { hasher } from "../utils/hasher";
import { generateToken } from "../utils/token";
// import { compareSync } from "bcrypt";
// import { LogInUserDateSchema, UserDataSchema } from "../utils/zodSchemas";
// import { AuthenticatedRequest } from "../utils/types/AuthenticatedRequest";
import { UserDataSchema } from "../utils/zodSchemas";

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
        logger.info(`Registration Successfully Completed.`);
        logger.info(`NEW USER CREATED ${newUser.user_id} ${newUser.user_name}`);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "lax",
        });
        res.sendApi({ token: token, user: newUser }, "Registered Successfully");
    } catch (err) {
        logger.error(`Registration Failed. \n ${err}`);
        logger.error(`FAILED USER CREATION ${req.body.user_name}`);
        res.sendErr(err, "Failed to create user.");
    }
};

// export const logOut = async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     if (!req.user) {
//       throw new Error("Log Out failed.");
//     }
//     const userId = req.user.id;
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: false,
//       sameSite: "lax",
//     });
//     logger.info(`User ${userId} successfully logged out.`);
//     res.status(200).json({
//       message: "Log Out successful",
//       success: true,
//     });
//   } catch (error) {
//     logger.error("Log Out Failed", {
//       action: "LOGOUT",
//       entity: "User",
//       error,
//     });
//     res.status(500).json({
//       message: "Logout Failed!",
//       error: error,
//       success: false,
//     });
//   }
// };

// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     await prisma.task.deleteMany({
//       where: {
//         userId: id,
//       },
//     });
//     const deletedUser = await prisma.user.delete({
//       where: {
//         id,
//       },
//     });
//     logger.info(`Delete User ${deletedUser.id}`, {
//       action: "DELETE",
//       entity: "User",
//       id: deletedUser.id,
//       name: deletedUser.name,
//     });
//     res.status(200).json({
//       message: "User deleted successfully.",
//       data: {
//         id: deletedUser.id,
//       },
//       success: true,
//     });
//   } catch (err) {
//     logger.error("Failed to Delete user.", {
//       action: "DELETE",
//       entity: "User",
//       id: req.params.id,
//       error: err,
//     });
//     res.status(500).json({
//       message: "Failed to Delete user.",
//       error: err instanceof Error ? err.message : "Unknown Error Occurred.",
//       success: false,
//     });
//   }
// };

// export const logIn = async (req: Request, res: Response) => {
//   try {
//     const userDate = LogInUserDateSchema.parse(req.body);
//     const { email, password } = userDate;
//     const user = await prisma.user.findUnique({
//       where: {
//         email,
//       },
//     });
//     const isPassCorrect = compareSync(password, user?.password as string);
//     if (isPassCorrect) {
//       const token = generateToken({
//         id: user?.id,
//       });
//       res.cookie("token", token, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "lax",
//         maxAge: 1000 * 60 * 60 * 24 * 7,
//       });
//       logger.info(`User ${user?.id} logged in`);
//       res.status(200).json({
//         message: "Log in successful.",
//         authenticated: true,
//         success: true,
//       });
//     } else {
//       throw new Error("Password Incorrect.");
//     }
//   } catch (err) {
//     logger.error(`Log in Failed`, {
//       error: err,
//     });
//     res.status(500).json({
//       message: "Log in failed.",
//       error: err,
//       authenticated: false,
//       success: false,
//     });
//   }
// };
