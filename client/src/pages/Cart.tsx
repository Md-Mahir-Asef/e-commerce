import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { config } from "@/config/config";

export default function Cart() {
    const { cart, loading, error, updateCartItem, removeFromCart, clearCart } =
        useCart();
    const { placeOrder } = useOrders();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);
    };

    const handleQuantityChange = async (
        productId: number,
        currentQuantity: number,
        change: number,
    ) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity >= 1 && newQuantity <= 10) {
            try {
                await updateCartItem(productId, newQuantity);
            } catch (err) {
                // Error is handled in the hook
            }
        }
    };

    const handleRemoveItem = async (productId: number) => {
        try {
            await removeFromCart(productId);
        } catch (err) {
            // Error is handled in the hook
        }
    };

    const handleClearCart = async () => {
        if (window.confirm("Are you sure you want to clear your cart?")) {
            try {
                await clearCart();
            } catch (err) {
                // Error is handled in the hook
            }
        }
    };

    const handlePlaceOrder = async () => {
        if (!cart || cart.items.length === 0) {
            return;
        }

        try {
            const order = await placeOrder();
            if (order) {
                // Redirect to order details or orders page
                window.location.href = `/orders/${order.id}`;
            }
        } catch (err) {
            // Error is handled in the hook
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
                            {[...Array(3)].map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                                        </div>
                                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                                    </div>
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

    if (!cart || cart.items.length === 0) {
        return (
            <>
                <TopHeader />
                <Header />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center py-16">
                            <ShoppingBag
                                className="mx-auto text-gray-400 dark:text-gray-500 mb-4"
                                size={64}
                            />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Looks like you haven't added any products to
                                your cart yet.
                            </p>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} />
                                Continue Shopping
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
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Shopping Cart
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {cart.itemCount}{" "}
                            {cart.itemCount === 1 ? "item" : "items"} in your
                            cart
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Product Image */}
                                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0">
                                            {item.product.images.length > 0 ? (
                                                <img
                                                    src={getImageUrl(
                                                        item.product.images[0],
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
                                            <Link
                                                to={`/product/${item.product.id}`}
                                                className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {formatPrice(
                                                    item.product
                                                        .discountPrice ||
                                                        item.product.price,
                                                )}
                                            </div>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.product.id,
                                                        item.quantity,
                                                        -1,
                                                    )
                                                }
                                                className="p-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.product.id,
                                                        item.quantity,
                                                        1,
                                                    )
                                                }
                                                className="p-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                disabled={item.quantity >= 10}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        {/* Item Subtotal */}
                                        <div className="text-right">
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {formatPrice(item.subtotal)}
                                            </div>
                                            {item.product.discountPrice &&
                                                item.product.discountPrice !==
                                                    item.product.price && (
                                                    <div className="text-sm text-gray-500 line-through">
                                                        {formatPrice(
                                                            item.product.price *
                                                                item.quantity,
                                                        )}
                                                    </div>
                                                )}
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() =>
                                                handleRemoveItem(
                                                    item.product.id,
                                                )
                                            }
                                            className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Clear Cart Button */}
                            <button
                                onClick={handleClearCart}
                                className="w-full py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors font-medium"
                            >
                                Clear Cart
                            </button>
                        </div>

                        {/* Cart Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm sticky top-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Order Summary
                                </h3>

                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>
                                            Subtotal ({cart.itemCount} items)
                                        </span>
                                        <span>{formatPrice(cart.total)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Tax</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                                        <span>Total</span>
                                        <span>{formatPrice(cart.total)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                                >
                                    Place Order
                                </button>

                                <Link
                                    to="/products"
                                    className="block w-full mt-3 text-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
