import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { config } from "@/config/config";
import { toast } from "sonner";

interface CartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        discountPrice?: number;
        images: string[];
    };
    subtotal: number;
}

interface Cart {
    id: number;
    items: CartItem[];
    total: number;
    itemCount: number;
}

interface CartResponse {
    success: boolean;
    data: {
        cart: Cart;
    };
}

interface CartItemResponse {
    success: boolean;
    data: {
        item: CartItem;
    };
}

export function useCart() {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.get<CartResponse>(
                `${config.VITE_SERVER_BASE_URL}/cart`,
                { withCredentials: true }
            );
            
            if (response.data.success) {
                setCart(response.data.data.cart);
            }
        } catch (err: any) {
            console.error('Failed to fetch cart:', err);
            setError(err.response?.data?.message || 'Failed to load cart');
        } finally {
            setLoading(false);
        }
    }, []);

    const addToCart = useCallback(async (productId: number, quantity: number = 1) => {
        try {
            const response = await axios.post<CartItemResponse>(
                `${config.VITE_SERVER_BASE_URL}/cart/add`,
                { productId, quantity },
                { withCredentials: true }
            );
            
            if (response.data.success) {
                toast.success('Item added to cart');
                await fetchCart(); // Refresh cart
                return response.data.data.item;
            }
        } catch (err: any) {
            console.error('Failed to add to cart:', err);
            const errorMessage = err.response?.data?.message || 'Failed to add item to cart';
            toast.error(errorMessage);
            throw err;
        }
    }, [fetchCart]);

    const updateCartItem = useCallback(async (productId: number, quantity: number) => {
        try {
            const response = await axios.put<CartItemResponse>(
                `${config.VITE_SERVER_BASE_URL}/cart/update`,
                { productId, quantity },
                { withCredentials: true }
            );
            
            if (response.data.success) {
                toast.success('Cart updated');
                await fetchCart(); // Refresh cart
                return response.data.data.item;
            }
        } catch (err: any) {
            console.error('Failed to update cart:', err);
            const errorMessage = err.response?.data?.message || 'Failed to update cart';
            toast.error(errorMessage);
            throw err;
        }
    }, [fetchCart]);

    const removeFromCart = useCallback(async (productId: number) => {
        try {
            const response = await axios.delete(
                `${config.VITE_SERVER_BASE_URL}/cart/remove/${productId}`,
                { withCredentials: true }
            );
            
            if (response.data.success) {
                toast.success('Item removed from cart');
                await fetchCart(); // Refresh cart
            }
        } catch (err: any) {
            console.error('Failed to remove from cart:', err);
            const errorMessage = err.response?.data?.message || 'Failed to remove item from cart';
            toast.error(errorMessage);
            throw err;
        }
    }, [fetchCart]);

    const clearCart = useCallback(async () => {
        try {
            const response = await axios.delete(
                `${config.VITE_SERVER_BASE_URL}/cart/clear`,
                { withCredentials: true }
            );
            
            if (response.data.success) {
                toast.success('Cart cleared');
                await fetchCart(); // Refresh cart
            }
        } catch (err: any) {
            console.error('Failed to clear cart:', err);
            const errorMessage = err.response?.data?.message || 'Failed to clear cart';
            toast.error(errorMessage);
            throw err;
        }
    }, [fetchCart]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return {
        cart,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        refetchCart: fetchCart,
    };
}

export type { Cart, CartItem };
