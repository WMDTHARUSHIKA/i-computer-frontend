import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            axios
                .post(import.meta.env.VITE_API_URL + "/users/google-login", {
                    token: response.access_token,
                })
                .then((response) => {
                    toast.success("Login Successful");
                    localStorage.setItem("token", response.data.token);

                    if (response.data.role === "admin") {
                        navigate("/admin/");
                    } else {
                        navigate("/");
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

    async function signup() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await axios.post(import.meta.env.VITE_API_URL + "/users/", {
                firstName,
                lastName,
                email,
                password,
            });

            toast.success("Signed up Successfully");
            navigate("/login");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to sign up");
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
                    <h1 className="text-3xl font-black text-white text-center mb-6">
                        Create Account
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={inputClass}
                            type="text"
                            placeholder="First Name"
                        />
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={inputClass}
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClass}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className={inputClass}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={inputClass}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={signup}
                        className="mt-5 p-3 w-full h-[52px] bg-secondary rounded-2xl text-white font-bold hover:opacity-90 transition"
                    >
                        Sign up
                    </button>

                    <button
                        onClick={googleLogin}
                        className="mt-4 p-3 w-full h-[52px] border border-white/30 rounded-2xl text-white font-bold hover:bg-white/10 transition"
                    >
                        Sign up with Google
                    </button>

                    <p className="w-full text-right mt-5 text-white/80">
                        Already have an account?{" "}
                        <Link to="/login" className="text-accent font-semibold">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}