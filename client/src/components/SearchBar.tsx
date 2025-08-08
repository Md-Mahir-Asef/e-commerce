import { Search } from "lucide-react";
import DropdownMenu from "./DropDownMenu";

export default function SearchBar() {
    return (
        <div className="border-2 border-[#BCE3C9] rounded-sm flex flex-row p-2 px-3 ml-7 w-fit">
            <DropdownMenu
                options={[
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
            <div className="flex flex-row">
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="px-10 pr-32 text-lg outline-none"
                    placeholder="Search for items..."
                />
                <Search className="opacity-75 pt-2 text-lg my-auto mb-3" />
            </div>
        </div>
    );
}
