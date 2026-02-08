import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import UtilMenu from "./UtilMenu";
import { Menu } from "lucide-react";
import SlideMenu from "./SlideMenu";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <section className="px-10 py-5 border border-transparent border-b-gray-300 flex flex-row justify-between items-center relative bg-gray-50 dark:bg-gray-900">
            <Menu
                className="hidden pl-2 [@media(max-width:980px)]:flex"
                onClick={() => setIsOpen(!isOpen)}
                size={37}
            />
            <Link
                className="flex flex-row ml-[2%] shrink-0 [@media(max-width:980px)]:mx-auto"
                to={"/"}
            >
                <img src="/images/logo.png" alt="logo" width={50} height={50} />
                <h2 className="text-4xl pt-3 text-[#3BB77E] font-extrabold [@media(max-width:820px)]:hidden">
                    E-commerce
                </h2>
            </Link>
            <SearchBar />
            <UtilMenu />
            <SlideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </section>
    );
}
