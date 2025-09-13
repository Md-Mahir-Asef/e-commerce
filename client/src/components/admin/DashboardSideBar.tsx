// src/components/AdminSidebar.tsx
import { useState } from "react";
import type { JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  List,
} from "lucide-react";

interface MenuItem {
  label: string;
  icon: JSX.Element;
  path?: string;
  subItems?: { label: string; path: string; icon?: JSX.Element }[];
}

export default function DashboardSideBar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems: MenuItem[] = [
    { label: "Dashboard", icon: <Home size={18} />, path: "/admin/dashboard" },
    {
      label: "Users",
      icon: <Users size={18} />,
      subItems: [
        { label: "List Users", path: "/admin/users/list", icon: <List size={16} /> }
      ],
    },
    { label: "Orders", icon: <ShoppingCart size={18} />, path: "/admin/orders" },
    { label: "Settings", icon: <Settings size={18} />, path: "/admin/settings" },
    { label: "Logout", icon: <LogOut size={18} />, path: "/admin/logout" },
  ];

  return (
    <div
      className={`bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header with toggle button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <span className="font-bold text-lg">Admin Panel</span>}
        <button onClick={toggleSidebar}>
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Menu items */}
      <div className="flex-1 flex flex-col mt-4">
        {menuItems.map((item) => (
          <div key={item.label} className="flex flex-col">
            {item.path ? (
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md ${
                  location.pathname === item.path ? "bg-gray-700" : ""
                }`}
              >
                {item.icon}
                {isOpen && <span>{item.label}</span>}
              </Link>
            ) : (
              <div className="flex flex-col">
                <div className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-700 rounded-md">
                  {item.icon}
                  {isOpen && <span>{item.label}</span>}
                </div>
                {isOpen &&
                  item.subItems?.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className={`flex items-center gap-2 pl-10 p-2 hover:bg-gray-700 rounded-md ${
                        location.pathname === sub.path ? "bg-gray-700" : ""
                      }`}
                    >
                      {sub.icon}
                      <span>{sub.label}</span>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
