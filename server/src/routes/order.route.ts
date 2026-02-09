import { Router } from "express";
import { authUserMiddleware } from "../middlewares/auth.middleware";
import {
    placeOrder,
    getUserOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
} from "../controllers/order.controller";

const orderRoutes = Router();

// All order routes require authentication
orderRoutes.use(authUserMiddleware);

// User routes
orderRoutes.post("/", placeOrder);
orderRoutes.get("/my-orders", getUserOrders);
orderRoutes.get("/:id", getOrderById);

// Admin/Visitor only routes
orderRoutes.get("/", getAllOrders);
orderRoutes.put("/:id/status", updateOrderStatus);

export default orderRoutes;
