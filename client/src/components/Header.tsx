import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import UtilMenu from "./UtilMenu";
import { Menu } from "lucide-react";
import SlideMenu from "./SlideMenu";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <section className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 sm:py-4 md:py-5 border border-transparent border-b-gray-300 flex flex-row justify-between items-center relative bg-gray-50 dark:bg-gray-900 w-full">
            <Menu
                className="hidden pl-2 sm:flex md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                size={28}
            />
            <Link
                className="flex flex-row ml-0 sm:ml-[2%] shrink-0 mx-auto sm:mx-0"
                to={"/"}
            >
                <img
                    src="/images/logo.png"
                    alt="logo"
                    width={32}
                    height={32}
                    className="sm:w-10 sm:h-10 md:w-12 md:h-12"
                />
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl pt-2 sm:pt-3 text-[#3BB77E] font-extrabold hidden sm:block">
                    E-commerce
                </h2>
            </Link>
            <SearchBar />
            <UtilMenu />
            <SlideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </section>
    );
}
