import { Heart, ShoppingCart, User } from "lucide-react";

export default function UtilMenu() {
    return (
        <div className="flex flex-row pt-2 absolute right-0 pr-10">
            <div className="flex flex-row p-3">
                <Heart /> <p>Favorites</p>
            </div>
            <div className="flex flex-row p-3">
                <ShoppingCart /> <p>Cart</p>
            </div>
            <div className="flex flex-row p-3">
                <User /> <p>Account</p>
            </div>
        </div>
    );
}
