import { useState, useEffect } from "react";
import axios from "axios";
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

interface ProductsResponse {
  data: Product[];
}

export function useProductsByCategory(categoryId: number, page: number = 1, limit: number = 4) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get<ProductsResponse>(
        `${config.VITE_SERVER_BASE_URL}/product/category/${categoryId}/products/${pageNum}/${limit}`,
        { withCredentials: true }
      );
      
      const newProducts = response.data.data || [];
      
      if (pageNum === 1) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }
      
      // If we got less products than the limit, there are no more products
      setHasMore(newProducts.length === limit);
      
    } catch (err) {
      console.error('Failed to fetch products by category:', err);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchProducts(page);
    }
  }, [categoryId, page, limit]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = Math.floor(products.length / limit) + 1;
      fetchProducts(nextPage);
    }
  };

  const reset = () => {
    setProducts([]);
    setHasMore(true);
    fetchProducts(1);
  };

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
  };
}

export type { Product };
