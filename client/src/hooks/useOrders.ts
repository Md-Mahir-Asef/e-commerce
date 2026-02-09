import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { config } from "@/config/config";
import { toast } from "sonner";
import type {
    Order,
    OrderResponse,
    OrdersResponse,
    PlaceOrderResponse,
    OrderStatus,
} from "@/types/order";

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get<OrdersResponse>(
                `${config.VITE_SERVER_BASE_URL}/order/my-orders`,
                { withCredentials: true },
            );

            if (response.data.success) {
                setOrders(response.data.data.orders);
            }
        } catch (err: any) {
            console.error("Failed to fetch orders:", err);
            setError(err.response?.data?.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    }, []);

    const placeOrder = useCallback(async () => {
        try {
            const response = await axios.post<PlaceOrderResponse>(
                `${config.VITE_SERVER_BASE_URL}/order`,
                {},
                { withCredentials: true },
            );

            if (response.data.success) {
                toast.success("Order placed successfully!");
                await fetchOrders(); // Refresh orders
                return response.data.data.order;
            }
        } catch (err: any) {
            console.error("Failed to place order:", err);
            const errorMessage =
                err.response?.data?.message || "Failed to place order";
            toast.error(errorMessage);
            throw err;
        }
    }, [fetchOrders]);

    const getOrderById = useCallback(
        async (id: number): Promise<Order | null> => {
            try {
                const response = await axios.get<OrderResponse>(
                    `${config.VITE_SERVER_BASE_URL}/order/${id}`,
                    { withCredentials: true },
                );

                if (response.data.success) {
                    return response.data.data.order;
                }
                return null;
            } catch (err: any) {
                console.error("Failed to fetch order:", err);
                const errorMessage =
                    err.response?.data?.message || "Failed to load order";
                toast.error(errorMessage);
                return null;
            }
        },
        [],
    );

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return {
        orders,
        loading,
        error,
        placeOrder,
        getOrderById,
        refetchOrders: fetchOrders,
    };
}

export function useAllOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllOrders = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get<OrdersResponse>(
                `${config.VITE_SERVER_BASE_URL}/order`,
                { withCredentials: true },
            );

            if (response.data.success) {
                setOrders(response.data.data.orders);
            }
        } catch (err: any) {
            console.error("Failed to fetch all orders:", err);
            setError(err.response?.data?.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    }, []);

    const updateOrderStatus = useCallback(
        async (id: number, status: OrderStatus) => {
            try {
                const response = await axios.put<OrderResponse>(
                    `${config.VITE_SERVER_BASE_URL}/order/${id}/status`,
                    { status },
                    { withCredentials: true },
                );

                if (response.data.success) {
                    toast.success("Order status updated successfully!");
                    await fetchAllOrders(); // Refresh orders
                    return response.data.data.order;
                }
            } catch (err: any) {
                console.error("Failed to update order status:", err);
                const errorMessage =
                    err.response?.data?.message ||
                    "Failed to update order status";
                toast.error(errorMessage);
                throw err;
            }
        },
        [fetchAllOrders],
    );

    const deleteOrder = useCallback(
        async (id: number) => {
            try {
                const response = await axios.delete<OrderResponse>(
                    `${config.VITE_SERVER_BASE_URL}/order/${id}`,
                    { withCredentials: true },
                );

                if (response.data.success) {
                    toast.success("Order deleted successfully!");
                    await fetchAllOrders(); // Refresh orders
                    return response.data.data.order;
                }
            } catch (err: any) {
                console.error("Failed to delete order:", err);
                const errorMessage =
                    err.response?.data?.message || "Failed to delete order";
                toast.error(errorMessage);
                throw err;
            }
        },
        [fetchAllOrders],
    );

    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    return {
        orders,
        loading,
        error,
        updateOrderStatus,
        deleteOrder,
        refetchOrders: fetchAllOrders,
    };
}
