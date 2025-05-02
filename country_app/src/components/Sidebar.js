import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react"; // Optional: Lucide icon for hamburger menu

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Toggle Button - visible on small screens */}
            <button
                className="md:hidden fixed mt-16 left-4 z-50 text-white bg-blue-600 p-2 rounded"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu />
            </button>

            {/* Sidebar */}
            <div className={`fixed mt-16 left-0 h-full z-40 transition-transform duration-300 md:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:w-64 w-64 bg-[#123458] text-white p-4 pt-16 md:pt-20`}>
                <ul>
                    {[
                        { to: "/", label: "Dashboard" },
                        { to: "/list", label: "Country List" },
                        { to: "/favorites", label: "Favorites" },
                    ].map(({ to, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `block py-2 px-4 rounded-lg ${isActive ? "bg-blue-500" : "hover:bg-blue-500"
                                    } transition-all duration-200 pb-4 mb-3`
                                }
                                onClick={() => setIsOpen(false)} // Close on nav click
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
