import { Router } from "express";
import { healthCheck } from "../controllers/health.controller";
import authRoutes from "./auth.route";

const routes = Router();

routes.get("/health", healthCheck);
routes.use("/auth", authRoutes);

export default routes;
