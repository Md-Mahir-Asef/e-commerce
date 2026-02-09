import { Link } from "react-router-dom";
import { useOrders } from "@/hooks/useOrders";
import { ArrowLeft, Package, Eye } from "lucide-react";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Orders() {
    const { orders, loading, error } = useOrders();

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
        });
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

    if (loading) {
        return (
            <>
                <TopHeader />
                <Header />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-48"></div>
                            {[...Array(3)].map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-4"
                                >
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <TopHeader />
                <Header />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center py-16">
                            <div className="text-red-600 dark:text-red-400 text-xl mb-4">
                                Error: {error}
                            </div>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Try Again
                            </button>
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
                            to="/products"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mb-4"
                        >
                            <ArrowLeft size={20} />
                            Continue Shopping
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            My Orders
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {orders.length} {orders.length === 1 ? "order" : "orders"}
                        </p>
                    </div>

                    {orders.length === 0 ? (
                        <div className="text-center py-16">
                            <Package
                                className="mx-auto text-gray-400 dark:text-gray-500 mb-4"
                                size={64}
                            />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                No orders yet
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                You haven't placed any orders yet. Start shopping to see your orders here.
                            </p>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} />
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Order #{order.id}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {formatDate(order.createdAt)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                    order.status
                                                )}`}
                                            >
                                                {order.status}
                                            </span>
                                            <Link
                                                to={`/orders/${order.id}`}
                                                className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                            >
                                                <Eye size={16} />
                                                View Details
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {order.items.length} {order.items.length === 1 ? "item" : "items"}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {formatPrice(order.totalAmount)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
