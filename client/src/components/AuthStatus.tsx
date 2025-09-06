import { Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config/config";

export default function AuthStatus() {
    const [name, setName] = useState("Account");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_BASE_URL}/auth/me`,
                    { withCredentials: true }
                );
                setName("Mahir");
                console.log(response);
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
            <Link to="/login" className="flex flex-row p-3">
                <CircleUserRound /> <p>{name}</p>
            </Link>
        </div>
    );
}
