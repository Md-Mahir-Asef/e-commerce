// src/components/AdminSidebar.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Home,
    Users,
    ShoppingCart,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Plus,
    List,
    Menu,
    X,
    Sun,
    Moon,
} from "lucide-react";
import type { JSX } from "react";

interface MenuItem {
    label: string;
    icon?: JSX.Element;
    path?: string;
    subItems?: { label: string; path: string; icon?: JSX.Element }[];
    isThemeToggle?: boolean; // flag for theme toggle menu item
}

export default function DashboardSideBar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dark, setDark] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "dark") return true;
            if (savedTheme === "light") return false;
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    });

    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

    // update dark mode in document
    const toggleTheme = () => {
        const root = window.document.documentElement;
        const newDark = !dark;
        setDark(newDark);
        if (newDark) root.classList.add("dark");
        else root.classList.remove("dark");
        localStorage.setItem("theme", newDark ? "dark" : "light");
    };

    const menuItems: MenuItem[] = [
        {
            label: "Dashboard",
            icon: <Home size={18} />,
            path: "/admin/dashboard",
        },
        {
            label: "Users",
            icon: <Users size={18} />,
            subItems: [
                {
                    label: "List Users",
                    path: "/admin/users/list",
                    icon: <List size={16} />,
                },
                {
                    label: "Create User",
                    path: "/admin/users/create",
                    icon: <Plus size={16} />,
                },
            ],
        },
        {
            label: "Orders",
            icon: <ShoppingCart size={18} />,
            path: "/admin/orders",
        },
        {
            label: "Settings",
            icon: <Settings size={18} />,
            path: "/admin/settings",
        },
        { label: "Logout", icon: <LogOut size={18} />, path: "/logout" },
        {
            label: "Theme",
            icon: dark ? <Sun size={18} /> : <Moon size={18} />,
            isThemeToggle: true,
        },
    ];

    const renderMenuItem = (item: MenuItem) => {
        if (item.isThemeToggle) {
            return (
                <div
                    key={item.label}
                    className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700`}
                    onClick={toggleTheme}
                >
                    {item.icon}
                    {isOpen && <span>{dark ? "Light Mode" : "Dark Mode"}</span>}
                </div>
            );
        }

        if (item.path) {
            return (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        location.pathname === item.path
                            ? "bg-gray-300 dark:bg-gray-800"
                            : ""
                    }`}
                >
                    {item.icon}
                    {isOpen && <span>{item.label}</span>}
                </Link>
            );
        } else {
            return (
                <div key={item.label} className="flex flex-col">
                    <div className="flex items-center gap-3 p-3 cursor-pointer rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                        {item.icon}
                        {isOpen && <span>{item.label}</span>}
                    </div>
                    {isOpen &&
                        item.subItems?.map((sub) => (
                            <Link
                                key={sub.path}
                                to={sub.path}
                                className={`flex items-center gap-2 pl-10 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                                    location.pathname === sub.path
                                        ? "bg-gray-300 dark:bg-gray-800"
                                        : ""
                                }`}
                            >
                                {sub.icon}
                                <span>{sub.label}</span>
                            </Link>
                        ))}
                </div>
            );
        }
    };

    return (
        <>
            {/* Mobile Hamburger */}
            <div className="sm:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                <span className="font-bold text-lg">Admin Panel</span>
                <button onClick={toggleMobileSidebar}>
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Desktop Sidebar */}
            <div
                className={`hidden sm:flex flex-col transition-all duration-300 ${
                    isOpen ? "w-64" : "w-20"
                } bg-background dark:bg-gray-900 text-gray-900 dark:text-white h-screen`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    {isOpen && (
                        <span className="font-bold text-lg">Admin Panel</span>
                    )}
                    <button onClick={toggleSidebar}>
                        {isOpen ? (
                            <ChevronLeft size={18} />
                        ) : (
                            <ChevronRight size={18} />
                        )}
                    </button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 flex flex-col mt-4">
                    {menuItems.map(renderMenuItem)}
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileOpen && (
                <div className="sm:hidden fixed inset-0 bg-black bg-opacity-40 z-50">
                    <div className="fixed left-0 top-0 w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white h-full shadow-lg p-4 z-50 overflow-y-auto">
                        {/* Close Button */}
                        <div className="flex justify-end mb-4">
                            <button onClick={toggleMobileSidebar}>
                                <X size={24} />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div className="flex flex-col gap-1">
                            {menuItems.map(renderMenuItem)}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
