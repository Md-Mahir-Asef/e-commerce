import { ShoppingCart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import ThemeToggle from "./ThemeToggle";
import { useCartItemCount } from "@/hooks/useCartItemCount";

export default function UtilMenu() {
    const cartItemCount = useCartItemCount();

    return (
        <div className="flex flex-row pt-1 sm:pt-2 shrink-0">
            <div className="hidden md:flex flex-row">
                <ThemeToggle />
                {/* Search Bar on Mobile (Search Bar on Desktop is in /src/components/SearchBar.tsx) */}
                <div className="flex flex-row p-2 sm:p-3 lg:hidden">
                    <Link to={"/search"}>
                        <Search />
                    </Link>
                    Search
                </div>
                <Link
                    to="/cart"
                    className="flex flex-row p-3 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative pt-2"
                >
                    <ShoppingCart />
                    Cart
                    {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium">
                            {cartItemCount > 99 ? "99+" : cartItemCount}
                        </span>
                    )}
                </Link>
            </div>
            <AuthStatus />
        </div>
    );
}
