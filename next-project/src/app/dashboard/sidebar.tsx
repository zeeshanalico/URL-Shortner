'use client'
import React, { useState } from "react";
import { FaChartBar, FaSearch, FaCalendarAlt, FaChevronLeft, FaKey, FaFolder, FaUser, FaSignOutAlt, FaUserCog, FaBars } from '../../../public/icons'
import { useDispatch } from "react-redux";
import { logout } from "../states/authSlice";
import { AppDispatch } from "../store/store";
import { useRouter } from "next/navigation";

interface MenuI {
    title: string;
    icon: React.ReactNode;
    gap?: boolean;
    href?: string;
}

interface SidebarI {
    className?: string;
}

const Sidebar = ({ className }: SidebarI) => {
    const [open, setOpen] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const Menus: MenuI[] = [
        { title: "Dashboard", icon: <FaChartBar />, href: "/dashboard" },
        { title: "Urls", icon: <FaSearch />, href: "/dashboard/url" },
        { title: "Pregenerate Url's", icon: <FaUser />, href: "/dashboard/reservedurl" },
        { title: "Logo Manager", icon: <FaCalendarAlt />, href: "/dashboard/logo" },
        { title: "Api Keys", icon: <FaKey />, href: "/dashboard/apikeys" },
        { title: "Reporting", icon: <FaFolder />, gap: true, href: "/dashboard/reporting" },
        { title: "Manage Users", icon: <FaUserCog />, href: "/dashboard/users" },
        { title: "Logout", icon: <FaSignOutAlt /> },
    ];

    const handleLogout = () => {
        dispatch(logout());
        router.replace('/signin');
    };

    const handleRouting = (Menu: MenuI) => {
        if (Menu.title === 'Logout') {
            handleLogout();
            return;
        }
        if (Menu.href) {
            router.replace(Menu.href);
        }
    };

    return (
        <div className={`${className} sticky top-0 left-0`}>
            <div className={` ${open ? "w-56" : "w-20"} p-5 bg-green-600 pt-8 relative duration-300 min-h-[100%]`}>
                <FaChevronLeft
                    className={`absolute cursor-pointer -right-3 top-9 w-7 bg-white border-dark-purple border-2 rounded-full text-gray-400 ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <h1 className={`text-white origin-left font-medium duration-200 ${!open && "scale-0"}`}>
                        TinyTrail
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            onClick={() => { handleRouting(Menu) }}
                            key={index}
                            className={`flex rounded-md p-2 cursor-pointer hover:bg-opacity-15 hover:bg-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu?.gap ? "mt-9" : "mt-2"}
               `}
                        >
                            <span className="text-xl">{Menu.icon}</span>
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
