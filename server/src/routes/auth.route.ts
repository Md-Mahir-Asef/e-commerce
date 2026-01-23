import { Router } from "express";
import {
    register,
    getAllUsers,
    deleteUser,
    logIn,
    logOut,
    getUserToken,
    getUsersByPage,
    getNumberOfUsers,
} from "../controllers/auth.controller";
import {
    authUserMiddleware,
    authVisitorMiddleware,
} from "../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.get("/users", authVisitorMiddleware, getAllUsers);
authRoutes.delete("/user/:userId", deleteUser);
authRoutes.post("/login", logIn);
authRoutes.post("/logout/:userId", authUserMiddleware, logOut);
authRoutes.get("/me", authUserMiddleware, getUserToken);
authRoutes.get("/users/:page/:limit", authVisitorMiddleware, getUsersByPage);
authRoutes.get("/users/count", authVisitorMiddleware, getNumberOfUsers);

export default authRoutes;
