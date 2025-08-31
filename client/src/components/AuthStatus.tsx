import { Link } from "react-router-dom";
import { User } from "lucide-react";
export default function AuthStatus() {
    return (
        <div>
            <Link to="/login" className="flex flex-row p-3">
                <User /> <p>Account</p>
            </Link>
        </div>
    );
}
