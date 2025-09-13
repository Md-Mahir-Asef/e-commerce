import DashboardSideBar from "./DashboardSideBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="flex">
            <DashboardSideBar />
            <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
                <Outlet /> {/* Render child routes here */}
            </main>
        </div>
    );
}
