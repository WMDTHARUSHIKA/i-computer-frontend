import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";

export default function UserData() {
    const [user, setUser] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios
            .get(import.meta.env.VITE_API_URL + "/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data);
                setImageError(false);
            })
            .catch(() => {
                localStorage.removeItem("token");
                setUser(null);
            });
    }, []);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
        setOpenMenu(false);
        navigate("/login");
    }

    if (!user) {
        return (
            <div className="flex items-center gap-3">
                <Link
                    to="/login"
                    className="text-accent font-semibold hover:text-white/80 transition"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="bg-secondary text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition shadow-sm"
                >
                    Register
                </Link>
            </div>
        );
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu((prev) => !prev);
                }}
                className="flex items-center gap-2 rounded-xl px-2 py-1 text-accent hover:bg-white/10 transition"
            >
                {!imageError && user?.image ? (
                    <img
                        src={user.image}
                        alt="Profile"
                        onError={() => setImageError(true)}
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                ) : (
                    <FaRegUserCircle size={30} />
                )}

                <span className="hidden md:block font-semibold max-w-[140px] truncate">
                    {user?.firstName
                        ? `${user.firstName} ${user.lastName || ""}`.trim()
                        : "User"}
                </span>
            </button>

            {openMenu && (
                <div className="absolute right-0 top-full mt-3 w-[220px] bg-white rounded-lg shadow-xl z-[9999] border border-primary/10">
                    {user?.role !== "admin" && (
                        <Link
                            to="/my-orders"
                            className="block px-4 py-3 hover:bg-gray-100 text-primary"
                            onClick={() => setOpenMenu(false)}
                        >
                            My Orders
                        </Link>
                    )}

                    <Link
                        to="/settings"
                        className="block px-4 py-3 hover:bg-gray-100 text-primary"
                        onClick={() => setOpenMenu(false)}
                    >
                        Settings
                    </Link>

                    {user?.role === "admin" && (
                        <button
                            type="button"
                            onClick={() => {
                                navigate("/admin/");
                                setOpenMenu(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-100 text-primary"
                        >
                            Admin Panel
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={logout}
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}