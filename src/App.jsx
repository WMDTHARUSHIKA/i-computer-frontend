import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/admin";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import Test from "./components/test";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/register";
import ForgetPassword from "./pages/forgetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
    return (
        <GoogleOAuthProvider clientId="486137950324-v9abvqcncjdojqg3vdj9iggv2r7ih4kf.apps.googleusercontent.com">
            <div className="w-full min-h-screen bg-accent text-primary">
                <Toaster position="top-right" />
                <Routes>
                    <Route path="/*" element={<HomePage />} />
                    <Route path="/admin/*" element={<AdminPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgetPassword />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/admin/*" element={<AdminPage />} />
                </Routes>
            </div>
        </GoogleOAuthProvider>
    );
}