import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("authToken");
    const handleLogout = () => {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("userId");
        navigate("/login");
    };

    return (
        <nav className="p-4 text-white flex justify-between fixed top-0 left-0 w-full z-10" style={{ backgroundColor: '#123458' }}>
            <div className="flex flex-col-1">
                <h2 className="text-2xl font-bold">CountryNest</h2>
                <img src="/logo.png" alt="flag" className="h-8 w-8 object-cover" />
            </div>
            <div>
                {token ? (
                    <button onClick={handleLogout} className="bg-red-500 p-2 rounded text-white">Logout</button>
                ) : (
                    <Link to="/login" className="bg-blue-500 p-2 rounded text-white">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
