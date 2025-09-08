import { Search } from "lucide-react";
import CategoryDropDownMenu from "./CategoryDropDownMenu";

export default function SearchBar() {
    return (
        <>
            {/*Search Bar on Desktop (Search Bar on Mobile is in /src/components/UtilMenu.tsx)*/}
            <div
                className={`border-2 border-[#BCE3C9] rounded-sm p-2 px-3 ml-3 flex flex-1 flex-row [@media(max-width:1370px)]:hidden`}
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
                <div className="flex flex-row flex-1">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="px-10 pr-10 text-lg outline-none w-full flex-1"
                        placeholder="Search for items..."
                    />
                    <Search
                        className="opacity-75 pt-2 text-lg my-auto mb-3 cursor-pointer"
                        width={30}
                        height={30}
                    />
                </div>
            </div>
        </>
    );
}
