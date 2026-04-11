import { Route, Routes } from "react-router-dom";

import ProductPage from "./productPage";
import Overview from "./overview";
import Cart from "./cart";
import Checkout from "./checkout";
import MyOrdersPage from "./myOrdersPage";
import SettingsPage from "./settingsPage";
import LandingPage from "./landingPage";
import OrderSuccessPage from "./orderSuccess";
import AboutPage from "./about";
import ContactPage from "./contact";

export default function HomePage() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />

      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />

      <Route path="products" element={<ProductPage />} />
      <Route path="cart" element={<Cart />} />
      <Route path="overview/:productId" element={<Overview />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="order-success" element={<OrderSuccessPage />} />

      <Route path="my-orders" element={<MyOrdersPage />} />
      <Route path="settings" element={<SettingsPage />} />

      <Route path="*" element={<div className="p-10 text-black">404 Not Found</div>} />
    </Routes>
  );
}