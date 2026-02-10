import { ChevronRight, ChevronLeft } from "lucide-react";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";
import ProductCard from "./ProductCard";
import { useState, useRef, useEffect } from "react";

interface CategoryRowProps {
    categoryId: number;
    categoryName: string;
}

export default function CategoryRow({
    categoryId,
    categoryName,
}: CategoryRowProps) {
    const { products, loading, hasMore, loadMore } =
        useProductsByCategory(categoryId);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const checkScrollButtons = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setShowLeftArrow(container.scrollLeft > 0);
            setShowRightArrow(
                container.scrollLeft <
                    container.scrollWidth - container.clientWidth,
            );
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            checkScrollButtons();
            container.addEventListener("scroll", checkScrollButtons);
            return () =>
                container.removeEventListener("scroll", checkScrollButtons);
        }
    }, [products]);

    const scrollLeft = () => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    if (loading && products.length === 0) {
        return (
            <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    {categoryName}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-square mb-2"></div>
                            <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                            <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                {categoryName}
            </h2>

            <div className="relative">
                {/* Left Arrow */}
                {showLeftArrow && (
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full shadow-lg p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft
                            size={16}
                            className="text-gray-600 dark:text-gray-400"
                        />
                    </button>
                )}

                {/* Right Arrow */}
                {showRightArrow && (
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full shadow-lg p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Scroll right"
                    >
                        <ChevronRight
                            size={16}
                            className="text-gray-600 dark:text-gray-400"
                        />
                    </button>
                )}

                {/* Horizontal Scroll Container */}
                <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="w-full flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
                    >
                        <div className="flex gap-2 sm:gap-3 md:gap-4">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="shrink-0 w-32 sm:w-36 md:w-40 lg:w-44 xl:w-52 2xl:w-60"
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                            {/* Load More Button as Card */}
                            {hasMore && (
                                <button
                                    onClick={loadMore}
                                    disabled={loading}
                                    className="shrink-0 w-32 sm:w-36 md:w-40 lg:w-44 xl:w-52 2xl:w-60 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full flex flex-col items-center justify-center group min-h-[200px] sm:min-h-[220px] md:min-h-60 lg:min-h-[250px] border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
                                >
                                    {loading ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-blue-600"></div>
                                            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                Loading...
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            <span className="text-xs sm:text-sm font-medium">
                                                Load More
                                            </span>
                                            <ChevronRight size={16} />
                                        </div>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
