import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryDropDownMenu from "./CategoryDropDownMenu";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(
                `/search?q=${encodeURIComponent(searchQuery.trim().toLowerCase())}`,
            );
        }
    };

    return (
        <>
            {/*Search Bar on Desktop (Search Bar on Mobile is in /src/components/UtilMenu.tsx)*/}
            <form onSubmit={handleSearch}>
                <div
                    className={`border-2 border-[#BCE3C9] rounded-sm p-2 px-3 ml-3 flex flex-1 flex-row dark:bg-gray-900 [@media(max-width:1370px)]:hidden`}
                >
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
                    />
                    <div className="border-2 border-transparent border-l-gray-300" />
                    <div className="flex flex-row flex-1 dark:bg-gray-900">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-10 pr-10 text-lg outline-none w-full flex-1 dark:bg-gray-900"
                            placeholder="Search for items..."
                        />
                        <button type="submit" className="pt-2">
                            <Search
                                className="opacity-75 pt-2 text-lg my-auto mb-3 cursor-pointer hover:opacity-100 transition-opacity"
                                width={30}
                                height={30}
                            />
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
