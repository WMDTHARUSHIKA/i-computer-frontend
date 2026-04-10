import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import Overview from "./overview";
import Cart from "./cart";
import Checkout from "./checkout";
import MyOrdersPage from "./myOrdersPage";
import SettingsPage from "./settingsPage";
import LandingPage from "./landingPage";
import OrderSuccessPage from "./orderSuccess";

export default function HomePage() {
    return (
        <div className="w-full min-h-screen bg-accent">
            <Header />
            <Routes>
                <Route index element={<LandingPage />} />
                <Route path="about" element={<div className="p-10 text-primary">About Page Content</div>} />
                <Route path="contact" element={<div className="p-10 text-primary">Contact Page Content</div>} />
                <Route path="products" element={<ProductPage />} />
                <Route path="cart" element={<Cart />} />
                <Route path="overview/:productId" element={<Overview />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="order-success" element={<OrderSuccessPage />} />
                <Route path="MyOrdersPage" element={<MyOrdersPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<div className="p-10 text-primary">404 Not Found</div>} />
            </Routes>
        </div>
    );
}