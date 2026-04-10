import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserData from "./UserData";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuPanelLeftClose } from "react-icons/lu";
import { getCart } from "../utils/cart";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUserRole(payload?.role || null);
            } catch {
                setUserRole(null);
            }
        } else {
            setUserRole(null);
        }

        const cart = getCart() || [];
        const totalQty = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
        setCartCount(totalQty);
    }, []);

    const showCart = userRole !== "admin";

    return (
        <header className="w-full sticky top-0 bg-[#1B0C0C] h-[90px] z-50 flex justify-center items-center shadow-md">
            <div className="h-full w-full lg:w-auto flex justify-center items-center absolute lg:left-10">
                <GiHamburgerMenu
                    onClick={() => setIsOpen(true)}
                    size={30}
                    color="white"
                    className="mr-6 lg:hidden cursor-pointer hover:scale-110 transition"
                />
                <img src="/logo.png" alt="Logo" className="h-[35px] lg:h-[50px]" />
                <h1 className="text-white text-lg lg:text-2xl font-bold ml-3">
                    Isuri Computers
                </h1>
            </div>

            <div className="h-full lg:flex justify-center items-center hidden">
                <Link to="/" className="text-white mx-4 hover:text-[#F1F0E9] transition">
                    Home
                </Link>
                <Link
                    to="/products"
                    className="text-white mx-4 hover:text-[#F1F0E9] transition"
                >
                    Products
                </Link>
                <Link
                    to="/about"
                    className="text-white mx-4 hover:text-[#F1F0E9] transition"
                >
                    About
                </Link>
                <Link
                    to="/contact"
                    className="text-white mx-4 hover:text-[#F1F0E9] transition"
                >
                    Contact
                </Link>
            </div>

            <div className="absolute right-10 hidden lg:flex h-full justify-center items-center gap-5">
                {showCart && (
                    <Link to="/cart" className="cursor-pointer hover:scale-110 transition relative">
                        <BiShoppingBag size={30} color="white" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] px-1 rounded-full bg-[#4C763B] text-white text-[11px] font-bold flex items-center justify-center shadow-md">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                )}

                <UserData />
            </div>

            {isOpen && (
                <div className="fixed bg-black/50 backdrop-blur-sm w-full h-screen top-0 left-0 z-50">
                    <div className="w-[300px] h-full bg-[#F1F0E9] shadow-2xl">
                        <div className="h-[90px] bg-[#1B0C0C] w-full flex justify-start items-center px-5">
                            <img src="/logo.png" alt="Logo" className="h-[35px]" />
                            <h1 className="text-white text-lg font-bold ml-3">
                                Isuri Computers
                            </h1>
                            <LuPanelLeftClose
                                onClick={() => setIsOpen(false)}
                                size={30}
                                color="white"
                                className="ml-auto cursor-pointer hover:scale-110 transition"
                            />
                        </div>

                        <div className="flex flex-col mt-5">
                            <Link
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className="text-[#1B0C0C] text-lg font-semibold py-3 px-5 hover:bg-[#4C763B] hover:text-white transition"
                            >
                                Home
                            </Link>
                            <Link
                                to="/products"
                                onClick={() => setIsOpen(false)}
                                className="text-[#1B0C0C] text-lg font-semibold py-3 px-5 hover:bg-[#4C763B] hover:text-white transition"
                            >
                                Products
                            </Link>
                            <Link
                                to="/about"
                                onClick={() => setIsOpen(false)}
                                className="text-[#1B0C0C] text-lg font-semibold py-3 px-5 hover:bg-[#4C763B] hover:text-white transition"
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                onClick={() => setIsOpen(false)}
                                className="text-[#1B0C0C] text-lg font-semibold py-3 px-5 hover:bg-[#4C763B] hover:text-white transition"
                            >
                                Contact
                            </Link>

                            {showCart && (
                                <Link
                                    to="/cart"
                                    onClick={() => setIsOpen(false)}
                                    className="text-[#1B0C0C] text-lg font-semibold py-3 px-5 hover:bg-[#4C763B] hover:text-white transition"
                                >
                                    Cart ({cartCount})
                                </Link>
                            )}

                            <div className="border-t border-[#1B0C0C]/10 mt-auto bg-[#1B0C0C] p-4 absolute bottom-0 w-[300px]">
                                <UserData />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}