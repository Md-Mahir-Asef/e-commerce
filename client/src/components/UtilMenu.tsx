import { Heart, ShoppingCart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import ThemeToggle from './ThemeToggle';

export default function UtilMenu() {
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
                <div className="flex flex-row p-3">
                    <ShoppingCart /> <p>Cart</p>
                </div>
            </div>
            <AuthStatus />
        </div>
    );
}
