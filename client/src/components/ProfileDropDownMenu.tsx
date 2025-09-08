import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileDropDownMenu({
    name,
    id,
    logoutHandler,
}: {
    name: string;
    id: string;
    logoutHandler: () => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex flex-row p-3 cursor-default">
                    <CircleUserRound /> <p> {name}</p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <Link to={`/profile/${id}`}>
                    <DropdownMenuItem> My Profile </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                    className="text-red-700 hover:text-red-900"
                    onClick={logoutHandler}
                >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
