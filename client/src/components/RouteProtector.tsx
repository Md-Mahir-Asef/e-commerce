import type { ReactNode } from "react";
import axios from "axios";
import { config } from "@/config/config";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

type userRole = "admin" | "user" | "visitor" | "unauthenticated";

export default function RouteProtector({
    roles,
    children,
    redirectionUrl,
}: {
    roles: userRole[];
    children: ReactNode;
    redirectionUrl: string;
}) {
    const [user_role, setUser_role] = useState<userRole | null>(null);
    const permitted_roles = new Set<userRole>(roles);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_BASE_URL}/auth/me`,
                    { withCredentials: true }
                );
                if (response.data.authenticated === false) {
                    throw new Error("Unauthenticated.");
                }
                setUser_role(response.data.data.role as userRole);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.log("Axios Error: ", err.response?.data);
                } else {
                    console.log("Error: ", err);
                }
                setUser_role("unauthenticated");
                toast.error(
                    "Unauthenticated User Can't Access Admin Dashboard Page."
                );
            }
        };
        fetchData();
    }, []);

    if (user_role === null) {
        return (
            <div className="flex items-center justify-center h-screen text-9xl">
                Loading...
            </div>
        );
    }

    if (!permitted_roles.has(user_role)) {
        return <Navigate to={redirectionUrl} replace />;
    }

    if (user_role === "unauthenticated") {
        return (
            <>
                <Navigate to={redirectionUrl} replace />
            </>
        );
    }

    return <>{children}</>;
}
