import { Router } from "express";
import {
    adminLogin,
    adminLogout,
    visitorInfo,
} from "../controllers/admin.controller";
import { authVisitorMiddleware } from "../middlewares/auth.middleware";

const adminRoutes = Router();

adminRoutes.post("/login", adminLogin);
adminRoutes.post("/logout/:userId", authVisitorMiddleware, adminLogout);
adminRoutes.get("/visitorinfo", authVisitorMiddleware, visitorInfo);

export default adminRoutes;
