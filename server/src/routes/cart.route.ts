import { Router } from "express";
import { authUserMiddleware } from "../middlewares/auth.middleware";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
} from "../controllers/cart.controller";

const cartRoutes = Router();

// All cart routes require authentication
cartRoutes.use(authUserMiddleware);

cartRoutes.get("/", getCart);
cartRoutes.post("/add", addToCart);
cartRoutes.put("/update", updateCartItem);
cartRoutes.delete("/remove/:productId", removeFromCart);
cartRoutes.delete("/clear", clearCart);

export default cartRoutes;
