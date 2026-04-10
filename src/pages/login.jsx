import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            axios
                .post(import.meta.env.VITE_API_URL + "/users/google-login", {
                    token: response.access_token,
                })
                .then((response) => {
                    toast.success("Login Successful");
                    localStorage.setItem("token", response.data.token);

                    const from = location.state?.from || "/";

                    if (response.data.role === "admin") {
                        navigate("/admin/");
                    } else {
                        navigate(from);
                    }
                })
                .catch((err) => {
                    toast.error(
                        err?.response?.data?.message ||
                            "Google login failed. Please try again."
                    );
                });
        },
        onError: () => {
            toast.error("Google login failed. Please try again.");
        },
    });

    async function login() {
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/users/login",
                {
                    email,
                    password,
                }
            );

            toast.success("Login Successful");
            localStorage.setItem("token", response.data.token);

            const from = location.state?.from || "/";

            if (response.data.role === "admin") {
                navigate("/admin/");
            } else {
                navigate(from);
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to login");
        }
    }

    const inputClass =
        "p-3 w-full h-[52px] rounded-2xl border border-white/20 bg-white/10 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-accent transition";

    return (
        <div className="w-full min-h-screen bg-[url('/background.jpg')] bg-cover bg-center flex">
            <div className="w-[50%] h-full hidden lg:flex justify-center items-center flex-col">
                <img src="/logo.png" alt="Logo" className="w-[300px]" />
                <h1 className="text-4xl font-bold mt-5 text-white">Isuri Computers</h1>
            </div>

            <div className="w-full lg:w-[50%] min-h-screen flex justify-center items-center px-4">
                <div className="backdrop-blur-2xl bg-white/10 border border-white/20 w-full max-w-[460px] rounded-3xl shadow-2xl flex flex-col justify-center p-8">
                    <img src="/logo.png" alt="Logo" className="w-[90px] mx-auto lg:hidden" />
                    <h1 className="lg:hidden text-3xl font-semibold mt-4 text-white text-center">
                        Isuri Computers
                    </h1>

                    <h2 className="text-3xl font-black text-white mt-4">Welcome Back</h2>
                    <p className="text-white/70 mt-2 mb-6">
                        Sign in to continue shopping.
                    </p>

                    <div className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClass}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <p className="w-full text-right mt-4 text-white/80">
                        Forgot Password?{" "}
                        <Link to="/forgot-password" className="text-accent font-semibold">
                            Reset
                        </Link>
                    </p>

                    <button
                        onClick={login}
                        className="mt-5 p-3 w-full h-[52px] bg-secondary rounded-2xl text-white font-bold hover:opacity-90 transition"
                    >
                        Login
                    </button>

                    <button
                        onClick={googleLogin}
                        className="mt-4 p-3 w-full h-[52px] border border-white/30 rounded-2xl text-white font-bold hover:bg-white/10 transition"
                    >
                        Login with Google
                    </button>

                    <p className="w-full text-right mt-5 text-white/80">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-accent font-semibold">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}