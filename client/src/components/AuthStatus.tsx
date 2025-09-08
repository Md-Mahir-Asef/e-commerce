import { CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config/config";
import ProfileDropDownMenu from "./ProfileDropDownMenu";
import { Link } from "react-router-dom";

export default function AuthStatus() {
    const [name, setName] = useState("Account");
    const [id, setId] = useState("Not_set");
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_BASE_URL}/auth/me`,
                    { withCredentials: true }
                );
                if (
                    response.status === 401 ||
                    response.data.authenticated === false
                ) {
                    throw new Error("Unauthenticated.");
                }
                const userName: string = response.data.data.user_name;
                const userId: string = response.data.data.user_id;
                setName(userName.slice(0, 10));
                setId(userId);
                setAuthenticated(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const logOutHandler = async () => {
        try {
            const response = await axios.post(
                `${config.VITE_SERVER_BASE_URL}/auth/logout/${id}`,
                {},
                { withCredentials: true }
            );
            if (
                response.status === 401 ||
                response.data.authenticated === false
            ) {
                throw new Error("Unauthenticated.");
            }
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            {authenticated ? (
                <ProfileDropDownMenu
                    name={name}
                    id={id}
                    logoutHandler={logOutHandler}
                />
            ) : (
                <Link to={"/login"} className="flex flex-row p-3">
                    <CircleUserRound /> <p> {name}</p>
                </Link>
            )}
        </div>
    );
}
