import { Request, Response } from "express";
import prisma from "../utils/prisma";
import logger from "../utils/logger";
import { AuthenticatedRequest } from "../utils/types/AuthenticatedRequest";
import { ZodError } from "zod";
import { UpdateOrderStatusSchema } from "../utils/zodSchemas";

export const placeOrder = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.["id"];
        if (!userId) {
            return res.sendErr({}, "User not authenticated", 401);
        }

        // Find user's cart with items
        const cart = await (prisma as any).cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!cart || cart.items.length === 0) {
            return res.sendErr({}, "Cart is empty", 400);
        }

        // Calculate total amount
        const totalAmount = cart.items.reduce(
            (sum: number, item: any) =>
                sum +
                item.quantity *
                    (item.product.discountPrice || item.product.price),
            0,
        );

        // Create order with items in a transaction
        const order = await (prisma as any).$transaction(async (tx: any) => {
            // Create order
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    totalAmount,
                    status: "PENDING",
                },
            });

            // Create order items with product snapshots
            const orderItems = await Promise.all(
                cart.items.map(async (item: any) => {
                    const priceAtOrder =
                        item.product.discountPrice || item.product.price;

                    return tx.orderItem.create({
                        data: {
                            orderId: newOrder.id,
                            productId: item.productId,
                            quantity: item.quantity,
                            priceAtOrder,
                            productSnapshot: {
                                id: item.product.id,
                                name: item.product.name,
                                images: item.product.images,
                                price: item.product.price,
                                discountPrice: item.product.discountPrice,
                            },
                        },
                    });
                }),
            );

            // Clear cart
            await tx.cartItem.deleteMany({
                where: { cartId: cart.id },
            });

            return { ...newOrder, items: orderItems };
        });

        res.sendApi({
            order: {
                id: order.id,
                totalAmount: order.totalAmount,
                status: order.status,
                createdAt: order.createdAt,
                items: order.items.map((item: any) => ({
                    id: item.id,
                    quantity: item.quantity,
                    priceAtOrder: item.priceAtOrder,
                    subtotal: item.quantity * item.priceAtOrder,
                    product: item.productSnapshot,
                })),
            },
        });

        logger.info(`ORDER_PLACED: ${order.id} for user ${userId}`);
    } catch (err) {
        logger.error(`ORDER_PLACEMENT_ERROR: ${err}`);
        res.sendErr({ err }, "Failed to place order", 500);
    }
};

export const getUserOrders = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    try {
        const userId = req.user?.["id"];
        if (!userId) {
            return res.sendErr({}, "User not authenticated", 401);
        }

        const orders = await (prisma as any).order.findMany({
            where: { userId },
            include: {
                items: true,
            },
            orderBy: { createdAt: "desc" },
        });

        res.sendApi({
            orders: orders.map((order: any) => ({
                id: order.id,
                totalAmount: order.totalAmount,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                items: order.items.map((item: any) => ({
                    id: item.id,
                    quantity: item.quantity,
                    priceAtOrder: item.priceAtOrder,
                    subtotal: item.quantity * item.priceAtOrder,
                    product: item.productSnapshot,
                })),
            })),
        });

        logger.info(`USER_ORDERS_RETRIEVED for user ${userId}`);
    } catch (err) {
        logger.error(`USER_ORDERS_ERROR: ${err}`);
        res.sendErr({ err }, "Failed to retrieve orders", 500);
    }
};

export const getAllOrders = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    try {
        const userRole = req.user?.["role"];
        if (userRole !== "admin" && userRole !== "visitor") {
            return res.sendErr({}, "Access denied", 403);
        }

        const orders = await (prisma as any).order.findMany({
            include: {
                items: true,
                user: {
                    select: {
                        id: true,
                        user_name: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        res.sendApi({
            orders: orders.map((order: any) => ({
                id: order.id,
                totalAmount: order.totalAmount,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                user: order.user,
                items: order.items.map((item: any) => ({
                    id: item.id,
                    quantity: item.quantity,
                    priceAtOrder: item.priceAtOrder,
                    subtotal: item.quantity * item.priceAtOrder,
                    product: item.productSnapshot,
                })),
            })),
        });

        logger.info(`ALL ${orders.length} ORDERS RETRIEVED by ${userRole}`);
    } catch (err) {
        logger.error(`ALL_ORDERS_ERROR: ${err}`);
        res.sendErr({ err }, "Failed to retrieve orders", 500);
    }
};

export const getOrderById = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    try {
        const { id } = req.params;
        const userId = req.user?.["id"];
        const userRole = req.user?.["role"];

        if (!userId) {
            return res.sendErr({}, "User not authenticated", 401);
        }

        const order = await (prisma as any).order.findUnique({
            where: { id: parseInt(id || "0") },
            include: {
                items: true,
                user: {
                    select: {
                        id: true,
                        user_name: true,
                        email: true,
                    },
                },
            },
        });

        if (!order) {
            return res.sendErr({}, "Order not found", 404);
        }

        // Check if user owns the order or is admin/visitor
        if (
            order.userId !== userId &&
            userRole !== "admin" &&
            userRole !== "visitor"
        ) {
            return res.sendErr({}, "Access denied", 403);
        }

        res.sendApi({
            order: {
                id: order.id,
                totalAmount: order.totalAmount,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                user: order.user,
                items: order.items.map((item: any) => ({
                    id: item.id,
                    quantity: item.quantity,
                    priceAtOrder: item.priceAtOrder,
                    subtotal: item.quantity * item.priceAtOrder,
                    product: item.productSnapshot,
                })),
            },
        });

        logger.info(`ORDER_RETRIEVED: ${id} by user ${userId}`);
    } catch (err) {
        logger.error(`ORDER_RETRIEVAL_ERROR: ${err}`);
        res.sendErr({ err }, "Failed to retrieve order", 500);
    }
};

export const updateOrderStatus = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    try {
        const { id } = req.params;
        const { status } = UpdateOrderStatusSchema.parse(req.body);
        const userRole = req.user?.["role"];

        if (userRole !== "admin" && userRole !== "visitor") {
            return res.sendErr({}, "Access denied", 403);
        }

        const order = await (prisma as any).order.update({
            where: { id: parseInt(id || "0") },
            data: { status },
            include: {
                items: true,
                user: {
                    select: {
                        id: true,
                        user_name: true,
                        email: true,
                    },
                },
            },
        });

        res.sendApi({
            order: {
                id: order.id,
                totalAmount: order.totalAmount,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                user: order.user,
                items: order.items.map((item: any) => ({
                    id: item.id,
                    quantity: item.quantity,
                    priceAtOrder: item.priceAtOrder,
                    subtotal: item.quantity * item.priceAtOrder,
                    product: item.productSnapshot,
                })),
            },
        });

        logger.info(`ORDER_STATUS_UPDATED: ${id} to ${status} by ${userRole}`);
    } catch (err) {
        if (err instanceof ZodError) {
            return res.sendErr(
                { errors: err.issues },
                "Invalid input data",
                400,
            );
        }
        logger.error(`ORDER_STATUS_UPDATE_ERROR: ${err}`);
        res.sendErr({ err }, "Failed to update order status", 500);
    }
};
