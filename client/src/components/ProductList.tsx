import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "@/config/config";
import CategoryRow from "./CategoryRow";

interface Category {
    id: number;
    name: string;
}

export default function ProductList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(
                    `${config.VITE_SERVER_BASE_URL}/product/categories`,
                    { withCredentials: true },
                );

                setCategories(
                    Array.isArray(response.data?.data)
                        ? response.data.data
                        : [],
                );
            } catch (err) {
                console.error("Failed to fetch categories:", err);
                setError("Failed to load categories");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex flex-col">
                <div className="max-w-7xl mx-auto grow">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Products
                    </h1>

                    {/* Category Skeletons */}
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="mb-8">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-48 animate-pulse"></div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {[...Array(4)].map((_, cardIndex) => (
                                    <div
                                        key={cardIndex}
                                        className="animate-pulse"
                                    >
                                        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-square mb-2"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex flex-col">
                <div className="max-w-7xl mx-auto grow">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Products
                    </h1>

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
        );
    }

    if (categories.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex flex-col">
                <div className="max-w-7xl mx-auto grow">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Products
                    </h1>

                    <div className="text-center py-16">
                        <div className="text-gray-500 dark:text-gray-400 text-xl">
                            No categories available
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex flex-col">
                <div className="max-w-7xl mx-auto grow">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Products
                    </h1>

                    {/* Category Rows */}
                    <div className="space-y-8">
                        {categories.map((category) => (
                            <CategoryRow
                                key={category.id}
                                categoryId={category.id}
                                categoryName={category.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
