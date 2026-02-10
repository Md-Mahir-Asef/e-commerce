import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useSearch } from "@/hooks/useSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CategoryDropDownMenu from "@/components/CategoryDropDownMenu";

export default function Search() {
    const {
        products,
        loading,
        error,
        query,
        category,
        page,
        limit,
        sort,
        totalPages,
        totalItems,
        setQuery,
        setCategory,
        setPage,
        setLimit,
        setSort,
    } = useSearch();

    const [inputValue, setInputValue] = useState(query);

    // Update input when URL query changes
    useEffect(() => {
        setInputValue(query);
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setQuery(inputValue);
    };

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return (
            <>
                <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>

                    {startPage > 1 && (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(1)}
                            >
                                1
                            </Button>
                            {startPage > 2 && <span className="px-2">...</span>}
                        </>
                    )}

                    {pages.map((pageNum) => (
                        <Button
                            key={pageNum}
                            variant={pageNum === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(pageNum)}
                        >
                            {pageNum}
                        </Button>
                    ))}

                    {endPage < totalPages && (
                        <>
                            {endPage < totalPages - 1 && (
                                <span className="px-2">...</span>
                            )}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(totalPages)}
                            >
                                {totalPages}
                            </Button>
                        </>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </>
        );
    };

    const renderLoadingState = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: limit }).map((_, index) => (
                <div key={index} className="space-y-4">
                    <Skeleton className="aspect-square rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
        </div>
    );

    const renderEmptyState = () => {
        if (!query.trim() && category === "All Categories") {
            return (
                <div className="text-center py-12">
                    <SearchIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                        All Products
                    </h2>
                    <p className="text-muted-foreground">
                        Browse all available products or use filters to narrow
                        your search
                    </p>
                </div>
            );
        }

        if (!query.trim() && category !== "All Categories") {
            return (
                <div className="text-center py-12">
                    <SearchIcon className="mx-auto h-12 w-12 text-foreground mb-4" />
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                        No products found
                    </h2>
                    <p className="text-muted-foreground">
                        No products found in "{category}" category
                    </p>
                    <p className="text-muted-foreground/70 text-sm mt-2">
                        Try selecting a different category or adding search
                        keywords
                    </p>
                </div>
            );
        }

        return (
            <>
                <div className="text-center py-12">
                    <SearchIcon className="mx-auto h-12 w-12 text-foreground mb-4" />
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                        No products found
                    </h2>
                    <p className="text-muted-foreground">
                        No products found for "{query}"
                        {category !== "All Categories" && (
                            <span> in "{category}" category</span>
                        )}
                    </p>
                    <p className="text-muted-foreground/70 text-sm mt-2">
                        Try different keywords or browse categories
                    </p>
                </div>
            </>
        );
    };

    const renderErrorState = () => (
        <div className="text-center py-12">
            <div className="text-red-500 mb-4">
                <SearchIcon className="mx-auto h-12 w-12" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
                Search failed
            </h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try again</Button>
        </div>
    );

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8 w-full dark:bg-gray-900">
                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-6">
                        Search Products
                    </h1>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="flex gap-4 mb-6">
                        <CategoryDropDownMenu
                            categories={[
                                "All Categories",
                                "Grocery",
                                "Dairy",
                                "Clothing",
                                "Toys",
                                "Pets",
                                "Electronics",
                                "Gadgets",
                                "Trending",
                            ]}
                            width={175}
                            onCategoryChange={handleCategoryChange}
                        />
                        <div className="flex-1 relative">
                            <Input
                                type="text"
                                placeholder="Search for products..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="pl-10"
                            />
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        <Button type="submit" disabled={loading}>
                            Search
                        </Button>
                    </form>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="sort"
                                className="text-sm font-medium text-foreground"
                            >
                                Sort by:
                            </label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-32 justify-start"
                                    >
                                        {sort === "newest"
                                            ? "Newest"
                                            : sort === "price_asc"
                                              ? "Price: Low to High"
                                              : "Price: High to Low"}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        onClick={() => setSort("newest")}
                                    >
                                        Newest
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSort("price_asc")}
                                    >
                                        Price: Low to High
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSort("price_desc")}
                                    >
                                        Price: High to Low
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="limit"
                                className="text-sm font-medium text-foreground"
                            >
                                Show:
                            </label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-20 justify-start"
                                    >
                                        {limit}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        onClick={() => setLimit(10)}
                                    >
                                        10
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setLimit(20)}
                                    >
                                        20
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setLimit(50)}
                                    >
                                        50
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {(query || category !== "All Categories") && (
                            <div className="text-sm text-muted-foreground">
                                {totalItems}{" "}
                                {totalItems === 1 ? "product" : "products"}{" "}
                                found
                                {category !== "All Categories" && (
                                    <span> in "{category}"</span>
                                )}
                                {query && category !== "All Categories" && (
                                    <span> for "{query}"</span>
                                )}
                                {query && category === "All Categories" && (
                                    <span> for "{query}"</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Results */}
                <div className="w-full">
                    {loading && renderLoadingState()}

                    {!loading && error && renderErrorState()}

                    {!loading &&
                        !error &&
                        products.length === 0 &&
                        renderEmptyState()}

                    {!loading && !error && products.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>

                            {renderPagination()}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
