import { Router } from "express";
import { adminLogin, adminLogout } from "../controllers/admin.controller";
import { authVisitorMiddleware } from "../middlewares/auth.middleware";

const adminRoutes = Router();

adminRoutes.post("/login", adminLogin);
adminRoutes.post("/logout/:userId", authVisitorMiddleware, adminLogout);

export default adminRoutes;
