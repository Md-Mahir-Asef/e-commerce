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
            <div className="p-4 bg-background min-h-screen">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-background min-h-screen">
                <div className="text-center py-8">
                    <p className="text-destructive mb-4">{error}</p>
                    <button
                        onClick={refetch}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-background min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Product List
                </h1>
                <button
                    onClick={handleAddProduct}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors"
                >
                    <Plus size={20} />
                    Add Product
                </button>
            </div>

            <div className="bg-card rounded-lg shadow-md border">
                {/* Search Bar */}
                <div className="p-4 border-b">
                    <div className="relative max-w-md">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-secondary border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
