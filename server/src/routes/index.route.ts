import { Router } from "express";
import { healthCheck } from "../controllers/health.controller";
import { uploadImage } from "../controllers/upload.controller";
import upload from "../middlewares/multer.middleware";
import authRoutes from "./auth.route";
import adminRoutes from "./admin.route";
import productRoutes from "./product.route";
import cartRoutes from "./cart.route";

const routes = Router();

routes.get("/health", healthCheck);
routes.post("/upload", upload.single("image"), uploadImage);
routes.use("/auth", authRoutes);
routes.use("/admin", adminRoutes);
routes.use("/product", productRoutes);
routes.use("/cart", cartRoutes);

export default routes;
