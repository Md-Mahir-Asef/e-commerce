import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { config } from "@/config/config";
import type { Product } from "./useProductsByCategory";

// interface SearchResponse {
//     data: Product[];
//     pagination: {
//         page: number;
//         limit: number;
//         totalPages: number;
//         totalItems: number;
//     };
// }

interface UseSearchReturn {
    products: Product[];
    loading: boolean;
    error: string | null;
    query: string;
    page: number;
    limit: number;
    sort: string;
    totalPages: number;
    totalItems: number;
    setQuery: (query: string) => void;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setSort: (sort: string) => void;
    search: (
        searchQuery?: string,
        searchPage?: number,
        searchLimit?: number,
        searchSort?: string,
    ) => void;
}

export function useSearch(): UseSearchReturn {
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // Get values from URL or use defaults
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sort = searchParams.get("sort") || "newest";

    const updateUrl = useCallback(
        (
            newQuery: string,
            newPage: number,
            newLimit: number,
            newSort: string,
        ) => {
            const params = new URLSearchParams();

            if (newQuery.trim()) {
                params.set("q", newQuery.trim());
            }
            if (newPage !== 1) {
                params.set("page", newPage.toString());
            }
            if (newLimit !== 10) {
                params.set("limit", newLimit.toString());
            }
            if (newSort !== "newest") {
                params.set("sort", newSort);
            }

            setSearchParams(params);
        },
        [setSearchParams],
    );

    const search = useCallback(
        async (
            searchQuery?: string,
            searchPage?: number,
            searchLimit?: number,
            searchSort?: string,
        ) => {
            const finalQuery = searchQuery ?? query;
            const finalPage = searchPage ?? page;
            const finalLimit = searchLimit ?? limit;
            const finalSort = searchSort ?? sort;

            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(
                    `${config.VITE_SERVER_BASE_URL}/product/products/search`,
                    {
                        params: {
                            q: finalQuery.trim() || undefined,
                            page: finalPage,
                            limit: finalLimit,
                            sort: finalSort,
                        },
                        withCredentials: true,
                    },
                );
                console.log(response.data.data.data);
                setProducts(response.data.data.data || []);
                setTotalPages(response.data.data.pagination?.totalPages || 1);
                setTotalItems(response.data.data.pagination?.totalItems || 0);
            } catch (err) {
                console.error("Failed to search products:", err);
                setError("Failed to search products");
                setProducts([]);
                setTotalPages(1);
                setTotalItems(0);
            } finally {
                setLoading(false);
            }
        },
        [query, page, limit, sort],
    );

    // Update URL when search parameters change
    const setQuery = useCallback(
        (newQuery: string) => {
            updateUrl(newQuery, 1, limit, sort);
        },
        [updateUrl, limit, sort],
    );

    const setPage = useCallback(
        (newPage: number) => {
            updateUrl(query, newPage, limit, sort);
        },
        [updateUrl, query, limit, sort],
    );

    const setLimit = useCallback(
        (newLimit: number) => {
            updateUrl(query, 1, newLimit, sort);
        },
        [updateUrl, query, sort],
    );

    const setSort = useCallback(
        (newSort: string) => {
            updateUrl(query, 1, limit, newSort);
        },
        [updateUrl, query, limit],
    );

    // Perform search when URL parameters change
    useEffect(() => {
        search();
    }, [search]);

    return {
        products,
        loading,
        error,
        query,
        page,
        limit,
        sort,
        totalPages,
        totalItems,
        setQuery,
        setPage,
        setLimit,
        setSort,
        search,
    };
}
