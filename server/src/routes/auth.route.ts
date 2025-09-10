import { Router } from "express";
import {
    register,
    getAllUsers,
    deleteUser,
    logIn,
    logOut,
    getUserToken,
} from "../controllers/auth.controller";
import { adminLogin } from "../controllers/admin.controller";
import {
    authUserMiddleware,
    authVisitorMiddleware,
} from "../middlewares/auth.middleware";
import adminRoutes from "./admin.route";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.get("/users", getAllUsers);
authRoutes.delete("/user/:userId", deleteUser);
authRoutes.post("/login", logIn);
authRoutes.post("/logout/:userId", authUserMiddleware, logOut);
authRoutes.get("/me", authUserMiddleware, getUserToken);
authRoutes.post("/admin/login", adminLogin);
authRoutes.use("/admin", authVisitorMiddleware, adminRoutes);

export default authRoutes;
