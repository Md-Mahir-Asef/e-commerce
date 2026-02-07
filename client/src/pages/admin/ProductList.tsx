import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductTable from "@/components/admin/ProductTable";
import Pagination from "@/components/admin/Pagination";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const { products, loading, error, totalPages, deleteProduct, refetch } =
        useProducts(currentPage, 10);

    const handleEdit = (product: any) => {
        navigate(`/admin/products/update/${product.id}`);
    };

    const handleDelete = async (productId: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const success = await deleteProduct(productId);
            if (success) {
                toast.success("Product deleted successfully");
            } else {
                toast.error("Failed to delete product");
            }
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleAddProduct = () => {
        navigate("/admin/products/create");
    };

    if (loading) {
        return (
            <div className="p-4 bg-gray-900 min-h-screen text-white">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-gray-900 min-h-screen text-white">
                <div className="text-center py-8">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={refetch}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-gray-900 min-h-screen text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Product List</h1>
                <button
                    onClick={handleAddProduct}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                    <Plus size={20} />
                    Add Product
                </button>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md">
                {/* Search Bar */}
                <div className="p-4 border-b border-gray-700">
                    <div className="relative max-w-md">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Product Table */}
                <div className="p-4">
                    <ProductTable
                        products={products.filter(
                            (product) =>
                                product.name
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase()) ||
                                product.description
                                    ?.toLowerCase()
                                    .includes(searchTerm.toLowerCase()),
                        )}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>

                {/* Pagination */}
                <div className="px-4 pb-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}
