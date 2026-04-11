import { useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuPanelLeftClose } from "react-icons/lu";
import { Link, NavLink, useLocation } from "react-router-dom";
import UserData from "./UserData";
import { getCart } from "../utils/cart";

function getRoleFromToken(token) {
  try {
    const payloadBase64Url = token.split(".")[1];
    const payloadBase64 = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(payloadBase64);
    const payload = JSON.parse(json);
    return payload?.role ?? null;
  } catch {
    return null;
  }
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();

  const isAdmin = userRole === "admin";
  const showCart = !isAdmin;

  const updateCartCount = () => {
    const cart = getCart() || [];
    const totalQty = cart.reduce((sum, item) => sum + Number(item?.qty || 0), 0);
    setCartCount(totalQty);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserRole(token ? getRoleFromToken(token) : null);

    updateCartCount();
    setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // ✅ Bigger letters + better padding
  const navClass = ({ isActive }) =>
    `px-5 py-2.5 rounded-2xl text-[15px] lg:text-[16px] font-extrabold tracking-wide transition
     ${
       isActive
         ? "text-[#48A111] bg-white/10"
         : "text-[#F1F0E9]/90 hover:text-[#F1F0E9] hover:bg-white/10"
     }`;

  const mobileLinkClass =
    "text-black text-[16px] font-black py-3 px-5 rounded-2xl hover:bg-black hover:text-[#F1F0E9] transition";

  return (
    <header className="w-full sticky top-0 z-50 border-b border-white/10 bg-[#000000]">
      {/* ✅ Increased header height + wider container */}
      <div className="h-[92px] mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/15 transition"
            aria-label="Open menu"
          >
            <GiHamburgerMenu size={24} color="#F1F0E9" />
          </button>

          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-[44px] w-[44px] rounded-2xl bg-white/10 p-2 object-contain"
            />
            <span className="text-[#F1F0E9] text-[18px] sm:text-[20px] lg:text-[22px] font-black tracking-tight">
              Isuri Computers
            </span>
          </Link>
        </div>

        {/* Center: Desktop nav (bigger + spaced) */}
        <nav className="hidden lg:flex items-center gap-3">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
        </nav>

        {/* Right: cart + user */}
        <div className="hidden lg:flex items-center gap-5">
          {showCart && (
            <Link
              to="/cart"
              className="relative w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/15 transition flex items-center justify-center"
              aria-label="Cart"
            >
              <BiShoppingBag size={26} color="#F1F0E9" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1 rounded-full bg-[#48A111] text-black text-[11px] font-black flex items-center justify-center border border-black/20">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          <UserData />
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full w-[340px] bg-[#F1F0E9] shadow-2xl">
            <div className="h-[92px] px-4 flex items-center gap-3 bg-[#000000] border-b border-white/10">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-[42px] w-[42px] rounded-2xl bg-white/10 p-2 object-contain"
              />
              <h1 className="text-[#F1F0E9] text-[18px] font-black">
                Isuri Computers
              </h1>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="ml-auto inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/15 transition"
                aria-label="Close menu"
              >
                <LuPanelLeftClose size={24} color="#F1F0E9" />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-2">
              <Link to="/" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to="/products" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
                Products
              </Link>
              <Link to="/about" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link to="/contact" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
                Contact
              </Link>

              {showCart && (
                <Link to="/cart" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
                  Cart ({cartCount})
                </Link>
              )}
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 bg-[#000000] border-t border-white/10">
              <UserData />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}