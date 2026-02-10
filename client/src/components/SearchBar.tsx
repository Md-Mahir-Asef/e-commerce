import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryDropDownMenu from "./CategoryDropDownMenu";
import { useCategories } from "@/hooks/useCategories";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const navigate = useNavigate();
    const { categories } = useCategories();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (searchQuery.trim()) {
            params.set("q", searchQuery.trim().toLowerCase());
        }
        if (selectedCategory.trim() && selectedCategory !== "All Categories") {
            params.set("category", selectedCategory.trim());
        }

        const queryString = params.toString();
        navigate(`/search${queryString ? `?${queryString}` : ""}`);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <>
            {/*Search Bar on Desktop (Search Bar on Mobile is in /src/components/UtilMenu.tsx)*/}
            <form onSubmit={handleSearch}>
                <div className="border-2 border-[#BCE3C9] rounded-sm p-2 px-2 sm:p-2 sm:px-3 ml-1 sm:ml-3 flex-1 flex-row dark:bg-gray-900 hidden lg:flex lg:flex-1">
                    <CategoryDropDownMenu
                        categories={categories}
                        width={175}
                        onCategoryChange={handleCategoryChange}
                    />
                    <div className="border-2 border-transparent border-l-gray-300" />
                    <div className="flex flex-row flex-1 dark:bg-gray-900">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-3 sm:px-6 sm:pr-10 text-sm sm:text-lg outline-none w-full flex-1 dark:bg-gray-900"
                            placeholder="Search for items..."
                        />
                        <button type="submit" className="p-1 sm:p-2">
                            <Search
                                className="opacity-75 text-sm sm:text-lg cursor-pointer hover:opacity-100 transition-opacity"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
