import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/admin";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import Test from "./components/test";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/register";
import ForgetPassword from "./pages/forgetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PublicLayout from "./layouts/publiclayout";

export default function App() {
    return (
        <GoogleOAuthProvider clientId="486137950324-v9abvqcncjdojqg3vdj9iggv2r7ih4kf.apps.googleusercontent.com">
            <div className="w-full min-h-screen bg-accent text-primary">
                <Toaster position="top-right" />
                <Routes>
                    <Route element={<PublicLayout />}>
                        <Route path="/*" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgetPassword />} />
                    </Route>
                    <Route path="/test" element={<Test />} />
                    <Route path="/admin/*" element={<AdminPage />} />
                </Routes>
            </div>
        </GoogleOAuthProvider>
    );
}