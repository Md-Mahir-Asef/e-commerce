import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "@/config/config";
import {
    Star,
    ShoppingCart,
    Heart,
    Share2,
    ChevronLeft,
    Plus,
    Minus,
    Truck,
    Shield,
    RefreshCw,
} from "lucide-react";
import type { Product } from "@/hooks/useProductsByCategory";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;

            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(
                    `${config.VITE_SERVER_BASE_URL}/product/product/${id}`,
                    { withCredentials: true },
                );

                setProduct(response.data.data);
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError("Failed to load product details");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={16}
                        className={
                            star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                        }
                    />
                ))}
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    {rating} out of 5
                </span>
            </div>
        );
    };

    const getImageUrl = (imageName: string) => {
        return `${config.VITE_SERVER_BASE_URL}/uploads/${imageName}`;
    };

    const handleQuantityChange = (change: number) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        // TODO: Implement cart functionality
        console.log(`Adding ${quantity} of product ${id} to cart`);
    };

    const handleToggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        // TODO: Implement wishlist functionality
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product?.name,
                text: product?.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-square"></div>
                            <div className="space-y-4">
                                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-16">
                        <div className="text-red-600 dark:text-red-400 text-xl mb-4">
                            {error || "Product not found"}
                        </div>
                        <button
                            onClick={() => navigate("/products")}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Back to Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <TopHeader />
            <Header />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
                    >
                        <ChevronLeft size={20} />
                        <span>Back</span>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Images */}
                        <div className="space-y-4">
                            <div className="aspect-square overflow-hidden rounded-lg bg-white dark:bg-gray-800">
                                {product.images.length > 0 ? (
                                    <img
                                        src={getImageUrl(
                                            product.images[selectedImage],
                                        )}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "/placeholder-image.png";
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                                        <span className="text-lg">
                                            No Image Available
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Images */}
                            {product.images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setSelectedImage(index)
                                            }
                                            className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                                                selectedImage === index
                                                    ? "border-blue-500"
                                                    : "border-gray-200 dark:border-gray-700"
                                            }`}
                                        >
                                            <img
                                                src={getImageUrl(image)}
                                                alt={`${product.name} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        "/placeholder-image.png";
                                                }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {/* Title and Rating */}
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {product.name}
                                </h1>
                                {renderStars(product.rating)}
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {formatPrice(
                                        product.discountPrice || product.price,
                                    )}
                                </span>
                                {product.discountPrice &&
                                    product.discountPrice !== product.price && (
                                        <span className="text-xl text-gray-500 line-through">
                                            {formatPrice(product.price)}
                                        </span>
                                    )}
                                {product.discountPrice &&
                                    product.discountPrice !== product.price && (
                                        <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-2 py-1 rounded-md text-sm font-medium">
                                            {Math.round(
                                                ((product.price -
                                                    product.discountPrice) /
                                                    product.price) *
                                                    100,
                                            )}
                                            % OFF
                                        </span>
                                    )}
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    Description
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {product.description ||
                                        "No description available for this product."}
                                </p>
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    Categories
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.categories.map((category) => (
                                        <span
                                            key={category.id}
                                            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                                        >
                                            {category.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    Quantity
                                </h3>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        disabled={quantity >= 10}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleToggleWishlist}
                                    className={`p-3 rounded-lg border transition-colors ${
                                        isWishlisted
                                            ? "bg-red-50 border-red-300 text-red-600 dark:bg-red-900 dark:border-red-700 dark:text-red-400"
                                            : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    <Heart
                                        size={20}
                                        fill={
                                            isWishlisted
                                                ? "currentColor"
                                                : "none"
                                        }
                                    />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <Share2 size={20} />
                                </button>
                            </div>

                            {/* Features */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="flex items-center gap-3">
                                        <Truck
                                            className="text-blue-600 dark:text-blue-400"
                                            size={20}
                                        />
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                Free Shipping
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                On orders over $50
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Shield
                                            className="text-green-600 dark:text-green-400"
                                            size={20}
                                        />
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                Secure Payment
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                100% secure
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RefreshCw
                                            className="text-purple-600 dark:text-purple-400"
                                            size={20}
                                        />
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                Easy Returns
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                30 days return
                                            </div>
                                        </div>
                                    </div>
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
