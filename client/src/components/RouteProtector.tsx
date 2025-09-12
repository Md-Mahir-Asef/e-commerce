import type { ReactNode } from "react";
import axios from "axios";
import { config } from "@/config/config";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function RouteProtector({
    roles,
    children,
    redirectionUrl,
}: {
    roles: ("user" | "admin" | "visitor")[];
    children: ReactNode;
    redirectionUrl: string;
}) {
    const [user_role, setUser_role] = useState<
        undefined | "admin" | "user" | "visitor"
    >(undefined);
    const permitted_roles = new Set<"user" | "admin" | "visitor">(roles);
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
                setUser_role(response.data.data.role);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    if (user_role === undefined || !permitted_roles.has(user_role)) {
        return <Navigate to={redirectionUrl} replace />;
    }
    return <>{children}</>;
}
