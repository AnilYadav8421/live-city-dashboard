// src/components/layout/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isActive = (path) =>
        location.pathname === path
            ? "text-blue-600 font-semibold"
            : "text-gray-600 hover:text-blue-600";

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <h1 className="text-xl font-extrabold text-gray-800 tracking-wide">
                    LiveCity
                </h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className={isActive("/")}>
                        Dashboard
                    </Link>
                    <Link to="/countries" className={isActive("/countries")}>
                        Countries
                    </Link>
                    <Link to="/live-notes" className={isActive("/live-notes")}>
                        Live Notes
                    </Link>

                    {/* User */}
                    <span className="text-sm text-blue-500">
                        Hi, {user?.username}
                    </span>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium shadow hover:opacity-90 transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Mobile Button */}
                <button
                    className="md:hidden text-gray-700 text-2xl"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden px-6 pb-6">
                    <div className="bg-white rounded-2xl shadow-lg p-4 space-y-4">
                        <Link
                            to="/"
                            className="block text-gray-700"
                            onClick={() => setOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/countries"
                            className="block text-gray-700"
                            onClick={() => setOpen(false)}
                        >
                            Countries
                        </Link>
                        <Link
                            to="/live-notes"
                            className="block text-gray-700"
                            onClick={() => setOpen(false)}
                        >
                            Live Notes
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="w-full py-2 rounded-xl bg-red-500 text-white font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
