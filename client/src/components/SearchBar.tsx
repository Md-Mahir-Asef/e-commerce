import { Search } from "lucide-react";
export default function SearchBar() {
    return (
        <div className="border-2 border-[#BCE3C9] rounded-sm flex flex-row p-2 px-3 ml-7">
            <select name="categories" id="categories">
                <option value="">All Categories</option>
                <option value="Grocery">Grocery</option>
                <option value="Dairies">Dairies</option>
                <option value="Clothing">Clothing</option>
                <option value="Fruits">Fruits</option>
                <option value="Toys">Toys</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Sports">Sports</option>
            </select>
            <div className="flex flex-row">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search for items..."
                />
                <Search />
            </div>
        </div>
    );
}
