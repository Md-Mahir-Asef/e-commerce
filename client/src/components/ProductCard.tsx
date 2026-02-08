import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { config } from "@/config/config";
import type { Product } from "@/hooks/useProductsByCategory";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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
                        size={12}
                        className={
                            star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                        }
                    />
                ))}
                <span className="text-xs text-gray-500 ml-1">({rating})</span>
            </div>
        );
    };

    const getImageUrl = (imageName: string) => {
        return `${config.VITE_SERVER_BASE_URL}/uploads/${imageName}`;
    };

    return (
        <Link to={`/product/${product.id}`} className="block group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full flex flex-col">
                {/* Product Image */}
                <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0">
                    {product.images.length > 0 ? (
                        <img
                            src={getImageUrl(product.images[0])}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            onError={(e) => {
                                e.currentTarget.src = "/placeholder-image.png";
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                            <span className="text-sm">No Image</span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors overflow-hidden">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="mb-2">{renderStars(product.rating)}</div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatPrice(
                                product.discountPrice || product.price,
                            )}
                        </span>
                        {product.discountPrice &&
                            product.discountPrice !== product.price && (
                                <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(product.price)}
                                </span>
                            )}
                    </div>

                    {/* Categories - Remove to avoid making cards larger */}
                </div>
            </div>
        </Link>
    );
}
