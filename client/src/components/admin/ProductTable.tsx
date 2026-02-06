import { useState } from "react";
import { Edit, Trash2, Star } from "lucide-react";
import { config } from "@/config/config";

interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    discountPrice?: number;
    rating: number;
    images: string[];
    categories: { id: number; name: string }[];
}

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
}

export default function ProductTable({
    products,
    onEdit,
    onDelete,
}: ProductTableProps) {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

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
                        size={14}
                        className={
                            star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-400"
                        }
                    />
                ))}
                <span className="text-xs text-gray-400 ml-1">({rating})</span>
            </div>
        );
    };

    const getImageUrl = (imageName: string) => {
        console.log(`${config.VITE_SERVER_BASE_URL}/uploads/${imageName}`);
        return `${config.VITE_SERVER_BASE_URL}/uploads/${imageName}`;
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-300">
                            Product
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-300">
                            Price
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-300">
                            Rating
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-300">
                            Categories
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-300">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className={`border-b border-gray-800 transition-colors ${
                                hoveredRow === product.id ? "bg-gray-700" : ""
                            }`}
                            onMouseEnter={() => setHoveredRow(product.id)}
                            onMouseLeave={() => setHoveredRow(null)}
                        >
                            <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-600 rounded-md overflow-hidden shrink-0">
                                        {product.images.length > 0 ? (
                                            <img
                                                src={getImageUrl(
                                                    product.images[0],
                                                )}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        "/placeholder-image.png";
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <span className="text-xs">
                                                    No Image
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-medium text-white truncate">
                                            {product.name}
                                        </h3>
                                        {product.description && (
                                            <p className="text-xs text-gray-400 truncate">
                                                {product.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </td>
                            <td className="py-3 px-4">
                                <div>
                                    <span className="text-white font-medium">
                                        {formatPrice(
                                            product.discountPrice ||
                                                product.price,
                                        )}
                                    </span>
                                    {product.discountPrice &&
                                        product.discountPrice !==
                                            product.price && (
                                            <span className="text-xs text-gray-400 line-through ml-2">
                                                {formatPrice(product.price)}
                                            </span>
                                        )}
                                </div>
                            </td>
                            <td className="py-3 px-4">
                                {renderStars(product.rating)}
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex flex-wrap gap-1">
                                    {product.categories.map((category) => (
                                        <span
                                            key={category.id}
                                            className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full"
                                        >
                                            {category.name}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                                        title="Edit product"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(product.id)}
                                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                        title="Delete product"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {products.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                    <p>No products found.</p>
                </div>
            )}
        </div>
    );
}
