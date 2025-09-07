import { CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config/config";
import ProfileDropDownMenu from "./ProfileDropDownMenu";

export default function AuthStatus() {
    const [name, setName] = useState("Account");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_BASE_URL}/auth/me`,
                    { withCredentials: true }
                );
                const userName: string = response.data.data.user_name;
                setName(userName.slice(0, 10));
                if (
                    response.status === 401 ||
                    response.data.authenticated === false
                ) {
                    throw new Error("Unauthenticated.");
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <ProfileDropDownMenu
                label={
                    <div className="flex flex-row p-3">
                        <CircleUserRound /> <p> {name}</p>
                    </div>
                }
                items={[
                    { name: "Profile", onClick: () => console.log("Profile") },
                    { name: <p className="text-red-700">Logout</p>, onClick: () => console.log("Logout") },
                ]}
                width={100}
            />
        </div>
    );
}
