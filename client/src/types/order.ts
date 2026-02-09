export interface ProductSnapshot {
    id: number;
    name: string;
    images: string[];
    price: number;
    discountPrice?: number;
}

export interface OrderItem {
    id: number;
    quantity: number;
    priceAtOrder: number;
    subtotal: number;
    product: ProductSnapshot;
}

export interface Order {
    id: number;
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
    user?: {
        id: number;
        user_name: string;
        email: string;
    };
}

export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface OrderResponse {
    success: boolean;
    data: {
        order: Order;
    };
}

export interface OrdersResponse {
    success: boolean;
    data: {
        orders: Order[];
    };
}

export interface PlaceOrderResponse {
    success: boolean;
    data: {
        order: Order;
    };
}
