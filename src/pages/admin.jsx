import { Link, Route, Routes, useLocation } from "react-router-dom";
import { FaRegListAlt } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import { HiOutlineHome } from "react-icons/hi";

import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminUsersPage from "./admin/adminUsersPage";

export default function AdminPage() {
  const location = useLocation();

  const navClass = (path) =>
    `flex w-full p-4 gap-3 items-center rounded-2xl transition ${
      location.pathname === path
        ? "bg-secondary text-white shadow-md"
        : "text-primary hover:bg-primary/10"
    }`;

  return (
    <div className="w-full h-screen flex bg-accent overflow-hidden">
      {/* Sidebar */}
      <div className="w-[290px] h-full bg-white border-r border-primary/10 p-5 hidden lg:flex flex-col">
        <h1 className="text-3xl font-black text-primary pb-5 border-b border-primary/10">
          Admin Panel
        </h1>

        <div className="flex flex-col gap-2 mt-5">
          {/* ✅ Home button (back to main dashboard) */}
          <Link className={navClass("/")} to="/">
            <HiOutlineHome /> Home
          </Link>

          <Link className={navClass("/admin")} to="/admin">
            <FaRegListAlt /> Orders
          </Link>

          <Link className={navClass("/admin/products")} to="/admin/products">
            <MdOutlineInventory2 /> Products
          </Link>

          <Link className={navClass("/admin/users")} to="/admin/users">
            <LuUsersRound /> Users
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 h-full overflow-hidden bg-accent p-3 lg:p-4">
        <div className="w-full h-full rounded-3xl bg-white shadow-xl overflow-hidden">
          <Routes>
            <Route index element={<AdminOrdersPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="add-product" element={<AdminAddProductPage />} />
            <Route path="update-product" element={<AdminUpdateProductPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}