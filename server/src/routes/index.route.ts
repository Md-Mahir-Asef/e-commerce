import { Router } from "express";
import { healthCheck } from "../controllers/health.controller";

const routes = Router();

routes.get("/health", healthCheck);

export default routes;
