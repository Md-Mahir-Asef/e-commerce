import { X, Heart, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function SlideMenu({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={onClose}
            ></div>
            {/* Slide-in Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-full bg-background text-foreground z-50 transform transition-transform duration-300 shadow-lg ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4">
                    <Link className="flex flex-row" to={"/"}>
                        <img
                            src="/images/logo.png"
                            alt="logo"
                            width={50}
                            height={50}
                        />
                        <h2 className="text-2xl pt-3 text-[#3BB77E] font-extrabold">
                            E-commerce
                        </h2>
                    </Link>
                    <button onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className="h-[0.25px] bg-black dark:bg-white" />

                {/* Menu Items */}
                <div className="flex flex-col">
                    <ThemeToggle />
                    <div className="flex flex-row p-3">
                        <Link to={"/search"}>
                            <Search />
                        </Link>
                        <p>Search</p>
                    </div>
                    <div className="flex flex-row p-3">
                        <Heart /> <p>Favorites</p>
                    </div>
                    <div className="flex flex-row p-3">
                        <ShoppingCart /> <p>Cart</p>
                    </div>
                </div>
            </div>
        </>
    );
}
