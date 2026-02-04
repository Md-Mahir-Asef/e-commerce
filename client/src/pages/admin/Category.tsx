import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { config } from "@/config/config";
import CategoryAddBar from "@/components/admin/CategoryAddBar";
import CategoryList, {
    type Category as CategoryType,
} from "@/components/admin/CategoryList";

export default function Category() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [renamingId, setRenamingId] = useState<number | null>(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_BASE_URL}/product/categories`,
                    { withCredentials: true }
                );
                const data = Array.isArray(response.data?.data)
                    ? response.data.data
                    : [];
                setCategories(data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load categories.");
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    const handleAddCategory = async (name: string) => {
        setAdding(true);
        try {
            const response = await axios.post(
                `${config.VITE_SERVER_BASE_URL}/product/category`,
                { name },
                { withCredentials: true }
            );
            const created = response.data?.data as CategoryType | undefined;
            if (created) {
                setCategories((prev) => [...prev, created]);
            }
            toast.success("Category created successfully.");
        } catch (err: unknown) {
            const message =
                err && typeof err === "object" && "response" in err
                    ? (
                          err as {
                              response?: { data?: { message?: string } };
                          }
                      ).response?.data?.message
                    : "Failed to create category.";
            toast.error(message || "Failed to create category.");
        } finally {
            setAdding(false);
        }
    };

    const handleRenameCategory = async (id: number, newName: string) => {
        setRenamingId(id);
        try {
            const response = await axios.put(
                `${config.VITE_SERVER_BASE_URL}/product/category/${id}`,
                { data: { new_name: newName } },
                { withCredentials: true }
            );
            const updated = response.data?.data as CategoryType | undefined;
            if (updated) {
                setCategories((prev) =>
                    prev.map((c) => (c.id === id ? updated : c))
                );
            } else {
                setCategories((prev) =>
                    prev.map((c) => (c.id === id ? { ...c, name: newName } : c))
                );
            }
            toast.success("Category name updated.");
        } catch (err: unknown) {
            const message =
                err && typeof err === "object" && "response" in err
                    ? (
                          err as {
                              response?: { data?: { message?: string } };
                          }
                      ).response?.data?.message
                    : "Failed to update category.";
            toast.error(message || "Failed to update category.");
        } finally {
            setRenamingId(null);
        }
    };

    const handleDeleteCategory = async (id: number) => {
        try {
            await axios.delete(
                `${config.VITE_SERVER_BASE_URL}/product/category/${id}`,
                { withCredentials: true }
            );
            setCategories((prev) => prev.filter((c) => c.id !== id));
            toast.success("Category deleted successfully.");
        } catch (err: unknown) {
            const message =
                err && typeof err === "object" && "response" in err
                    ? (
                          err as {
                              response?: { data?: { message?: string } };
                          }
                      ).response?.data?.message
                    : "Failed to delete category.";
            toast.error(message || "Failed to delete category.");
        }
    };

    return (
        <div className="space-y-6 mr-2">
            <header className="flex flex-col gap-1">
                <h1 className="text-3xl font-semibold tracking-tight">
                    Categories
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage product categories. Add new ones and rename existing
                    ones in-place.
                </p>
            </header>

            <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-sm">
                <div className="flex flex-col gap-6">
                    <CategoryAddBar
                        onAdd={handleAddCategory}
                        loading={adding}
                    />

                    <div>
                        {loading ? (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Loading categories…
                            </p>
                        ) : (
                            <CategoryList
                                categories={categories}
                                onRename={handleRenameCategory}
                                onDelete={handleDeleteCategory}
                                renamingId={renamingId}
                            />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
