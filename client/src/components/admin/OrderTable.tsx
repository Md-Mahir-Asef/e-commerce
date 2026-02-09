import { useState } from "react";
import { useAllOrders } from "@/hooks/useOrders";
import { Eye, Edit } from "lucide-react";
import type { Order, OrderStatus } from "@/types/order";

interface OrderTableProps {
    onEditOrder?: (order: Order) => void;
    onViewOrder?: (order: Order) => void;
}

export default function OrderTable({
    onEditOrder,
    onViewOrder,
}: OrderTableProps) {
    const { orders, loading, error, updateOrderStatus } = useAllOrders();
    const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
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

    const handleStatusChange = async (
        orderId: number,
        newStatus: OrderStatus,
    ) => {
        try {
            setUpdatingOrderId(orderId);
            await updateOrderStatus(orderId, newStatus);
        } catch (err) {
            // Error is handled in the hook
        } finally {
            setUpdatingOrderId(null);
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg p-4 animate-pulse"
                    >
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <div className="text-red-600 dark:text-red-400 mb-4">
                    {error}
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="text-gray-600 dark:text-gray-400">
                    No orders found
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {orders.map((order) => (
                        <tr
                            key={order.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    #{order.id}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {order.items.length} items
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">
                                    {order.user?.user_name || "Unknown"}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {order.user?.email || "No email"}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {formatDate(order.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                {formatPrice(order.totalAmount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            order.id,
                                            e.target.value as OrderStatus,
                                        )
                                    }
                                    disabled={updatingOrderId === order.id}
                                    className={`px-3 py-1 rounded-full text-sm font-medium border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(
                                        order.status,
                                    )} ${updatingOrderId === order.id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="PROCESSING">
                                        Processing
                                    </option>
                                    <option value="SHIPPED">Shipped</option>
                                    <option value="DELIVERED">Delivered</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onViewOrder?.(order)}
                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                        title="View Order"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        onClick={() => onEditOrder?.(order)}
                                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                        title="Edit Order"
                                    >
                                        <Edit size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
