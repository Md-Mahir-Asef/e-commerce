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

export function useProducts(page: number = 1, limit: number = 10) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get<ProductsResponse>(
        `${config.VITE_SERVER_BASE_URL}/product/products/${pageNum}/${limit}`,
        { withCredentials: true }
      );
      
      setProducts(response.data.data || []);
      
      // Calculate total pages (you might want to get this from the API)
      // For now, we'll assume there are more pages if we get a full page
      if (response.data.data.length === limit) {
        setTotalPages(pageNum + 10); // Rough estimate
      } else {
        setTotalPages(pageNum);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page, limit]);

  const deleteProduct = async (productId: number) => {
    try {
      await axios.delete(
        `${config.VITE_SERVER_BASE_URL}/product/product/${productId}`,
        { withCredentials: true }
      );
      
      // Refresh the current page
      await fetchProducts(page);
      return true;
    } catch (err) {
      console.error('Failed to delete product:', err);
      return false;
    }
  };

  return {
    products,
    loading,
    error,
    totalPages,
    deleteProduct,
    refetch: () => fetchProducts(page),
  };
}

export type { Product };
