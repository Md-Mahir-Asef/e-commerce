import { Request, Response } from "express";
import prisma from "../utils/prisma";
import logger from "../utils/logger";
import { AuthenticatedRequest } from "../utils/types/AuthenticatedRequest";
import { ZodError } from "zod";
import { AddToCartSchema, UpdateCartSchema } from "../utils/zodSchemas";

export const getCart = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.["id"];
        if (!userId) {
            return res.sendErr({}, "User not authenticated", 401);
        }

        // Find or create cart for user
        let cart = await (prisma as any).cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
        }

        res.sendApi({
            cart: {
                id: cart.id,
                items: cart.items.map((item: any) => ({
                    id: item.id,
                    quantity: item.quantity,
                    product: item.product,
                    subtotal:
                        item.quantity *
                        (item.product.discountPrice || item.product.price),
                })),
                total: cart.items.reduce(
                    (sum: number, item: any) =>
                        sum +
                        item.quantity *
                            (item.product.discountPrice || item.product.price),
                    0,
                ),
                itemCount: cart.items.reduce(
                    (sum: number, item: any) => sum + item.quantity,
                    0,
                ),
            },
        });

        logger.info(`CART_RETRIEVED for user ${userId}`);
    } catch (err) {
        logger.error(`CART_RETRIEVAL_ERROR: ${err}`);
        res.sendErr({ err }, "Failed to retrieve cart", 500);
    }
};

export const addToCart = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.["id"];
        if (!userId) {
            return res.sendErr({}, "User not authenticated", 401);
        }

        const { productId, quantity } = AddToCartSchema.parse(req.body);

        // Verify product exists
        const product = await (prisma as any).product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return res.sendErr({}, "Product not found", 404);
        }

        // Find or create cart
        let cart = await (prisma as any).cart.findUnique({
            where: { userId },
        });

        if (!cart) {
            cart = await (prisma as any).cart.create({
                data: { userId },
            });
        }

        // Check if item already exists in cart
        const existingItem = await (prisma as any).cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });

        if (existingItem) {
            // Update quantity if item exists
            const updatedItem = await (prisma as any).cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
                include: { product: true },
            });

            res.sendApi({
                item: {
                    id: updatedItem.id,
                    quantity: updatedItem.quantity,
                    product: updatedItem.product,
                    subtotal:
                        updatedItem.quantity *
                        (updatedItem.product.discountPrice ||
                            updatedItem.product.price),
                },
            });

            logger.info(
                `CART_ITEM_UPDATED: ${updatedItem.id} for user ${userId}`,
            );
        } else {
            // Create new cart item
            const newItem = await (prisma as any).cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                },
                include: { product: true },
            });

            res.sendApi({
                item: {
                    id: newItem.id,
                    quantity: newItem.quantity,
                    product: newItem.product,
                    subtotal:
                        newItem.quantity *
                        (newItem.product.discountPrice ||
                            newItem.product.price),
                },
            });

            logger.info(`CART_ITEM_ADDED: ${newItem.id} for user ${userId}`);
        }
    } catch (err) {
        if (err instanceof ZodError) {
            return res.sendErr(
                { errors: err.issues },
                "Invalid input data",
                400,
            );
        }
        logger.error(`CART_ADD_ERROR: ${err}`);
        res.sendErr({ err }, "Failed to add item to cart", 500);
    }
};

export const updateCartItem = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    try {
        const userId = req.user?.["id"];
        if (!userId) {
            return res.sendErr({}, "User not authenticated", 401);
        }

        const { productId, quantity } = UpdateCartSchema.parse(req.body);

        if (quantity < 1) {
            return res.sendErr({}, "Quantity must be at least 1", 400);
        }

        // Find user's cart
        const cart = await (prisma as any).cart.findUnique({
            where: { userId },
        });

        if (!cart) {
            return res.sendErr({}, "Cart not found", 404);
        }

        // Find and update cart item
        const existingItem = await (prisma as any).cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });

        if (!existingItem) {
            return res.sendErr({}, "Item not found in cart", 404);
        }

        const updatedItem = await (prisma as any).cartItem.update({
            where: { id: existingItem.id },
            data: { quantity },
            include: { product: true },
        });

        res.sendApi({
            item: {
                id: updatedItem.id,
                quantity: updatedItem.quantity,
                product: updatedItem.product,
                subtotal:
                    updatedItem.quantity *
                    (updatedItem.product.discountPrice ||
                        updatedItem.product.price),
            },
        });

        logger.info(`CART_ITEM_UPDATED: ${updatedItem.id} for user ${userId}`);
    } catch (err) {
        if (err instanceof ZodError) {
            return res.sendErr(
                { errors: err.issues },
                "Invalid input data",
                400,
            );
        }
        logger.error(`CART_UPDATE_ERROR: ${err}`);
        res.sendErr({ err }, "Failed to update cart item", 500);
    }
};

export const removeFromCart = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    try {
        const userId = req.user?.["id"];
        if (!userId) {
            return res.sendErr({}, "User not authenticated", 401);
        }

        const { productId } = req.params;

        // Find user's cart
        const cart = await (prisma as any).cart.findUnique({
            where: { userId },
        });

        if (!cart) {
            return res.sendErr({}, "Cart not found", 404);
        }

        // Find and delete cart item
        const existingItem = await (prisma as any).cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId: parseInt(productId || "0"),
                },
            },
        });

        if (!existingItem) {
            return res.sendErr({}, "Item not found in cart", 404);
        }

        await (prisma as any).cartItem.delete({
            where: { id: existingItem.id },
        });

        res.sendApi({ message: "Item removed from cart" });

        logger.info(`CART_ITEM_REMOVED: ${existingItem.id} for user ${userId}`);
    } catch (err) {
        logger.error(`CART_REMOVE_ERROR: ${err}`);
        res.sendErr({ err }, "Failed to remove item from cart", 500);
    }
};

export const clearCart = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.["id"];
        if (!userId) {
            return res.sendErr({}, "User not authenticated", 401);
        }

        // Find user's cart
        const cart = await (prisma as any).cart.findUnique({
            where: { userId },
        });

        if (!cart) {
            return res.sendApi({ message: "Cart is already empty" });
        }

        // Delete all cart items
        await (prisma as any).cartItem.deleteMany({
            where: { cartId: cart.id },
        });

        res.sendApi({ message: "Cart cleared successfully" });

        logger.info(`CART_CLEARED for user ${userId}`);
    } catch (err) {
        logger.error(`CART_CLEAR_ERROR: ${err}`);
        res.sendErr({ err }, "Failed to clear cart", 500);
    }
};
