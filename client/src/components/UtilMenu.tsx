import { Heart, ShoppingCart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import ThemeToggle from "./ThemeToggle";
import { useCartItemCount } from "@/hooks/useCartItemCount";

export default function UtilMenu() {
    const cartItemCount = useCartItemCount();

    return (
        <div className="flex flex-row pt-2 shrink-0">
            <div className="flex flex-row [@media(max-width:980px)]:hidden">
                <ThemeToggle />
                {/* Search Bar on Mobile (Search Bar on Desktop is in /src/components/SearchBar.tsx) */}
                <div className="flex flex-row p-3 [@media(min-width:1370px)]:hidden">
                    <Link to={"/search"}>
                        <Search />
                    </Link>
                    <p>Search</p>
                </div>
                <div className="flex flex-row p-3">
                    <Heart /> <p>Favorites</p>
                </div>
                <Link
                    to="/cart"
                    className="flex flex-row p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative"
                >
                    <ShoppingCart />
                    <p>Cart</p>
                    {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                            {cartItemCount > 99 ? "99+" : cartItemCount}
                        </span>
                    )}
                </Link>
            </div>
            <AuthStatus />
        </div>
    );
}
