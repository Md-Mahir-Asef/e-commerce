import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useOrders } from "@/hooks/useOrders";
import {
    ArrowLeft,
    Package,
    Truck,
    CheckCircle,
    Clock,
    XCircle,
} from "lucide-react";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { config } from "@/config/config";
import type { Order } from "@/types/order";

export default function OrderDetails() {
    const { id } = useParams<{ id: string }>();
    const { getOrderById } = useOrders();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) return;

            try {
                setLoading(true);
                setError(null);
                const orderData = await getOrderById(parseInt(id));
                setOrder(orderData);
            } catch (err: any) {
                setError(err.message || "Failed to load order");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id, getOrderById]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PENDING":
                return <Clock className="text-yellow-600" size={24} />;
            case "PROCESSING":
                return <Package className="text-blue-600" size={24} />;
            case "SHIPPED":
                return <Truck className="text-purple-600" size={24} />;
            case "DELIVERED":
                return <CheckCircle className="text-green-600" size={24} />;
            case "CANCELLED":
                return <XCircle className="text-red-600" size={24} />;
            default:
                return <Package className="text-gray-600" size={24} />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
            case "PROCESSING":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
            case "SHIPPED":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
            case "DELIVERED":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
            case "CANCELLED":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
        }
    };

    const getImageUrl = (imageName: string) => {
        return `${config.VITE_SERVER_BASE_URL}/uploads/${imageName}`;
    };

    if (loading) {
        return (
            <>
                <TopHeader />
                <Header />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-48"></div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !order) {
        return (
            <>
                <TopHeader />
                <Header />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center py-16">
                            <div className="text-red-600 dark:text-red-400 text-xl mb-4">
                                {error || "Order not found"}
                            </div>
                            <Link
                                to="/orders"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} />
                                Back to Orders
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <TopHeader />
            <Header />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-6">
                        <Link
                            to="/orders"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mb-4"
                        >
                            <ArrowLeft size={20} />
                            Back to Orders
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Order Details
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Order Information */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Order Header */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Order #{order.id}
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Placed on{" "}
                                            {formatDate(order.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {getStatusIcon(order.status)}
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                order.status,
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Order Items
                                </h3>
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0"
                                        >
                                            {/* Product Image */}
                                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0">
                                                {item.product.images.length >
                                                0 ? (
                                                    <img
                                                        src={getImageUrl(
                                                            item.product
                                                                .images[0],
                                                        )}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src =
                                                                "/placeholder-image.png";
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                                                        <span className="text-xs">
                                                            No Image
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 dark:text-white">
                                                    {item.product.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>

                                            {/* Item Price */}
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {formatPrice(
                                                        item.priceAtOrder,
                                                    )}{" "}
                                                    each
                                                </p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {formatPrice(item.subtotal)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm sticky top-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Order Summary
                                </h3>

                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>
                                            Subtotal ({order.items.length}{" "}
                                            items)
                                        </span>
                                        <span>
                                            {formatPrice(order.totalAmount)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Tax</span>
                                        <span>Included</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                                        <span>Total</span>
                                        <span>
                                            {formatPrice(order.totalAmount)}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    <p className="mb-2">
                                        <strong>Order ID:</strong> #{order.id}
                                    </p>
                                    <p className="mb-2">
                                        <strong>Placed:</strong>{" "}
                                        {formatDate(order.createdAt)}
                                    </p>
                                    {order.updatedAt !== order.createdAt && (
                                        <p>
                                            <strong>Last Updated:</strong>{" "}
                                            {formatDate(order.updatedAt)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
