import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "@/config/config";

export function useCartItemCount() {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const fetchCartItemCount = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_BASE_URL}/cart`,
                    { withCredentials: true }
                );
                
                if (response.data.success) {
                    setItemCount(response.data.data.cart.itemCount || 0);
                }
            } catch (err) {
                console.error('Failed to fetch cart item count:', err);
                setItemCount(0);
            }
        };

        fetchCartItemCount();

        // Listen for cart updates (you could use a context or event system for this)
        const interval = setInterval(fetchCartItemCount, 5000); // Refresh every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return itemCount;
}
