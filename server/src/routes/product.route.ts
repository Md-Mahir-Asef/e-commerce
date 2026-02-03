import { Router } from "express";
import {
    authUserMiddleware,
    authAdminMiddleware
} from "../middlewares/auth.middleware";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductsByPage } from "../controllers/product.controller";

const productRoutes = Router();

productRoutes.get("/products", authUserMiddleware, getAllProducts);
productRoutes.post("/product", authAdminMiddleware, createProduct);
productRoutes.put("/product/:id", authAdminMiddleware, updateProduct);
productRoutes.delete("/product/:id", authAdminMiddleware, deleteProduct);
productRoutes.get("/products/:page/:limit", authUserMiddleware, getProductsByPage);

export default productRoutes;