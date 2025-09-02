import { Router } from "express";
import {
    register,
    getAllUsers,
    deleteUser,
    logIn,
    logOut,
    getCurrentUser,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.get("/users", getAllUsers);
authRoutes.delete("/user/:userId", deleteUser);
authRoutes.post("/login", logIn);
authRoutes.post("/logout/:userId", logOut);
authRoutes.get("/me", getCurrentUser);

export default authRoutes;
