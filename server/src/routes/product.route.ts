import { Router } from "express";
import {
    authUserMiddleware,
    authAdminMiddleware,
} from "../middlewares/auth.middleware";
import {
    getAllProducts,
    createProduct,
    updateProduct,
    getProductById,
    deleteProduct,
    getProductsByPage,
    getProductsByCategory,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/product.controller";

const productRoutes = Router();

productRoutes.get("/products", authUserMiddleware, getAllProducts);
productRoutes.get("/product/:id", authUserMiddleware, getProductById);
productRoutes.post("/product", authAdminMiddleware, createProduct);
productRoutes.put("/product/:id", authAdminMiddleware, updateProduct);
productRoutes.delete("/product/:id", authAdminMiddleware, deleteProduct);
productRoutes.get(
    "/products/:page/:limit",
    authUserMiddleware,
    getProductsByPage,
);
productRoutes.get(
    "/category/:categoryId/products/:page/:limit",
    getProductsByCategory,
);
productRoutes.get("/categories", getAllCategories);
productRoutes.post("/category", authAdminMiddleware, createCategory);
productRoutes.put("/category/:id", authAdminMiddleware, updateCategory);
productRoutes.delete("/category/:id", authAdminMiddleware, deleteCategory);

export default productRoutes;
