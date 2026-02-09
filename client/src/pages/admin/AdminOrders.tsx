import { useState } from "react";
import OrderTable from "../../components/admin/OrderTable";
import type { Order } from "@/types/order";

export default function AdminOrders() {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const handleViewOrder = (order: Order) => {
        setSelectedOrder(order);
        setIsViewModalOpen(true);
    };

    const closeModal = () => {
        setIsViewModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Order Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage and track all customer orders
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        All Orders
                    </h2>
                    <OrderTable onViewOrder={handleViewOrder} />
                </div>
            </div>

            {/* Order Details Modal */}
            {isViewModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Order #{selectedOrder.id}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Order Information */}
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                                        Order Information
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Order ID:
                                            </span>
                                            <span className="text-gray-900 dark:text-white">
                                                #{selectedOrder.id}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Status:
                                            </span>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    selectedOrder.status ===
                                                    "PENDING"
                                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                        : selectedOrder.status ===
                                                            "PROCESSING"
                                                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                          : selectedOrder.status ===
                                                              "SHIPPED"
                                                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                                            : selectedOrder.status ===
                                                                "DELIVERED"
                                                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                }`}
                                            >
                                                {selectedOrder.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Date:
                                            </span>
                                            <span className="text-gray-900 dark:text-white">
                                                {new Date(
                                                    selectedOrder.createdAt,
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Total:
                                            </span>
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                $
                                                {selectedOrder.totalAmount.toFixed(
                                                    2,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Information */}
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                                        Customer Information
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Name:
                                            </span>
                                            <span className="text-gray-900 dark:text-white">
                                                {selectedOrder.user
                                                    ?.user_name || "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Email:
                                            </span>
                                            <span className="text-gray-900 dark:text-white">
                                                {selectedOrder.user?.email ||
                                                    "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mt-6">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                                    Order Items ({selectedOrder.items.length})
                                </h3>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                                    {item.product.images
                                                        .length > 0 ? (
                                                        <img
                                                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/${item.product.images[0]}`}
                                                            alt={
                                                                item.product
                                                                    .name
                                                            }
                                                            className="w-full h-full object-cover rounded-lg"
                                                            onError={(e) => {
                                                                e.currentTarget.src =
                                                                    "/placeholder-image.png";
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="text-xs text-gray-500">
                                                            No Image
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {item.product.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Qty: {item.quantity} × $
                                                        {item.priceAtOrder.toFixed(
                                                            2,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900 dark:text-white">
                                                    ${item.subtotal.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
