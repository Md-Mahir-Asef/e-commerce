import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "@/config/config";

interface Category {
  id: number;
  name: string;
}

interface CategoriesResponse {
  data: Category[];
}

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get<CategoriesResponse>(
        `${config.VITE_SERVER_BASE_URL}/product/categories`,
        { withCredentials: true }
      );
      
      // Extract category names and add "All Categories" at the beginning
      const categoryNames = response.data.data.map((category) => category.name);
      const allCategories = ["All Categories", ...categoryNames];
      
      setCategories(allCategories);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('Failed to load categories');
      setCategories(["All Categories"]); // Fallback to just All Categories
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
}

export type { Category };
