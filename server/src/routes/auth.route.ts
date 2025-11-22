import { Router } from "express";
import {
    register,
    getAllUsers,
    deleteUser,
    logIn,
    logOut,
    getUserToken,
} from "../controllers/auth.controller";
import { authUserMiddleware } from "../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.get("/users", getAllUsers);
authRoutes.delete("/user/:userId", deleteUser);
authRoutes.post("/login", logIn);
authRoutes.post("/logout/:userId", authUserMiddleware, logOut);
authRoutes.get("/me", authUserMiddleware, getUserToken);

export default authRoutes;
