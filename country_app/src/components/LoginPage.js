import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config/config";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post(`${config.API_BASE_URL}/api/auth/signin`, { username, password })
            .then((response) => {
                const { token, id } = response.data;
                sessionStorage.setItem("authToken", token);
                sessionStorage.setItem("userId", id);
                navigate("/");
            })
            .catch(() => {
                setError("Invalid credentials. Please try again.");
            });
    };

    return (
        <div className="flex items-center justify-center h-[80vh] sm:h-screen bg-gray-100 px-4 py-4 top-4">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>

                {error && (
                    <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
                )}

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/register")}
                            className="text-blue-500 hover:text-blue-600 font-semibold"
                        >
                            Register here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
